((namespace) => {
  const SCORE_FACTOR = 0.1;
  const formatOffset = (offset) => Math.floor(offset * SCORE_FACTOR);

  const ScoreBoard = class extends GameObject {
    constructor(options) {
      super(options);
      this.scale = options.scale;
      this.x = options.left;
      this.y = options.bottom;
      this.color = options.color;
    }

    draw = (context, offset) => {
      context.fillStyle = this.color;
      context.font = "16px Courier";
      context.textAlign = "right";
      context.fillText(formatOffset(offset), this.x, this.y);
    };
  };

  namespace.ScoreBoard = ScoreBoard;
})(window);
