// TextEditor - Edit 10 words in the article after a kill

import { ARTICLE } from '@wikispace/shared';

export interface WordEdit {
  wordId: string;
  originalText: string;
  newText: string;
}

export interface TextEditorEvents {
  onEditComplete?: (edits: WordEdit[]) => void;
  onEditCancel?: () => void;
}

export class TextEditor {
  private container: HTMLElement;
  private wordList: HTMLElement;
  private inputField: HTMLInputElement;
  private submitBtn: HTMLElement;
  private cancelBtn: HTMLElement;
  private wordsRemainingEl: HTMLElement;
  private timerEl: HTMLElement;

  private isActive = false;
  private availableWords: { id: string; text: string; element: HTMLElement }[] = [];
  private selectedWords: Map<string, { original: string; edited: string }> = new Map();
  private currentlyEditing: string | null = null;

  private maxEdits = ARTICLE.EDIT_WORD_LIMIT;
  private timeRemaining = ARTICLE.EDIT_TIME_LIMIT;
  private timerInterval: number | null = null;

  private events: TextEditorEvents;

  constructor(events: TextEditorEvents = {}) {
    this.events = events;
    this.container = this.createEditor();
    document.body.appendChild(this.container);

    this.wordList = document.getElementById('editor-words')!;
    this.inputField = document.getElementById('editor-input') as HTMLInputElement;
    this.submitBtn = document.getElementById('editor-submit')!;
    this.cancelBtn = document.getElementById('editor-cancel')!;
    this.wordsRemainingEl = document.getElementById('editor-remaining')!;
    this.timerEl = document.getElementById('editor-timer')!;

    this.hide();
    this.setupEventListeners();
  }

  private createEditor(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'text-editor';
    container.innerHTML = `
      <style>
        #text-editor {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 5000;
          font-family: 'Courier New', monospace;
        }

        #text-editor.hidden {
          display: none;
        }

        .editor-window {
          background: #1a1a2e;
          border: 2px solid #0f0;
          padding: 20px;
          width: 800px;
          max-height: 80%;
          overflow: hidden;
          box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #0f0;
        }

        .editor-title {
          color: #0f0;
          font-size: 24px;
          text-shadow: 0 0 10px #0f0;
        }

        .editor-stats {
          display: flex;
          gap: 20px;
          color: #0a0;
        }

        #editor-timer {
          color: #ff0;
        }

        #editor-timer.urgent {
          color: #f00;
          animation: pulse 0.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .editor-instructions {
          color: #888;
          font-size: 12px;
          margin-bottom: 15px;
        }

        .editor-words {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          max-height: 300px;
          overflow-y: auto;
          padding: 10px;
          background: #0a0a15;
          border: 1px solid #333;
          margin-bottom: 20px;
        }

        .editor-word {
          padding: 5px 10px;
          background: #222;
          border: 1px solid #444;
          color: #aaa;
          cursor: pointer;
          transition: all 0.2s;
        }

        .editor-word:hover {
          background: #333;
          border-color: #0f0;
          color: #fff;
        }

        .editor-word.selected {
          background: #030;
          border-color: #0f0;
          color: #0f0;
        }

        .editor-word.editing {
          background: #0f0;
          color: #000;
        }

        .editor-word.edited {
          background: #050;
          border-color: #0f0;
          color: #0f0;
          text-decoration: line-through;
        }

        .editor-word .new-text {
          color: #ff0;
          text-decoration: none;
          margin-left: 5px;
        }

        .editor-input-area {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        #editor-input {
          flex: 1;
          padding: 10px;
          font-family: 'Courier New', monospace;
          font-size: 16px;
          background: #000;
          border: 2px solid #0f0;
          color: #0f0;
          outline: none;
        }

        #editor-input:focus {
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }

        #editor-input:disabled {
          opacity: 0.5;
        }

        .editor-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .editor-btn {
          padding: 10px 20px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          cursor: pointer;
          border: 2px solid;
          transition: all 0.2s;
        }

        #editor-submit {
          background: #030;
          color: #0f0;
          border-color: #0f0;
        }

        #editor-submit:hover {
          background: #0f0;
          color: #000;
        }

        #editor-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        #editor-cancel {
          background: #300;
          color: #f00;
          border-color: #f00;
        }

        #editor-cancel:hover {
          background: #f00;
          color: #000;
        }
      </style>

      <div class="editor-window">
        <div class="editor-header">
          <div class="editor-title">EDIT REALITY</div>
          <div class="editor-stats">
            <span>Words: <span id="editor-remaining">10/10</span></span>
            <span id="editor-timer">30s</span>
          </div>
        </div>

        <div class="editor-instructions">
          Click a word to select it, then type its replacement. You control history now.
        </div>

        <div class="editor-words" id="editor-words"></div>

        <div class="editor-input-area">
          <input type="text" id="editor-input" placeholder="Select a word to edit..." disabled maxlength="30">
        </div>

        <div class="editor-buttons">
          <button class="editor-btn" id="editor-cancel">[ CANCEL ]</button>
          <button class="editor-btn" id="editor-submit" disabled>[ COMMIT CHANGES ]</button>
        </div>
      </div>
    `;
    return container;
  }

  private setupEventListeners() {
    this.inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.currentlyEditing) {
        this.confirmWordEdit();
      }
      if (e.key === 'Escape') {
        this.cancelWordEdit();
      }
    });

    this.submitBtn.addEventListener('click', () => this.submitEdits());
    this.cancelBtn.addEventListener('click', () => this.cancel());
  }

  show(words: { id: string; text: string }[]) {
    this.availableWords = [];
    this.selectedWords.clear();
    this.currentlyEditing = null;
    this.timeRemaining = ARTICLE.EDIT_TIME_LIMIT;

    // Build word list
    this.wordList.innerHTML = '';
    words.forEach(word => {
      const el = document.createElement('span');
      el.className = 'editor-word';
      el.textContent = word.text;
      el.dataset.id = word.id;
      el.addEventListener('click', () => this.selectWord(word.id));
      this.wordList.appendChild(el);
      this.availableWords.push({ id: word.id, text: word.text, element: el });
    });

    this.updateUI();
    this.container.classList.remove('hidden');
    this.isActive = true;

    // Start timer
    this.startTimer();
  }

  hide() {
    this.container.classList.add('hidden');
    this.isActive = false;
    this.stopTimer();
  }

  private startTimer() {
    this.timerInterval = window.setInterval(() => {
      this.timeRemaining--;
      this.timerEl.textContent = `${this.timeRemaining}s`;

      if (this.timeRemaining <= 10) {
        this.timerEl.classList.add('urgent');
      }

      if (this.timeRemaining <= 0) {
        this.submitEdits(); // Auto-submit when time runs out
      }
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.timerEl.classList.remove('urgent');
  }

  private selectWord(id: string) {
    // Check if we can select more words
    if (this.selectedWords.size >= this.maxEdits && !this.selectedWords.has(id)) {
      return;
    }

    // Cancel current edit if any
    if (this.currentlyEditing && this.currentlyEditing !== id) {
      this.cancelWordEdit();
    }

    const wordData = this.availableWords.find(w => w.id === id);
    if (!wordData) return;

    // Update UI
    this.availableWords.forEach(w => w.element.classList.remove('editing'));
    wordData.element.classList.add('editing');
    wordData.element.classList.add('selected');

    this.currentlyEditing = id;
    this.inputField.disabled = false;
    this.inputField.value = this.selectedWords.get(id)?.edited || wordData.text;
    this.inputField.focus();
    this.inputField.select();
  }

  private confirmWordEdit() {
    if (!this.currentlyEditing) return;

    const wordData = this.availableWords.find(w => w.id === this.currentlyEditing);
    if (!wordData) return;

    const newText = this.inputField.value.trim();
    if (!newText) return;

    // Save the edit
    this.selectedWords.set(this.currentlyEditing, {
      original: wordData.text,
      edited: newText
    });

    // Update word display
    wordData.element.classList.remove('editing');
    wordData.element.classList.add('edited');
    wordData.element.innerHTML = `<s>${wordData.text}</s><span class="new-text">${newText}</span>`;

    this.currentlyEditing = null;
    this.inputField.value = '';
    this.inputField.disabled = true;

    this.updateUI();
  }

  private cancelWordEdit() {
    if (!this.currentlyEditing) return;

    const wordData = this.availableWords.find(w => w.id === this.currentlyEditing);
    if (wordData) {
      wordData.element.classList.remove('editing');
    }

    this.currentlyEditing = null;
    this.inputField.value = '';
    this.inputField.disabled = true;
  }

  private updateUI() {
    const remaining = this.maxEdits - this.selectedWords.size;
    this.wordsRemainingEl.textContent = `${remaining}/${this.maxEdits}`;
    this.submitBtn.disabled = this.selectedWords.size === 0;
  }

  private submitEdits() {
    // Confirm current edit if any
    if (this.currentlyEditing && this.inputField.value.trim()) {
      this.confirmWordEdit();
    }

    const edits: WordEdit[] = [];
    this.selectedWords.forEach((edit, wordId) => {
      edits.push({
        wordId,
        originalText: edit.original,
        newText: edit.edited
      });
    });

    this.hide();
    this.events.onEditComplete?.(edits);
  }

  private cancel() {
    this.hide();
    this.events.onEditCancel?.();
  }

  getIsActive(): boolean {
    return this.isActive;
  }
}
