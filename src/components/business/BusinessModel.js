import Model from "@base/Model";
import Signals from "@signals/Signals";

export default class BusinessModel extends Model {

  constructor (data) {
    super(data)
  }

  init(data) {
    this.isAuto = this.data.isAuto

    this.isActive = this.data.isActive
    this.initialPrice = this.data.initialPrice
    this.managerCost = this.data.managerCost
    this.initialProfit = this.data.initialProfit
    this.currentProfit = this.data.currentProfit
    this.currentUpgrateCost = this.data.currentUpgrateCost
    this.nextUpgrateCostPercent = this.data.nextUpgrateCostPercent
    this.maxUpgradeIterations = this.data.maxUpgradeIterations
    this.cycleTime = this.data.cycleTime
    this.currentUpgrateIteration = this.data.currentUpgrateIteration
    this.currentCycleTime = this.data.currentCycleTime
    this.id = this.data.id
    this.name = this.data.name

    this.ableToStart = false
    this.ableToUpgrade = false
    this.ableToAutoManaged = false
  }


  sendProfit() {
    Signals.sendProfit.dispatch(this.currentProfit)
  }

  nextProfit() {
    return this.currentProfit + this.initialProfit
  }

  upgradeBusiness() {
    if(this.currentUpgrateIteration + 1 <= this.maxUpgradeIterations) {
      this.currentUpgrateIteration++
      this.currentUpgrateCost = this.currentUpgrateCost + (this.nextUpgrateCostPercent * (this.currentUpgrateCost / 100))
      this.currentProfit = this.nextProfit()
    }
  }

  setAuto() {
    this.isAuto = true
  }

  start() {
    this.isActive = true
  }

  checkForAbility(gameBalance) {
    if(!this.isActive) {
      this.ableToStart = gameBalance >= this.initialPrice ? true : false
    }
    this.ableToUpgrade = gameBalance >= this.currentUpgrateCost && this.currentUpgrateIteration < this.maxUpgradeIterations && this.isActive ? true : false

    this.ableToAutoManaged = gameBalance >= this.managerCost && !this.isAuto && this.isActive ? true : false
  }

  getData() {
    return {
      name: this.name,
      id: this.id,
      isActive: this.isActive,
      isAuto: this.isAuto,
      initialPrice: this.initialPrice,
      initialProfit: this.initialProfit,
      currentProfit: this.currentProfit,
      maxUpgradeIterations: this.maxUpgradeIterations,
      nextUpgrateCostPercent: this.nextUpgrateCostPercent,
      managerCost: this.managerCost,
      currentUpgrateCost: this.currentUpgrateCost,
      currentUpgrateIteration: this.currentUpgrateIteration,
      currentCycleTime: this.currentCycleTime
    }
  }

}