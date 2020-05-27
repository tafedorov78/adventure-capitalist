import * as PIXI from 'pixi.js'
import ScaleManager from './ScaleManager'
import Config from '@config/Config'


export default class Stage {
  constructor () {
    const canvas = document.getElementById('gameCanvas')

    this.app = new PIXI.Application({
      view: canvas,
      legacy: true,
      antialias:true,
      preserveDrawingBuffer:true,
      sharedLoader:true,
      width: Config.CANVAS_WIDTH_LANDSCAPE,
      height: Config.CANVAS_HEIGHT_LANDSCAPE
    })
    new ScaleManager(this.app)

    //this.app.stop()

    this.app.renderer.plugins.interaction.autoPreventDefault = true
    Config.app = this.app
    return this.app.stage
  }

}