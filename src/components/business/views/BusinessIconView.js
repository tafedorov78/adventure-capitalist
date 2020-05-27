import View from "@base/View";
import Utils from "@utils/Utils";
import * as PIXI from "pixi.js";

export default class BusinessIconView extends View {

  constructor(pattern, callback = null) {
    super(pattern, callback)
  }

  draw() {
    super.draw()

    this.iconBack = new PIXI.Sprite(PIXI.Texture.from('iconBack'))
    Utils.applyFromPattern(this.iconBack, this.pattern.iconBack)
    this.addChild(this.iconBack)

    this.iconTop = new PIXI.Sprite(PIXI.Texture.from('upgradeProgressTop'))
    Utils.applyFromPattern(this.iconTop, this.pattern.upgradeProgressTop)
    this.addChild(this.iconTop)

    this.maskProgressBar = new PIXI.Graphics()
    this.maskProgressBar.beginFill(0x756666)
    this.maskProgressBar.drawRect(0, 0, 0.01, this.pattern.upgradeProgressTop.height)
    this.maskProgressBar.endFill()
    Utils.applyFromPattern(this.maskProgressBar, this.pattern.upgradeProgressTop)
    this.addChild(this.maskProgressBar)

    this.iconTop.mask = this.maskProgressBar

    const style = new PIXI.TextStyle({
      align: "center",
      fill: "white",
      fontSize: 12
    })
    this.upgradeCounterText = new PIXI.Text('', style)
    this.upgradeCounterText.anchor.set(0.5)
    Utils.applyFromPattern(this.upgradeCounterText, this.pattern.upgradeCounterText)
    this.addChild(this.upgradeCounterText)
  }

  updateProgress(max, value) {
    this.upgradeCounterText.text = String(value.toFixed(0))
    let width = value * (this.iconTop.width / max)
    this.maskProgressBar.width = width

  }

}