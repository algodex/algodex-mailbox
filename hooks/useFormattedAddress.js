import {useCallback, useEffect, useState} from 'react'
import useMyAlgo from './use-my-algo'


function useFormattedAddress(){
  const [formattedAddresses, setFormattedAddresses] = useState([])

  useEffect(() => {
    setFormattedAddresses(
      JSON.parse(localStorage.getItem('algodex_user_wallet_addresses')) || []
    )
  }, [])
  const updateAddresses = useCallback(
    (addresses) => {
      if (addresses == null) {
        return
      }
      // console.debug({ addresses })
      localStorage.setItem(
        'algodex_user_wallet_addresses',
        JSON.stringify(addresses)
      )
      setFormattedAddresses(addresses)
    },
    [setFormattedAddresses]
  )

  const { connect } = useMyAlgo(updateAddresses)

  return {formattedAddresses, connect}
}

export default useFormattedAddress
