import View from "@base/View";
import Config from "@config/Config";
import Utils from "@utils/Utils";
import * as PIXI from "pixi.js";

export default class UpgradeBtnView extends View {

  constructor(pattern, callback = null) {
    super(pattern, callback)
  }

  draw() {
    super.draw()

    this.back = new PIXI.Sprite(PIXI.Texture.from('upgradeButton'))
    Utils.applyFromPattern(this.back, this.pattern.upgradeButton)
    this.addChild(this.back)

    const style = new PIXI.TextStyle({
      align: "right",
      fill: "white",
      fontSize: 12
    })

    this.upgradeLabelText = new PIXI.Text('Buy', style)
    this.upgradeLabelText.anchor.set(0.5)
    Utils.applyFromPattern(this.upgradeLabelText, this.pattern.upgradeLabelText)
    this.addChild(this.upgradeLabelText)

    this.upgradePriceText = new PIXI.Text('', style)
    this.upgradePriceText.anchor.set(1, 0.5)
    Utils.applyFromPattern(this.upgradePriceText, this.pattern.upgradePriceText)
    this.addChild(this.upgradePriceText)
  }

  updateUpgradeCost(value) {
    this.upgradePriceText.text = value.toFixed(2)
  }

}