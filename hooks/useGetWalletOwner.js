import Helper from '../lib/helper'

export const useGetWalletOwner = (updateStatusMessage) => {
  const getWalletOwner = async (value, type, setState) => {
    try {
      let response = await Helper.getAlgoNamesOrAddress(value, type)
      if (setState) {
        setState(response)
      }
      return response
    } catch (error) {
      if (updateStatusMessage) {
        updateStatusMessage('This is not a valid Algorand address', false)
      } else {
        return error
      }
    }
  }

  return { getWalletOwner }
}
