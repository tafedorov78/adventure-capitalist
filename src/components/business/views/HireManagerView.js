import View from "@base/View";
import Config from "@config/Config";
import Utils from "@utils/Utils";
import * as PIXI from "pixi.js";
import { gsap, Circ } from "gsap/gsap-core";

export default class HireManagerView extends View {

  constructor(pattern, callback = null) {
    super(pattern, callback)
  }

  draw() {
    super.draw()

    this.back = new PIXI.Sprite(PIXI.Texture.from('hireManager'))
    Utils.applyFromPattern(this.back, this.pattern.back)
    this.addChild(this.back)

    this.flag = new PIXI.Sprite(PIXI.Texture.from('flag'))
    this.flag.anchor.set(0, 1)
    Utils.applyFromPattern(this.flag, this.pattern.flag)
    this.addChild(this.flag)
    this.flag.visible = false

    const style = new PIXI.TextStyle({
      align: "center",
      fill: "black",
      fontSize: 10
    })

    this.hireManagerCostText = new PIXI.Text('', style)
    this.hireManagerCostText.anchor.set(0.5)
    Utils.applyFromPattern(this.hireManagerCostText, this.pattern.hireManagerCostText)
    this.addChild(this.hireManagerCostText)
  }

  showFlag() {
    this.removeChild(this.back)
    this.removeChild(this.hireManagerCostText)
    this.back = null
    this.hireManagerCostText = null

    this.flag.rotation = Utils.deg2rad(-90)
    this.flag.visible = true
    gsap.to(this.flag, 0.3, {rotation: Utils.deg2rad(30), ease: Circ.easeIn})
  }

  setPrice(value) {
    this.hireManagerCostText.text = value.toFixed(2)
  }


}