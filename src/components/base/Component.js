export default class Component {

  constructor(stage, data = null) {
    this.stage = stage
    this.data = data
    this.view = null
    this.manager = null
    this.model = null
    this.init()
  }

  init() {
    this.stage.addChild(this.view)
  }

  onManagerDidWork(data) {

  }
}