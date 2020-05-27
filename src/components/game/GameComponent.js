import Component from "@base/Component";
import GameModel from "./GameModel";
import GameView from "./GameView";
import GameManager from "./GameManager";
import BusinessComponent from "@/src/components/business/BusinessComponent";
import Config from "@config/Config";
import Signals from "@/src/signals/Signals";

export default class GameComponent extends Component {

  constructor (stage, data) {
    super(stage, data)
  }

  init() {
    this.model = new GameModel()
    this.manager = new GameManager(this.onManagerDidWork.bind(this))
    this.view = new GameView(Config.pattern)
    this.addListeners()
    super.init()

    this.createComponents()

    this.model.updateBalance()
  }

  createComponents() {
    this.businessComponents = []
    let businessComponent = null

    let data = this.model.getData()
    for (let key in data.businesses) {
      businessComponent = new BusinessComponent(this.stage, data.businesses[key])
      this.businessComponents.push(businessComponent)
    }
    this.view.setBalanceText(this.model.balance)
  }

  removeComponents() {
    for (let i = 0; i < this.businessComponents.length; i ++) {
      this.businessComponents[i].destroyComponent()
    }
    this.businessComponents = null
  }

  saveAll() {
    let res = {}
    res.businesses = {}
    res.balance = this.model.balance
    for (let i = 0; i < this.businessComponents.length; i ++) {
      let data = this.businessComponents[i].getData()
      res.businesses[data.id] = data
    }
    res.currentTime = Date.now() / 1000
    this.model.saveData(res)
  }

  addListeners() {
    Signals.resetGame.add(this.onResetGame, this)
    Signals.sendProfit.add(this.onSendProfit, this)
    Signals.requestMoney.add(this.onRequestMoney, this)
  }

  removeListeners() {
    Signals.resetGame.remove(this.onResetGame, this)
    Signals.sendProfit.remove(this.onSendProfit, this)
    Signals.requestMoney.remove(this.onRequestMoney, this)
  }

  onSendProfit(amount) {
    this.model.storeProfitFromBusiness(amount)
    this.view.setBalanceText(this.model.balance)
    this.currentData = this.saveAll()
  }

  onRequestMoney(amount) {
    this.model.requestMoney(amount)
    this.view.setBalanceText(this.model.balance)
    this.currentData = this.saveAll()
  }

  onResetGame() {
    this.removeComponents()
    this.removeListeners()
    this.model.resetData()
    this.removeListeners()

    this.init()
  }

  onManagerDidWork(data) {

  }

}