import Signals from '@signals/Signals'
import Stage from '../stage/Stage'
import ApplicationLoader from './ApplicationLoader'
import GameComponent from "@/src/components/game/GameComponent";

export default class Application {
  constructor () {
    Signals.assetsLoadingComplete.add(this.onAssetsLoadingComplete)
    this.stage = new Stage()
    new ApplicationLoader()
  }

  onAssetsLoadingComplete = () => {
    console.log('GAME STARTED!')
    new GameComponent(this.stage)
  }

}