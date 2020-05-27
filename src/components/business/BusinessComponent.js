import Component from "@base/Component";
import BusinessView from "./BusinessView";
import BusinessModel from "./BusinessModel";
import BusinessManager from "./BusinessManager";
import Config from "@config/Config";
import Signals from "@signals/Signals";

export default class BusinessComponent extends Component{

  constructor (stage, data) {
    super(stage, data)
  }

  init() {
    Signals.balanceUpdated.add(this.onGameBalanceUpdate, this)

    this.model = new BusinessModel(this.data)
    this.manager = new BusinessManager(this.onManagerDidWork.bind(this))
    this.view = new BusinessView(Config.pattern[this.data.id], this.onPlayerClicked.bind(this))
    this.view.setBusinessInitialPrice(this.model.initialPrice)
    this.view.setBusinessName(this.model.name)
    this.view.setManagerCost(this.model.managerCost)

    if(this.model.isActive) {
      this.start()
      this.view.enable()

      if(this.model.isAuto) {
        this.setAutoMode()
      }
    }
    super.init()
  }

  onGameBalanceUpdate(value) {
    this.model.checkForAbility(value)

    if(!this.model.isActive) {
      if (this.model.ableToStart) {
        this.view.enable ()
      } else {
        this.view.disable ()
      }
    }

    if (this.model.ableToUpgrade) {
      this.view.setUpgradeActive ()
    } else {
      this.view.setUpgradeInactive ()
    }

    if(!this.model.isAuto) {
      if (this.model.ableToAutoManaged) {
        this.view.setHireManagerActive ()
      } else {
        this.view.setHireManagerInactive ()
      }
    }
  }

  onPlayerClicked(data) {
    console.log(this.data.id, data)

    switch (data) {
      case 'start':
        this.model.start()
        this.manager.buyBusiness(this.model.initialPrice)
        break

      case 'earn':
        this.makeProfit()
        break

      case 'upgrade':
        this.view.setUpgradeInactive()
        this.manager.tryUpgradeBusiness(this.model.currentUpgrateCost)
        break

      case 'hire':
        this.manager.tryHireManager(this.model.managerCost)
        break
    }
  }

  start() {
    this.idleState = true
    this.view.showAll()
    this.updateViewUpgrade()
  }

  onManagerDidWork(data) {
    switch (data) {
      case 'workDone':
        this.model.sendProfit()
        this.idleState = true
        if(this.model.isAuto) {
          this.makeProfit()
        }
        break

      case 'gotTheBusiness':
        this.start()
        break

      case 'upgradeDone':
        this.model.upgradeBusiness()
        this.updateViewUpgrade()
        break

      case 'managerHired':
        this.setAutoMode()
        break
    }
  }

  makeProfit() {
    if(!this.idleState) {
      return
    }
    this.idleState = false
    this.manager.doWork(this.model.currentCycleTime)
    this.view.animateProgressBar(this.model.currentCycleTime)
    this.view.playTime(this.model.currentCycleTime)
  }

  updateViewUpgrade() {
    this.view.updateUpgradeProgress(this.model.maxUpgradeIterations, this.model.currentUpgrateIteration)
    this.view.updateCurrentProfit(this.model.currentProfit)
    this.view.updateUpgradeCost(this.model.currentUpgrateCost)
    this.view.setTimeInitValue(this.model.currentCycleTime)
  }

  setAutoMode() {
    this.model.setAuto()
    this.makeProfit()
    this.view.showFlag()
  }

  getData() {
    return this.model.getData()
  }

  destroyComponent() {
    Signals.balanceUpdated.remove(this.onGameBalanceUpdate, this)
    this.model = null
    this.manager = null
    this.view.destroy()
  }

}