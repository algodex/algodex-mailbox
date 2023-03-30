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

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

//MUI components
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Custom components, hooks, contexts
import { ConnectWallet } from './ConnectWallet'
import { WalletContext } from '@/context/walletContext'
import { WalletTypes } from '@/context/walletContext'

export const WalletAddresses = () => {
  const { formattedAddresses, setSelectedWallet, disconnect } =
    useContext(WalletContext)
  const [radioVal, setRadioVal] = useState(null)

  useEffect(() => {
    if (formattedAddresses.length === 1) {
      setRadioVal(formattedAddresses[0].address)
      setSelectedWallet(formattedAddresses[0].address)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedAddresses])

  console.log({ formattedAddresses })
  return (
    <>
      <Box
        sx={{
          border: 'solid 1px',
          borderColor: 'secondary.main',
          padding: '1rem',
          borderRadius: '0.2rem',
        }}
      >
        <Typography variant="p" fontWeight={600} fontSize="1.2rem">
          Sending Wallet:
        </Typography>

        <Typography variant="p" sx={{ fontSize: '.75rem', mb: '.7rem' }}>
          Connect a wallet using the options below. MyAlgo can sign 50
          transactions at a time and Pera can sign 64 transactions at a time.
        </Typography>

        {formattedAddresses.length > 0 && (
          <Box
            sx={{
              marginTop: '1rem',
              ['@media(min-width:1200px)']: {
                marginLeft: '2.5rem',
              },
            }}
          >
            <Typography
              variant="p"
              fontWeight={700}
              textTransform={'uppercase'}
              fontSize={'.9rem'}
            >
              Connected Wallets
            </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="wallet"
                name="wallet"
                onChange={({ target: { value } }) => {
                  setRadioVal(value)
                  setSelectedWallet(value)
                }}
                value={radioVal}
              >
                {formattedAddresses.map((wallet) => (
                  <Tooltip
                    placement="top-start"
                    key={wallet.address}
                    title={wallet.name ? wallet.address : ''}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '.6rem',
                        img: {
                          borderRadius: '100%',
                        },
                      }}
                    >
                      <Box lineHeight={'0'}>
                        <Image
                          src={
                            wallet.type === WalletTypes.pera
                              ? '/Pera-logo.png'
                              : '/My-Algo-Wallet-icon.svg'
                          }
                          alt="Pera-wallet logo"
                          height={22}
                          width={22}
                        />
                      </Box>
                      <FormControlLabel
                        value={wallet.address}
                        sx={{ '.MuiTypography-root': { fontSize: '.8rem' } }}
                        control={
                          <Radio
                            color="secondary"
                            data-testid="wallet-radio-input"
                          />
                        }
                        label={wallet.name || wallet.address}
                      />
                      <div>
                        <Button
                          variant="outlined"
                          component="span"
                          sx={{
                            fontSize: '.6rem',
                            padding: '.1rem .4rem',
                            color: 'secondary.main',
                            borderColor: 'secondary.main',
                          }}
                          onClick={() => disconnect(wallet)}
                        >
                          DISCONNECT
                        </Button>
                      </div>
                    </Box>
                  </Tooltip>
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        )}
        <ConnectWallet />
      </Box>
    </>
  )
}

export default WalletAddresses
