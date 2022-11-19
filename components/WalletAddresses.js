/* 
 * Algodex Mailbox 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

//MUI components
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Tooltip from '@mui/material/Tooltip'

// Lib Files
import Helper from '@/lib/helper'

export const WalletAddresses = ({ setWallet, formattedAddresses }) => {
  const [finalAddresses, setFinalAddresses] = useState([])
  const [radioVal, setRadioVal] = useState(null)

  useEffect(() => {
    getAddyNames()
  }, [formattedAddresses, getAddyNames])

  const getAddyNames = useCallback(async () => {
    let addresses = []
    for (let address of formattedAddresses) {
      // let names = await Helper.getAlgoNamesOrAddress(address, 'getNames')
      // DISABLE ANS DUE TO INDEXER ISSUES
      addresses.push({
        // name: names[0]?.name || null,
        name: null,
        wallet: address,
      })
    }
    setFinalAddresses(addresses)
    if (formattedAddresses.length === 1) {
      setRadioVal(formattedAddresses[0])
      setWallet(formattedAddresses[0])
    }
  }, [formattedAddresses, setWallet])

  return (
    <Box sx={{ marginTop: finalAddresses.length > 0 ? '1rem' : '0rem' }}>
      <FormControl>
        <RadioGroup
          aria-labelledby="wallet"
          name="wallet"
          onChange={({ target: { value } }) => {
            setRadioVal(value)
            setWallet(value)
          }}
          value={radioVal}
        >
          {finalAddresses.map((address) => (
            <Tooltip
              placement="top-start"
              key={address.wallet}
              title={address.name ? address.wallet : ''}
            >
              <FormControlLabel
                value={address.wallet}
                control={
                  <Radio color="secondary" data-testid="wallet-radio-input" />
                }
                label={address.name || address.wallet}
              />
            </Tooltip>
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

WalletAddresses.propTypes = {
  setWallet: PropTypes.func,
  formattedAddresses: PropTypes.array,
}
export default WalletAddresses
