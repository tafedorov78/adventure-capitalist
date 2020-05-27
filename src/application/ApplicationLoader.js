import Signals from '@signals/Signals'
import Config from '@config/Config'
import 'pixi-assetslist-loader'
import * as PIXI from 'pixi.js'

export default class ApplicationLoader {

  constructor() {
    this.loadGameAssets()
  }

  loadGameAssets() {
    PIXI.Loader.shared.add('./assets/AssetsConfig.json');
    PIXI.Loader.shared.once('complete', this.onComplete, this);
    PIXI.Loader.shared.on('progress', (e) => {
      Signals.loadingProgress.dispatch(e.progress)
    }, this);
    PIXI.Loader.shared.load()
  }

  onComplete= () => {
    Config.pattern = PIXI.Loader.shared.resources['pattern'].data

    const entries = Object.entries(PIXI.Loader.shared.resources)
    this.textures = []
    for (let i = 0; i < entries.length; i ++) {
      let res = entries[i][1]
      if (res.texture) {
        this.textures.push(res.texture.baseTexture)
      }
    }

    this.prepare(this.textures, 0)
  }

  prepare = (textures, index) => {
    Config.app.renderer.plugins.prepare.upload(textures[index], () => {
      if(index + 1 <= this.textures.length - 1) {
        this.prepare (textures, index + 1)
      } else {
        Signals.assetsLoadingComplete.dispatch()
      }
    });
  }

}
