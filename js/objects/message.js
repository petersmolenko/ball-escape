((namespace) => {
  const Message = class extends GameObject {
    constructor(options) {
      super(options);
      this.message = options.message;
      this.x = options.left;
      this.y = options.bottom;
      this.color = options.color;
    }

    draw = function (context, message) {
      context.font = "40px monospace";
      context.textAlign = "center";
      context.fillStyle = this.color;
      context.fillRect(
        this.x - message.length * 20,
        this.y - 40,
        message.length * 40 + 20,
        60
      );
      context.fillStyle = "#EEE";
      context.fillText(message, this.x, this.y);
    };
  };

  namespace.GameMessage = Message;
})(window);
