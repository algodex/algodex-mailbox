import React, { useCallback, useEffect, useState } from 'react'

//MUI components
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

//Algonameservice SDK
import { ANS } from '@algonameservice/sdk'

// Library Files
import Helper from '@/lib/helper'

export const WalletAddresses = ({ setWallet, formattedAddresses }) => {
  const [finalAddresses, setFinalAddresses] = useState([])
  const { algodClient, indexerServer } = Helper.getAlgodex()
  const client = algodClient.c.bc.baseURL.origin
  let sdk = new ANS(client, indexerServer)

  useEffect(() => {
    getAddyNames()
  }, [formattedAddresses, getAddyNames])

  const getAddyNames = useCallback(async () => {
    const options = {
      socials: false, // get socials with .algo name
      metadata: false, // // get metadata like expiry, avatar with .algo name;
      limit: 1, // number of names to be retrieved
    }
    let addresses = []
    for (let address of formattedAddresses) {
      let names = await sdk.address(address).getNames(options)

      // Names appear in a reverse chronological order (names[0] returns recently purchased name)
      if (names.length > 0) {
        addresses.push({
          name: names[0].name,
          wallet: address,
        })
      } else {
        //No names registered by this address
        addresses.push({
          name: null,
          wallet: address,
        })
      }
    }
    setFinalAddresses(addresses)
  }, [formattedAddresses])

  return (
    <Box sx={{ marginTop: finalAddresses.length > 0 ? '1rem' : '0rem' }}>
      <FormControl>
        <RadioGroup
          aria-labelledby="wallet"
          name="wallet"
          onChange={(e) => {
            setWallet(e.target.value)
          }}
        >
          {finalAddresses.map((address) => (
            <FormControlLabel
              key={address.wallet}
              value={address.wallet}
              control={
                <Radio color="secondary" data-testid="wallet-radio-input" />
              }
              label={address.name || address.wallet}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}
