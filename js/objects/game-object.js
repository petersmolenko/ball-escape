(function (namespace) {
  const collidesWith = (first, second) => {
    return (
      first.x < second.x + second.width &&
      first.x + first.width > second.x &&
      first.y > second.y - second.height &&
      first.y - first.height < second.y
    );
  };
  
  const FILL_COLOR = "#EEE";

  const GameObject = class {
    draw(context, offset) {
      throw new Error("Draw not yet implemented");
    }

    colliders(offset) {
      throw new Error("Colliders not yet implemented");
    }

    drawColliders(context, offset) {
      let colliders = [];

      context.fillStyle = FILL_COLOR;
      try {
        colliders = this.colliders(offset);
      } catch (e) {}
      for (let i = 0; i < colliders.length; i++) {
        context.fillRect(
          colliders[i].x - offset,
          colliders[i].y - colliders[i].height,
          colliders[i].width,
          colliders[i].height
        );
      }
    }

    collidesWith(that, offset) {
      const firstList = this.colliders(offset);
      const secondList = that.colliders(offset);

      for (let i = 0; i < firstList.length; i++) {
        for (let j = 0; j < secondList.length; j++) {
          if (collidesWith(firstList[i], secondList[j])) {
            return true;
          }
        }
      }

      return false;
    }
  };

  namespace.GameObject = GameObject;
})(window);
