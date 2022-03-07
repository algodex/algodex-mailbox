const ajv = require('../schema')
describe('Transactions', ()=>{
  describe('SendToMailbox', ()=>{
    it('should validate transaction', () => {
      const validate = ajv.getSchema('Transaction')
      expect(validate({
        'type': 'sendToMailbox',
        'assetId': 224234,
        'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI',
        'destinationWallets': [
          {
            'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI',
            'amount': 123231
          },
          {
            'wallet': 'OOU3O5OSZGVFE5C3KZKH33TSD77UFB445OWVHDBYI6BB542HWU3A6ZLFHI',
            'amount': 4242
          }
        ]
      })).toBe(true)
    })

    it('should fail on invalid wallet', () => {
      const validate = ajv.getSchema('Transaction')
      // Invalid Wallet Top Level Wallet
      expect(validate({
        'type': 'sendToMailbox',
        'assetId': 224234,
        'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZ4OSH6PI',
        'destinationWallets': [
          {
            'toAddress': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI',
            'amount': 123231
          },
          {
            'toAddress': 'OOU3O5OSZGVFE5C3KZKH33TSD77UFB445OWVHDBYI6BB542HWU3A6ZLFHI',
            'amount': 4242
          }
        ]
      })).toBe(false)
    })

    it('should fail on invalid desinationWallet', ()=>{
      const validate = ajv.getSchema('Transaction')
      // Invalid Wallet Destination Wallet
      expect(validate({
        'type': 'sendToMailbox',
        'assetId': 224234,
        'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI',
        'destinationWallets': [
          {
            'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OPI',
            'amount': 123231
          },
          {
            'wallet': 'OOU3O5OSZGVFE5C3KZKH33TSD77UFB445OWVHDBYI6BB542HWU3ZLFHI',
            'amount': 4242
          }
        ]
      })).toBe(false)
    })
  })
  describe('RedeemFromMailbox', ()=> {
    it('should validate transaction', () => {
      const validate = ajv.getSchema('Transaction')
      expect(validate({
        'type': 'RedeemFromMailbox',
        'assetId': 224234,
        'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI'
      })).toBe(true)
    })

    it('should fail on invalid wallet', () => {
      const validate = ajv.getSchema('Transaction')
      expect(validate({
        'type': 'RedeemFromMailbox',
        'assetId': 224234,
        'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH'
      })).toBe(false)
    })

    it('should fail on invalid asset', () => {
      const validate = ajv.getSchema('Transaction')
      expect(validate({
        'type': 'RedeemFromMailbox',
        'assetId': '123145',
        'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI'
      })).toBe(false)
    })
  })
})
