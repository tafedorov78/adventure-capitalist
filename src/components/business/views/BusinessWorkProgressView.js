import View from "@base/View";
import {Linear, gsap} from "gsap";
import Utils from "@utils/Utils";
import * as PIXI from "pixi.js";

export default class BusinessWorkProgressView extends View {

  constructor(pattern, callback = null) {
    super(pattern, callback)
  }

  draw() {
    super.draw()

    this.workProgressBack = new PIXI.Sprite(PIXI.Texture.from('workProgressBack'))
    Utils.applyFromPattern(this.workProgressBack, this.pattern.workProgressBack)
    this.addChild(this.workProgressBack)

    this.workProgressTop = new PIXI.Sprite(PIXI.Texture.from('workProgressTop'))
    Utils.applyFromPattern(this.workProgressTop, this.pattern.workProgressTop)
    this.addChild(this.workProgressTop)

    this.maskProgressBar = new PIXI.Graphics()
    this.maskProgressBar.beginFill(0x756666)
    this.maskProgressBar.drawRect(this.pattern.workProgressBack.x, this.pattern.workProgressBack.y,
                        0.0001, this.pattern.workProgressBack.height)
    this.maskProgressBar.endFill()
    this.addChild(this.maskProgressBar)

    this.workProgressTop.mask = this.maskProgressBar

    const style = new PIXI.TextStyle({
      align: "center",
      fill: "white",
      fontSize: 12,
      textBaseline: "middle"
    })
    this.profitText = new PIXI.Text('', style)
    this.profitText.anchor.set(0.5)
    Utils.applyFromPattern(this.profitText, this.pattern.profitText)
    this.addChild(this.profitText)
  }

  doWork(time) {
    this.maskProgressBar.width = 0.001
    gsap.killTweensOf(this.maskProgressBar)
    gsap.to(this.maskProgressBar, time, {width: this.workProgressTop.width, ease: Linear.easeNone, onComplete: () => {
        this.maskProgressBar.width = 0.001
      }})
  }

  updateCurrentProfit(value) {
    this.profitText.text = value.toFixed(2)
  }

}