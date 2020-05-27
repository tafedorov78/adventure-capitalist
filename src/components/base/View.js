import * as PIXI from "pixi.js";

export default class View extends PIXI.Container {

  constructor(pattern, callback = null) {
    super()
    this.pattern = pattern
    this.callback = callback
    this.draw()
  }

  draw() {

  }


}