const ajv = require('../schema')
describe('Transactions', ()=>{
  /**
   * Test the base Transaction
   *
   * ajv.getSchema('Transaction') can validate any known Transaction schema
   */
  test('Transaction', ()=>{
    const validate = ajv.getSchema('Transaction')
    expect(validate({
      'type': 'Transaction.SendToMailbox',
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

    expect(validate({
      'type': 'Transaction.RedeemFromMailbox',
      'assetId': 224234,
      'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI'
    })).toBe(true)
  })

  /**
   * Custom Transaction
   */
  describe('SendToMailbox', ()=>{
    it('should validate transaction', () => {
      const validate = ajv.getSchema('Transaction.SendToMailbox')
      expect(validate({
        'type': 'Transaction.SendToMailbox',
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
    it('should fail to validate a different type of transaction', () => {
      const validate = ajv.getSchema('Transaction.SendToMailbox')
      expect(validate({
        'type': 'Transaction.RedeemFromMailbox',
        'assetId': 224234,
        'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI'
      })).toBe(false)
    })
    it('should fail on invalid wallet', () => {
      const validate = ajv.getSchema('Transaction.SendToMailbox')
      const valid = validate({
        'type': 'Transaction.SendToMailbox',
        'assetId': 224234,
        'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZ4OSH6PI',
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
      })

      expect(valid).toBe(false)
      // Example for getting error state
      expect(validate.errors[0].dataPath).toBe('.wallet')
      expect(validate.errors[0].keyword).toBe('pattern')
    })

    it('should fail on invalid desinationWallet', ()=>{
      const validate = ajv.getSchema('Transaction.SendToMailbox')
      // Invalid Wallet Destination Wallet
      const valid = validate({
        'type': 'Transaction.SendToMailbox',
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
      })
      expect(valid).toBe(false)
      expect(validate.errors[0].dataPath).toBe('.destinationWallets[0].wallet')
    })
  })
  describe('RedeemFromMailbox', ()=> {
    it('should validate transaction', () => {
      const validate = ajv.getSchema('Transaction.RedeemFromMailbox')
      expect(validate({
        'type': 'Transaction.RedeemFromMailbox',
        'assetId': 224234,
        'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI'
      })).toBe(true)
    })

    it('should fail to validate a different type of transaction', () => {
      const validate = ajv.getSchema('Transaction.RedeemFromMailbox')
      expect(validate({
        'type': 'Transaction.SendToMailbox',
        'assetId': 224234,
        'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI'
      })).toBe(false)
    })

    it('should fail on invalid wallet', () => {
      const validate = ajv.getSchema('Transaction.RedeemFromMailbox')
      expect(validate({
        'type': 'Transaction.RedeemFromMailbox',
        'assetId': 224234,
        'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH'
      })).toBe(false)
    })

    it('should fail on invalid asset', () => {
      const validate = ajv.getSchema('Transaction.RedeemFromMailbox')
      expect(validate({
        'type': 'Transaction.RedeemFromMailbox',
        'assetId': '123145',
        'wallet': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI'
      })).toBe(false)
    })
  })
})
