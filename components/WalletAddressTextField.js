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

import React, { useState } from 'react'

//mui files
import TextField from '@mui/material/TextField'

//Lib files
import { useGetWalletOwner } from '../hooks/useGetWalletOwner'

export const WalletAddressTextField = ({
  setState,
  parentProp,
  defaultValue,
  updateStatusMessage,
  dataTestid,
  name,
  label,
  placeholder,
}) => {
  const { getWalletOwner } = useGetWalletOwner(updateStatusMessage)
  const [timer, setTimer] = useState(null)

  const updateField = (value) => {
    updateStatusMessage()
    const lastWord = value.split('.')[value.split('.').length - 1]
    if (lastWord.toLowerCase() == 'algo') {
      clearTimeout(timer)
      const newTimer = setTimeout(async () => {
        getWalletOwner(value.toLowerCase(), 'getOwner', setState)
      }, 500)
      setTimer(newTimer)
      return
    }
    parentProp && parentProp.onChange(value)
    setState(value)
  }

  return (
    <TextField
      id="outlined-required"
      required
      defaultValue={defaultValue}
      onChange={({ target: { value } }) => {
        updateField(value)
      }}
      data-testid={dataTestid}
      name={name}
      label={label}
      placeholder={placeholder || ''}
    />
  )
}
