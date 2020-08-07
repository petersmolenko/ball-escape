((namespace) => {
  const STEP_SPEED = 0.02;
  const JUMP_DISTANCE = 350;
  const JUMP_HEIGHT = 100;

  const Ball = class extends GameObject {
    constructor(options) {
      super(options);
      this.scale = options.scale;
      this.x = options.left;
      this.y = options.bottom;
      this.colour = options.color;
      this.jumpStart = null;
    }

    isJumping = (offset) => {
      return this.jumpStart !== null && this.jumpDistanceRemaining(offset) > 0;
    };

    jumpDistanceRemaining = (offset) => {
      if (this.jumpStart === null) return 0;
      return this.jumpStart + JUMP_DISTANCE - offset;
    };

    startJump = (offset) => {
      this.jumpStart = offset;
    };

    jumpHeight = (offset) => {
      let distanceRemaining = this.jumpDistanceRemaining(offset);
      if (distanceRemaining > 0) {
        let maxPoint = JUMP_DISTANCE / 2;

        if (distanceRemaining >= maxPoint) {
          distanceRemaining -= JUMP_DISTANCE;
        }

        let arcPos = Math.abs(distanceRemaining / maxPoint);

        return JUMP_HEIGHT * arcPos;
      }
      return 0;
    };

    hasBackLegUp = (offset) =>
      offset > 0 && Math.floor(offset * STEP_SPEED) % 2 === 0;

    hasFrontLegUp = (offset) =>
      offset > 0 && Math.floor(offset * STEP_SPEED) % 2 === 1;

    draw = (context, offset) => {
      let x = this.x,
        y = this.y - this.jumpHeight(offset);

      context.fillStyle = this.colour;
      context.fillRect(x + 30, y - 45, 15, 5);
      context.fillRect(x + 25, y - 40, 5, 5);
      context.fillRect(x + 35, y - 40, 5, 5);
      context.fillRect(x + 45, y - 40, 5, 5);
      context.fillRect(x + 20, y - 35, 10, 5);
      context.fillRect(x + 35, y - 35, 5, 5);
      context.fillRect(x + 45, y - 35, 10, 5);
      context.fillRect(x + 15, y - 30, 5, 5);
      context.fillRect(x + 30, y - 30, 15, 5);
      context.fillRect(x + 55, y - 30, 5, 5);
      context.fillRect(x + 15, y - 25, 20, 5);
      context.fillRect(x + 40, y - 25, 20, 5);
      context.fillRect(x + 15, y - 20, 5, 5);
      context.fillRect(x + 30, y - 20, 15, 5);
      context.fillRect(x + 55, y - 20, 5, 5);
      context.fillRect(x + 20, y - 15, 10, 5);
      context.fillRect(x + 35, y - 15, 5, 5);
      context.fillRect(x + 45, y - 15, 10, 5);
      context.fillRect(x + 25, y - 10, 5, 5);
      context.fillRect(x + 35, y - 10, 5, 5);
      context.fillRect(x + 45, y - 10, 5, 5);
      context.fillRect(x + 30, y - 5, 15, 5);
    };

    colliders = (offset) => {
      const y = this.y - this.jumpHeight(offset);
      return [
        {
          x: this.x + offset + 30,
          y: y - 40,
          width: 15,
          height: 5,
        },
        {
          x: this.x + offset + 25,
          y: y - 35,
          width: 25,
          height: 5,
        },
        {
          x: this.x + offset + 20,
          y: y - 30,
          width: 35,
          height: 5,
        },
        {
          x: this.x + offset + 15,
          y: y - 15,
          width: 45,
          height: 15,
        },
        {
          x: this.x + offset + 20,
          y: y - 10,
          width: 35,
          height: 5,
        },
        {
          x: this.x + offset + 25,
          y: y - 5,
          width: 25,
          height: 5,
        },
        {
          x: this.x + offset + 30,
          y: y,
          width: 15,
          height: 5,
        },
      ];
    };
  };

  namespace.Ball = Ball;
})(window);
