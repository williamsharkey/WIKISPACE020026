// Input handler - keyboard and mouse

export interface InputState {
  thrust: { x: number; y: number; z: number };
  rotation: { x: number; y: number };
  boost: boolean;
  fire: boolean;
  interact: boolean;
  pill: boolean;
}

export class Input {
  private element: HTMLElement;
  private keys = new Set<string>();
  private mouseMovement = { x: 0, y: 0 };
  private mouseButtons = new Set<number>();
  private locked = false;

  constructor(element: HTMLElement) {
    this.element = element;

    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    element.addEventListener('mousedown', this.onMouseDown.bind(this));
    element.addEventListener('mouseup', this.onMouseUp.bind(this));
    element.addEventListener('mousemove', this.onMouseMove.bind(this));
    element.addEventListener('click', this.onClick.bind(this));
    document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));
  }

  lock() {
    this.element.requestPointerLock();
  }

  unlock() {
    document.exitPointerLock();
  }

  private onKeyDown(e: KeyboardEvent) {
    this.keys.add(e.code);
  }

  private onKeyUp(e: KeyboardEvent) {
    this.keys.delete(e.code);
  }

  private onMouseDown(e: MouseEvent) {
    this.mouseButtons.add(e.button);
  }

  private onMouseUp(e: MouseEvent) {
    this.mouseButtons.delete(e.button);
  }

  private onMouseMove(e: MouseEvent) {
    if (this.locked) {
      this.mouseMovement.x += e.movementX;
      this.mouseMovement.y += e.movementY;
    }
  }

  private onClick() {
    if (!this.locked) {
      this.lock();
    }
  }

  private onPointerLockChange() {
    this.locked = document.pointerLockElement === this.element;
  }

  getState(): InputState {
    // Thrust (WASD + QE for up/down)
    const thrust = { x: 0, y: 0, z: 0 };
    if (this.keys.has('KeyW')) thrust.z = -1;
    if (this.keys.has('KeyS')) thrust.z = 1;
    if (this.keys.has('KeyA')) thrust.x = -1;
    if (this.keys.has('KeyD')) thrust.x = 1;
    if (this.keys.has('KeyQ')) thrust.y = -1;
    if (this.keys.has('KeyE')) thrust.y = 1;

    // Rotation from mouse
    const sensitivity = 0.002;
    const rotation = {
      x: -this.mouseMovement.y * sensitivity, // Pitch
      y: -this.mouseMovement.x * sensitivity, // Yaw
    };

    // Reset mouse movement after reading
    this.mouseMovement.x = 0;
    this.mouseMovement.y = 0;

    return {
      thrust,
      rotation,
      boost: this.keys.has('ShiftLeft') || this.keys.has('ShiftRight'),
      fire: this.mouseButtons.has(0) || this.keys.has('Space'),
      interact: this.keys.has('KeyE'),
      pill: this.keys.has('KeyF'),
    };
  }

  // For single-press detection (not held)
  wasKeyJustPressed(code: string): boolean {
    return this.keys.has(code);
  }

  onKeyPress(code: string, callback: () => void): void {
    window.addEventListener('keydown', (e) => {
      if (e.code === code && !e.repeat) {
        callback();
      }
    });
  }
}
