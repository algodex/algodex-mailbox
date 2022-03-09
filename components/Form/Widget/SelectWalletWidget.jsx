import React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

import useMailbox from '@/hooks/useMailbox'
import Button from '@mui/material/Button'
import {useTranslation} from 'next-i18next'

function SelectWalletWidget(props){
  console.log('SelectWalletWidget(', arguments[0], ')')
  const {t} = useTranslation('common')
  // Run Mailbox Effects
  const {connect, isConnected, wallet, addresses} = useMailbox()

  return (
    <Box sx={{ marginBottom: '1rem' }}>
      <FormControl>
        <FormLabel >{props.label} {wallet?.address}</FormLabel>
        {!isConnected && <Button variant="contained" onClick={connect}>
          {t('connect-wallet')}
        </Button>}
        <RadioGroup
          onChange={(event, value) => {
            console.log('Radio Group Change', value, props.value)
            props.onChange(value)
          }}
        >
          {isConnected && addresses.map((w, key) => (
            <FormControlLabel
              key={key}
              value={w.address}
              control={<Radio color="secondary" />}
              label={w.address}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default SelectWalletWidget
