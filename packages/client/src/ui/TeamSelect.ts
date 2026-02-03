// Intro Screen - A quiet letter before departure

export type Team = 'red' | 'blue';

export interface TeamSelectEvents {
  onTeamSelected: (team: Team) => void;
}

const LETTERS = [
  `To whoever finds this,

I was on the bus this morning. Someone was playing music from their phone
without headphones. A tinny beat, leaking into the silence between strangers.
Nobody said anything. We just looked at our hands.

I used to think consensus meant agreement. Now I think it just means
nobody wants to be the one to speak first.

The articles keep changing. I check them in the morning and again at night.
Small things. A date here. A word there. "Reportedly" becomes "allegedly"
becomes nothing at all.

Who decides? I used to know. I don't anymore.

I have to go now. There's work to be done, though I couldn't tell you
exactly what kind. Something about maintenance. Corrections.
The usual.

If you're reading this, I suppose the controls are yours now.

Good luck with all of it.

— S.`,

  `Hello,

Strange day. Saw a bird on the windowsill for almost an hour.
Just sitting there. Looking in, or looking at its reflection.
Hard to say which.

I've been thinking about edits. Not the dramatic kind.
The small ones. The ones nobody notices.

A sentence gets shorter. A paragraph disappears.
Someone somewhere decided it wasn't needed.
Maybe they were right.

I spent a long time in the archives today. Reading old versions.
It's funny how confident everything sounds in the past tense.
As if we always knew. As if it was always obvious.

Anyway. I won't be here much longer. Don't ask where I'm going.
I don't think the answer would make sense to either of us.

The controls are simple enough. You'll figure them out.

Take care of things.

— M.`,

  `Notes for the next person:

The coffee machine on deck 4 doesn't work. It lights up
but nothing comes out. Been that way for months.
Nobody's fixed it. Nobody's reported it either.
We just walk to deck 7 instead.

I mention this because it reminds me of everything else.
The small things that stop working.
The small things we route around.

I read an article yesterday about memory. How we don't
actually remember things—we remember the last time
we remembered them. Copies of copies.
Drift.

The words out there drift too. I've watched them.
They start out meaning one thing. Then the meaning
shifts. Then someone notices and shifts it back.
Then someone else.

I don't know which version is true anymore.
Maybe none of them. Maybe all of them.

I'm leaving now. Not sure why I'm writing this.
Probably no one will read it.

If you do: the controls are yours.
Don't overthink it.

— K.`,

  `Tuesday, I think.

A child on the train asked her mother why the sky is blue.
The mother said "it just is." The child accepted this.

I wonder when we stop accepting "it just is."
I wonder when we start accepting it again.

Been cataloging discrepancies. Small ones.
A name spelled differently in two places.
A date that doesn't match.
A quote that nobody can source.

I'm not trying to fix anything. Just... noticing.
Someone should notice.

The work here is quiet. You float. You read. You move on.
Sometimes you change a word. Sometimes the word changes you.
It's hard to explain.

I have to go. Something about a reassignment.
They didn't say where. They rarely do.

You'll be fine. The ship knows what to do.
Just point it at something and it goes.

That's all any of us do, really.

— J.`,

  `If you're reading this, I've already left.

Not dramatically. Just... left. Walked out.
Took the long way around the station.
Looked at the words floating in the distance.
Kept walking.

I used to believe in getting things right.
The correct fact. The proper source.
The truth with a capital T.

Now I just believe in the next sentence.
And the one after that.

Someone will read what I wrote and change it.
Someone will read what they wrote and change that.
On and on. A conversation with no one.
A debate with ghosts.

It's not sad. It's just how it is.
Like weather. Like the sound of someone else's music
bleeding through the walls.

Anyway. The controls are simple.
WASD to move. Mouse to look.
Space to do whatever it is we do.

You'll understand when you get there.
Or you won't. Either way.

Goodbye.

— R.`
];

// Unicode glyphs for corruption effect
const GLYPHS = [
  '☉', '☿', '♀', '♁', '♂', '♃', '♄', '♅', '♆', '♇',
  '∞', '∆', '∇', '∴', '∵', '≈', '≠', '≡', '⊕', '⊗',
  '⌘', '⌥', '⌬', '⍟', '⎈', '⏣', '⏤', '⏥', '⏦', '⏧',
  '␀', '␁', '␂', '␃', '␄', '␅', '␆', '␇', '␈', '␉',
  '◊', '○', '●', '◐', '◑', '◒', '◓', '◔', '◕', '◖',
  '▲', '△', '▴', '▵', '▶', '▷', '▸', '▹', '►', '▻',
  '◆', '◇', '◈', '◉', '◌', '◍', '◎', '◯', '☆', '★'
];

export class TeamSelect {
  private container: HTMLElement;
  private events: TeamSelectEvents;
  private selectedTeam: Team;
  private corruptionInterval: number | null = null;
  private corruptedIndices: Set<number> = new Set();

  constructor(events: TeamSelectEvents) {
    this.events = events;
    // Silently assign team - no fanfare
    this.selectedTeam = Math.random() > 0.5 ? 'red' : 'blue';
    this.container = this.createScreen();
    document.body.appendChild(this.container);
  }

  private createScreen(): HTMLElement {
    const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];

    const container = document.createElement('div');
    container.id = 'team-select';
    container.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&display=swap');

        #team-select {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 6000;
          font-family: 'IBM Plex Mono', monospace;
          overflow: hidden;
        }

        #team-select.hidden {
          display: none;
        }

        .letter-container {
          max-width: 600px;
          max-height: 80vh;
          padding: 60px;
          background: #fff;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .letter-text {
          color: #222;
          font-size: 14px;
          line-height: 1.9;
          white-space: pre-wrap;
          font-weight: 400;
          position: relative;
          z-index: 2;
        }

        .letter-char {
          display: inline-block;
          transition: transform 2s cubic-bezier(0.55, 0.055, 0.675, 0.19),
                      opacity 1.5s ease;
        }

        .letter-char.falling {
          opacity: 0;
        }

        .letter-char.corrupted {
          animation: glyph-shimmer 2s ease-in-out infinite;
        }

        @keyframes glyph-shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .void-hole {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, #000 0%, #0a0a1a 50%, #000 100%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          transition: width 2s cubic-bezier(0.4, 0, 0.2, 1),
                      height 2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .void-hole.expanding {
          width: 300vmax;
          height: 300vmax;
        }

        .void-stars {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 1s ease 1s;
        }

        .void-hole.expanding .void-stars {
          opacity: 1;
        }

        .void-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #444;
          border-radius: 50%;
        }
      </style>

      <div class="letter-container">
        <div class="letter-text" id="letter-text">${letter}</div>
        <div class="void-hole" id="void-hole">
          <div class="void-stars" id="void-stars"></div>
        </div>
      </div>
    `;

    return container;
  }

  show() {
    this.container.classList.remove('hidden');

    // Wrap each character in a span for animation, preserving whitespace
    const letterText = document.getElementById('letter-text');
    if (letterText) {
      const text = letterText.textContent || '';
      letterText.innerHTML = '';
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'letter-char';
        // Preserve whitespace characters exactly as-is
        if (text[i] === ' ') {
          span.innerHTML = '&nbsp;';
          span.dataset.isSpace = 'true';
        } else if (text[i] === '\n') {
          span.innerHTML = '<br>';
          span.dataset.isNewline = 'true';
        } else {
          span.textContent = text[i];
        }
        letterText.appendChild(span);
      }
    }

    // Start corruption after 10 seconds
    setTimeout(() => {
      this.startCorruption();
    }, 10000);

    // Clicking the letter text triggers transition (once corruption has started)
    if (letterText) {
      letterText.addEventListener('click', () => {
        if (this.corruptedIndices.size > 0) {
          this.startTransition();
        }
      });
    }
  }

  private startCorruption() {
    const letterText = document.getElementById('letter-text');
    if (!letterText) return;

    const chars = letterText.querySelectorAll('.letter-char');
    const nonWhitespaceIndices: number[] = [];

    // Collect indices of non-whitespace characters
    chars.forEach((char, index) => {
      const el = char as HTMLElement;
      if (!el.dataset.isSpace && !el.dataset.isNewline) {
        nonWhitespaceIndices.push(index);
      }
    });

    let interval = 2000; // Start with 2 second interval
    const minInterval = 20; // Minimum 20ms between corruptions
    let lastTime = performance.now();

    const corrupt = () => {
      if (nonWhitespaceIndices.length === 0 || this.corruptedIndices.size >= nonWhitespaceIndices.length) {
        // All corrupted, stop
        if (this.corruptionInterval) {
          clearTimeout(this.corruptionInterval);
          this.corruptionInterval = null;
        }
        return;
      }

      // Pick a random uncorrupted character
      const available = nonWhitespaceIndices.filter(i => !this.corruptedIndices.has(i));
      if (available.length === 0) return;

      const randomIdx = available[Math.floor(Math.random() * available.length)];
      this.corruptedIndices.add(randomIdx);

      // Replace with glyph
      const el = chars[randomIdx] as HTMLElement;
      const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      el.textContent = glyph;
      el.style.color = '#666';
      el.style.cursor = 'pointer';
      el.classList.add('corrupted');

      // Decrease interval by 20% each second
      const now = performance.now();
      const elapsed = now - lastTime;
      lastTime = now;

      // Calculate how much to reduce based on time (20% per second)
      const reduction = Math.pow(0.8, elapsed / 1000);
      interval = Math.max(minInterval, interval * reduction);

      // Also increase corruption rate based on how much is corrupted
      const corruptionProgress = this.corruptedIndices.size / nonWhitespaceIndices.length;
      if (corruptionProgress > 0.3) {
        interval = Math.max(minInterval, interval * 0.9);
      }
      if (corruptionProgress > 0.6) {
        interval = Math.max(minInterval, interval * 0.8);
      }

      // Schedule next corruption
      this.corruptionInterval = window.setTimeout(corrupt, interval);
    };

    // Start the first corruption
    corrupt();
  }

  private startTransition() {
    // Stop corruption
    if (this.corruptionInterval) {
      clearTimeout(this.corruptionInterval);
      this.corruptionInterval = null;
    }

    const letterText = document.getElementById('letter-text');
    const voidHole = document.getElementById('void-hole');

    if (!letterText || !voidHole) return;

    // Get all letter spans
    const chars = letterText.querySelectorAll('.letter-char');
    const rect = letterText.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Animate each character falling into the void
    chars.forEach((char, index) => {
      const el = char as HTMLElement;
      const charRect = el.getBoundingClientRect();
      const charCenterX = charRect.left - rect.left + charRect.width / 2;
      const charCenterY = charRect.top - rect.top + charRect.height / 2;

      // Calculate direction toward center
      const dx = centerX - charCenterX;
      const dy = centerY - charCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Stagger the fall based on distance from center (outer letters fall first)
      const delay = (1 - distance / 500) * 1500 + Math.random() * 500;

      setTimeout(() => {
        el.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
        el.classList.add('falling');
      }, delay);
    });

    // Start expanding the void hole
    setTimeout(() => {
      voidHole.classList.add('expanding');

      // Create stars in the void
      const voidStars = document.getElementById('void-stars');
      if (voidStars) {
        for (let i = 0; i < 100; i++) {
          const star = document.createElement('div');
          star.className = 'void-star';
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          star.style.opacity = `${0.3 + Math.random() * 0.7}`;
          voidStars.appendChild(star);
        }
      }
    }, 800);

    // Launch the game after transition
    setTimeout(() => {
      this.launch();
    }, 3000);
  }

  hide() {
    this.container.classList.add('hidden');
  }

  private launch() {
    this.hide();
    this.events.onTeamSelected(this.selectedTeam);
  }

  getSelectedTeam(): Team {
    return this.selectedTeam;
  }
}
