const EventEmitter = require('eventemitter3')

let EE

function makeEventEmiiter() {
  if (typeof EE === 'undefined') {
    const _ee = new EventEmitter()
    EE = {
      on: (event, fn) => _ee.on(event, fn),
      once: (event, fn) => _ee.once(event, fn),
      off: (event, fn) => _ee.off(event, fn),
      emit: (event, payload) => _ee.emit(event, payload),
    }
    Object.freeze(EE)
  }
  return EE
}

module.exports = makeEventEmiiter()
