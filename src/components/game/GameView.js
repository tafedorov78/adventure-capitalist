import * as PIXI from "pixi.js";
import View from "@base/View";
import Config from "@config/Config";
import Utils from "@/src/utils/Utils";

export default class GameView extends View {

  constructor(pattern) {
    super(pattern)
  }

  draw() {
    super.draw()

    this.back = new PIXI.Graphics()
    this.back.beginFill(0x756666)
    this.back.drawRect(0,0, Config.CANVAS_WIDTH_LANDSCAPE, Config.CANVAS_HEIGHT_LANDSCAPE)
    this.back.endFill()
    this.addChild(this.back)

    this.balanceText = new PIXI.Text('0.00')
    Utils.applyFromPattern(this.balanceText, this.pattern.balance)
    this.addChild(this.balanceText)

  }

  setBalanceText(value) {
    this.balanceText.text = `BALANCE: ${Config.CURRENCY_SYMBOL} ${value.toFixed(2)}`
  }


}