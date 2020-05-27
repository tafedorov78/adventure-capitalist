import Manager from "@/src/components/base/Manager";
import {gsap} from "gsap";
import Signals from "@/src/signals/Signals";

export default class BusinessManager extends Manager {

  constructor (callback) {
    super (callback);
  }

  init() {
  }

  doWork(timeToWork) {
    this.callback('workStarted')
    gsap.delayedCall(timeToWork, () => {
      this.callback('workDone')
    })
  }

  buyBusiness(cost) {
    Signals.requestMoney.dispatch(cost)
    this.callback('gotTheBusiness')
  }

  tryUpgradeBusiness(cost) {
    Signals.requestMoney.dispatch(cost)
    this.callback('upgradeDone')
  }

  tryHireManager(cost) {
    Signals.requestMoney.dispatch(cost)
    this.callback('managerHired')
  }

}