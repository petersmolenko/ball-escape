(function (namespace) {
  const Thorn = class extends GameObject {
    constructor(options) {
      super(options);
      this.scale = options.scale;
      this.x = options.left;
      this.y = options.bottom;
      this.color = options.color;
      this.size = options.size;
    }

    draw = (context, offset) => {
      let x = this.x - offset,
        y = this.y,
        scale = this.scale;

      context.fillStyle = this.color;
      let height = 15 * this.size;
      context.fillRect(
        x,
        y - (20 + height) * scale,
        6 * scale,
        (20 + height) * scale
      );
      context.fillRect(
        x,
        y - (13 + height) * scale,
        12 * scale,
        (13 + height) * scale
      );
      context.fillRect(
        x,
        y - (6 + height) * scale,
        18 * scale,
        (6 + height) * scale
      );
    };

    colliders = (offset) => {
      return [
        {
          x: this.x,
          y: this.y,
          width: 18 * this.scale,
          height: (20 + 15 * this.size) * this.scale,
        },
      ];
    };
  };

  namespace.Thorn = Thorn;
})(window);
