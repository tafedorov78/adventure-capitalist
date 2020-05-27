import View from "@base/View";
import * as PIXI from "pixi.js";
import Utils from "@/src/utils/Utils";

export default class BusinessCoverView extends View {

  constructor(pattern, callback = null) {
    super(pattern, callback)
  }

  draw() {
    super.draw()

    this.cover = new PIXI.Sprite(PIXI.Texture.from('upgradeButton'))
    this.cover.scale.set(2)
    this.cover.anchor.set(0.25)
    this.addChild(this.cover)

    const style = new PIXI.TextStyle({
      align: "center",
      fill: "white",
      fontSize: 12
    })
    this.initialPriceText = new PIXI.Text('', style)
    Utils.applyFromPattern(this.initialPriceText, this.pattern.price)
    this.initialPriceText.anchor.set(0.5)
    this.addChild(this.initialPriceText)

    this.nameText = new PIXI.Text('', style)
    Utils.applyFromPattern(this.nameText, this.pattern.businessName)
    this.nameText.anchor.set(0.5)
    this.addChild(this.nameText)
  }

  setPrice(value) {
    this.initialPriceText.text = `PRICE: ${value.toFixed(2)}`
  }

  setName(value) {
    this.nameText.text = value
  }

}