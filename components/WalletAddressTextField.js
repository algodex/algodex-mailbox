/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useState } from 'react'

//mui files
import TextField from '@mui/material/TextField'

//Lib files
import Helper from '@/lib/helper'

export const WalletAddressTextField = ({
  setState,
  parentProp,
  defaultValue,
  updateStatusMessage,
  dataTestid,
  name,
  label,
}) => {
  const [timer, setTimer] = useState(null)

  const fetchData = (value, type, setState) => {
    clearTimeout(timer)
    const newTimer = setTimeout(async () => {
      let response = await Helper.getAlgoNamesOrAddress(value, type)
      if (response instanceof Error) {
        updateStatusMessage('This is not a valid Algorand address', false)
      } else {
        setState(response)
      }
    }, 500)
    setTimer(newTimer)
  }

  const updateField = (value) => {
    updateStatusMessage()
    const lastWord = value.split('.')[value.split('.').length - 1]
    if (lastWord == 'algo') {
      fetchData(value, 'getOwner', setState)
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
    />
  )
}
