import View from "@base/View";
import Utils from "@utils/Utils";
import BusinessIconView from "./views/BusinessIconView";
import BusinessWorkProgressView from "@/src/components/business/views/BusinessWorkProgressView";
import UpgradeBtnView from "@/src/components/business/views/UpgradeBtnView";
import WorkTimerView from "@/src/components/business/views/WorkTimerView";
import * as PIXI from "pixi.js";
import HireManagerView from "@/src/components/business/views/HireManagerView";
import BusinessCoverView from "@/src/components/business/views/BusinessCoverView";

export default class BusinessView extends View {

  constructor(pattern, callback) {
    super(pattern, callback)
  }


  draw() {
    super.draw()

    Utils.applyFromPattern(this, this.pattern)

    this.coverView = new BusinessCoverView(this.pattern.cover_object)
    Utils.applyFromPattern(this.coverView, this.pattern.cover_object)
    this.addChild(this.coverView)

    this.iconView = new BusinessIconView(this.pattern.businessIcon_object)
    Utils.applyFromPattern(this.iconView, this.pattern.businessIcon_object)
    this.addChild(this.iconView)

    this.hireManagerView = new HireManagerView(this.pattern.hireManagerBack_object)
    Utils.applyFromPattern(this.hireManagerView, this.pattern.hireManagerBack_object)
    this.addChild(this.hireManagerView)

    this.workProgressView = new BusinessWorkProgressView(this.pattern.workProgress_object)
    Utils.applyFromPattern(this.workProgressView, this.pattern.workProgress_object)
    this.addChild(this.workProgressView)

    this.upgradeBtnView = new UpgradeBtnView(this.pattern.upgradeButton_object)
    Utils.applyFromPattern(this.upgradeBtnView, this.pattern.upgradeButton_object)
    this.addChild(this.upgradeBtnView)

    this.workTimerView = new WorkTimerView(this.pattern.timerBack_object)
    Utils.applyFromPattern(this.workTimerView, this.pattern.timerBack_object)
    this.addChild(this.workTimerView)

    this.iconView.visible = false
    this.hireManagerView.visible = false
    this.workProgressView.visible = false
    this.upgradeBtnView.visible = false
    this.workTimerView.visible = false
    this.coverView.on('click', () => this.callback('start'))

    this.shadowFilter = new PIXI.filters.ColorMatrixFilter()
    this.shadowFilter.brightness(0.6, false)
    this.disable()
  }

  setBusinessInitialPrice(value) {
    this.coverView.setPrice(value)
  }

  setBusinessName(value) {
    this.coverView.setName(value)
  }

  showAll() {
    this.coverView.visible = false
    this.iconView.visible = true
    this.hireManagerView.visible = true
    this.workProgressView.visible = true
    this.upgradeBtnView.visible = true
    this.workTimerView.visible = true

    this.setCallback()
  }

  enable() {
    this.filters = null
    this.coverView.interactive = true
  }

  disable() {
    this.filters = [this.shadowFilter]
    this.coverView.interactive = false
  }

  setUpgradeActive() {
    this.upgradeBtnView.filters = null
    this.upgradeBtnView.interactive = true
  }

  setUpgradeInactive() {
    this.upgradeBtnView.filters = [this.shadowFilter]
    this.upgradeBtnView.interactive = false
  }

  setHireManagerActive() {
    this.hireManagerView.filters = null
    this.hireManagerView.interactive = true
  }

  setHireManagerInactive() {
    this.hireManagerView.filters = [this.shadowFilter]
    this.hireManagerView.interactive = false
  }

  setTimeInitValue(value) {
    this.workTimerView.setInitTime(value)
  }

  playTime(value) {
    this.workTimerView.playTime(value)
  }

  setCallback() {
    this.iconView.interactive = true
    this.workProgressView.interactive = true
    this.upgradeBtnView.on('pointerup', (e) => {
      e.stopPropagation()
      this.callback('upgrade')
    })
    this.hireManagerView.on('pointerup', (e) => {
      e.stopPropagation()
      this.callback('hire')
    })
    this.iconView.on('pointerup', (e) => {
      e.stopPropagation()
      this.callback('earn')
    })
    this.workProgressView.on('pointerup', (e) => {
      e.stopPropagation()
      this.callback('earn')
    })

  }

  animateProgressBar(time) {
    this.workProgressView.doWork(time)
  }

  updateUpgradeProgress(max, value) {
    this.iconView.updateProgress(max, value)
  }

  updateUpgradeCost(value) {
    this.upgradeBtnView.updateUpgradeCost(value)
  }

  updateCurrentProfit(value) {
    this.workProgressView.updateCurrentProfit(value)
  }

  setManagerCost(value) {
    this.hireManagerView.setPrice(value)
  }

  showFlag() {
    this.hireManagerView.filters = null
    this.hireManagerView.interactive = false
    this.hireManagerView.showFlag()
  }
}