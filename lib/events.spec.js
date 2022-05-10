describe('Events', ()=>{
  it('should get the emitter', ()=>{
    const ee = require('./events')
    const onSpy = jest.fn()
    const payload = {
      type: 'buy',
      amount: 100,
    }
    ee.on('orders', onSpy)
    ee.once('orders', onSpy)
    ee.emit('orders', payload)
    ee.off('orders', onSpy)
    expect(onSpy).toBeCalledWith(payload)
  })
})
