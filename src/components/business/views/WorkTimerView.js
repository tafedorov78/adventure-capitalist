import View from "@base/View";
import Config from "@config/Config";
import Utils from "@utils/Utils";
import * as PIXI from "pixi.js";
import gsap from "gsap";
import { Linear } from "gsap/gsap-core";

export default class WorkTimerView extends View {

  constructor(pattern, callback = null) {
    super(pattern, callback)
  }

  draw() {
    super.draw()

    this.back = new PIXI.Sprite(PIXI.Texture.from('timerBack'))
    this.addChild(this.back)

    const style = new PIXI.TextStyle({
      align: "center",
      fill: "black",
      fontSize: 10
    })

    this.timeText = new PIXI.Text('', style)
    this.timeText.anchor.set(0.5)
    Utils.applyFromPattern(this.timeText, this.pattern.timerText)
    this.addChild(this.timeText)
  }

  setInitTime(value) {
    this.timeText.text = Utils.sec2time(value)
  }

  playTime(value) {
    const cont = {val:value - 1}
    this.timeText.text = Utils.sec2time(cont.val)
    gsap.to (cont, value, { val: 0, ease: Linear.easeNone, onUpdate: () => {
        this.timeText.text = Utils.sec2time(Math.ceil(cont.val))
      }, onComplete: () => {
        this.timeText.text = Utils.sec2time(value)
      }})


  }

}