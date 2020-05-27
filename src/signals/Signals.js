import signals from 'signals'

export default {
  loadingProgress: new signals.Signal (),
  assetsLoadingComplete: new signals.Signal (),

  resetGame: new signals.Signal (),
  sendProfit: new signals.Signal (),
  requestMoney: new signals.Signal (),
  balanceUpdated: new signals.Signal ()

}