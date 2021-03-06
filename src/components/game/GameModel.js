import Model from "@base/Model";
import Signals from "@signals/Signals";
import BusinessConfig from "@config/BusinessConfig";
import Config from "@config/Config";

export default class GameModel extends Model {

  constructor () {
    super()
  }

  init() {
    let savedData = localStorage.getItem(Config.gameId)
    if(savedData) {
      this.data = JSON.parse(savedData)
    } else {
      this.data = BusinessConfig.config
    }
    this.currentTime = Date.now() / 1000
    this.timePast = Math.ceil(this.currentTime - this.data.currentTime)
    this.balance = this.data.balance
  }

  getData() {
    let pastIncome = 0
    let businessData = null
    for (let key in this.data.businesses) {
      businessData = this.data.businesses[key]
      if(businessData.isAuto) {
        let cycles = this.timePast / businessData.currentCycleTime
        pastIncome += cycles * businessData.currentProfit
      }
    }
    this.balance += pastIncome
    return this.data
  }

  saveData(data) {
    localStorage.setItem(Config.gameId, JSON.stringify(data))
  }

  storeProfitFromBusiness(amount) {
    this.balance += amount
    this.updateBalance()
  }

  requestMoney(amount) {
    if(this.balance < amount) {
    } else {
      this.balance -= amount
      this.updateBalance()
    }
  }

  updateBalance() {
    Signals.balanceUpdated.dispatch(this.balance)
  }

  resetData() {
    localStorage.removeItem(Config.gameId)
  }

}