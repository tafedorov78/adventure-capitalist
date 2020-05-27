import * as PIXI from "pixi.js";
import View from "@base/View";
import Config from "@config/Config";
import Utils from "@/src/utils/Utils";
import Signals from "@signals/Signals";

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

    this.resetBtn = new PIXI.Sprite(PIXI.Texture.from('upgradeButton'))
    this.addChild(this.resetBtn)

    const style = new PIXI.TextStyle({
      align: "right",
      fill: "white",
      fontSize: 12
    })

    this.resetLabelText = new PIXI.Text('Reset all data', style)
    this.resetLabelText.anchor.set(0.5)
    this.resetLabelText.x = 60
    this.resetLabelText.y = 18
    this.addChild(this.resetLabelText)

    this.resetBtn.interactive = true
    this.resetBtn.on('pointerup', (e) => {
      e.stopPropagation()
      Signals.resetGame.dispatch()
    })
  }

  setBalanceText(value) {
    this.balanceText.text = `BALANCE: ${Config.CURRENCY_SYMBOL} ${value.toFixed(2)}`
  }


}