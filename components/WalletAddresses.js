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
import algosdk from 'algosdk'

const { purestakeIndexerServer, purestakeIndexerToken, purestakeClientServer } =
  Helper.getAlgodex()
const client = new algosdk.Algodv2(
  {
    'X-API-Key': purestakeIndexerToken,
  },
  purestakeClientServer,
  ''
)
const indexer = new algosdk.Indexer(
  {
    'X-API-Key': purestakeIndexerToken,
  },
  purestakeIndexerServer,
  ''
)

export const WalletAddresses = ({ setWallet, formattedAddresses }) => {
  const [finalAddresses, setFinalAddresses] = useState([])
  let sdk = new ANS(client, indexer)

  useEffect(() => {
    getAddyNames()
  }, [formattedAddresses, getAddyNames])

  const getAddyNames = useCallback(async () => {
    const options = {
      socials: false, 
      metadata: false, 
      limit: 1,
    }
    let addresses = []
    for (let address of formattedAddresses) {
      let names = await sdk.address(address).getNames(options)
      addresses.push({
        name: names[0]?.name || null,
        wallet: address,
      })
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
