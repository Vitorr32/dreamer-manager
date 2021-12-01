import * as PIXI from 'pixi.js';

export function MainMenuButton(x, y) {
    // var circle = new PIXI.Graphics();
    // circle.lineStyle(5, 0xFFFFFF, 1);
    // circle.beginFill(0x0000FF, 1);
    // circle.drawCircle(150, 150, 100);
    // circle.endFill();
    // circle.alpha = 0.5;

    // return circle;
    const wrapper = new PIXI.Graphics();

    wrapper.lineStyle(2, 0x232423, 1)
    wrapper.beginFill(0xDC143C, 1)
    wrapper.drawRect(x, y, 200, 50)
    wrapper.endFill()
    wrapper.interactive = true
    wrapper.hitArea = new PIXI.Rectangle(x, y, 200, 50)
    wrapper.mouseover = function (mouseData) {
        this.alpha = 1;
    }

    wrapper.mouseout = function (mouseData) {
        this.alpha = 0.5;
    }

    const interior = new PIXI.Graphics()
    interior.lineStyle(1, 0x232423)
    interior.beginFill(0xFFFFFF)
    interior.drawRect(x + 10, y + 5, 180, 40 )
    interior.endFill()

    return [wrapper, interior];
}