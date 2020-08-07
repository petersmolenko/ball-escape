((namespace) => {
  const DEFAULT_COLOUR = "#444";
  const BACKGROUND_COLOUR = "#EEE";
  const OFFSET_SPEED = 0.4;
  const MAX_TIME_TICK = 1000 / 60;
  const SCREEN_BUFFER = 50;
  const GROUND_BUFFER = 10;
  const SPACE_BAR_CODE = 32;
  const MIN_CACTUS_DISTANCE = 400;
  const LEVEL_1 = 2000;
  const rand = (min, max) => Math.random() * (max - min) + min;
  let spacePressed = false;

  const keydown = (e) => {
    if (e.keyCode === SPACE_BAR_CODE) {
      spacePressed = true;
      document.querySelector("#playGameBtn").textContent = "Pause";
    }
  };

  const keyup = (e) => {
    if (e.keyCode === SPACE_BAR_CODE) {
      spacePressed = false;
    }
  };

  document.addEventListener("keydown", keydown, false);
  document.addEventListener("keyup", keyup, false);

  const Game = class {
    constructor(options) {
      this.canvas = options.el;
      this.context = this.canvas.getContext("2d");
      this.width = this.canvas.width;
      this.thorns = [];
      this.nextThorn = 0;
      this.offset = 0;
      this.lastTick = null;
      this.running = false;
      this.finish = null;

      this.initObjects();
      this.draw();
      requestAnimationFrame(this.step.bind(this));
    }

    initObjects = () => {
      this.player = new Ball({
        context: this.context,
        left: this.width / 2 - 45,
        bottom: this.canvas.height - GROUND_BUFFER,
        color: DEFAULT_COLOUR,
      });

      this.background = new Background({
        context: this.context,
        width: this.canvas.width,
        height: this.canvas.height,
        colour: DEFAULT_COLOUR,
      });

      this.score = new ScoreBoard({
        context: this.context,
        left: this.canvas.width - 10,
        bottom: 26,
        colors: DEFAULT_COLOUR,
      });
    };

    updateThorns = () => {
      while (this.offset > this.nextThorn) {
        var count = Math.floor(rand(1, 3.9)),
          scale = rand(0.8, 1.5),
          x = this.canvas.width + this.offset + SCREEN_BUFFER;

        while (count--) {
          this.thorns.push(
            new Thorn({
              left: x + count * 20 * scale,
              bottom: this.canvas.height - GROUND_BUFFER,
              scale: scale,
              size: rand(0.5, 1.5),
              color: DEFAULT_COLOUR,
            })
          );
        }

        this.nextThorn =
          this.offset + rand(MIN_CACTUS_DISTANCE, this.canvas.width);
      }
    };
    removeOldThorns = () => {
      let count = 0;

      while (
        this.thorns.length > count &&
        this.thorns[count].x < this.offset - SCREEN_BUFFER
      ) {
        count++;
      }

      this.thorns.splice(0, count);
    };

    draw = () => {
      this.clear();
      this.background.draw(this.context, this.offset);

      for (var i = 0; i < this.thorns.length; i++) {
        this.thorns[i].drawColliders(this.context, this.offset);
        this.thorns[i].draw(this.context, this.offset);
      }
      this.player.drawColliders(this.context, this.offset);
      this.player.draw(this.context, this.offset);
      this.score.draw(this.context, this.offset);
    };

    checkThornsHit = () => {
      for (var i = 0; i < this.thorns.length; i++) {
        if (this.player.collidesWith(this.thorns[i], this.offset)) {
          this.running = false;
          document.querySelector("#playGameBtn").disabled = true;
          this.finish = "Game over!";
          this.player.wideEyed = true;
          return;
        }
      }
    };

    clear = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    step = (timestamp) => {
      if (this.running && this.lastTick) {
        this.offset +=
          Math.min(timestamp - this.lastTick, MAX_TIME_TICK) * OFFSET_SPEED;
        if (Math.floor(this.offset * 0.1) === LEVEL_1) this.finish = "You win!";

        this.removeOldThorns();
        this.updateThorns();

        if (!this.player.isJumping(this.offset) && spacePressed) {
          this.player.startJump(this.offset);
        }

        this.checkThornsHit();
        this.draw();
      } else if (spacePressed) {
        this.running = true;
      }

      if (!this.finish) {
        this.lastTick = timestamp;
        requestAnimationFrame(this.step.bind(this));
      } else {
        const message = new GameMessage({
          context: this.context,
          left: this.canvas.width / 2 - 30,
          bottom: this.canvas.height / 2 - 8,
          color: DEFAULT_COLOUR,
        });
        message.draw(this.context, this.finish);
      }
    };
  };

  namespace.Game = Game;
})(window);
