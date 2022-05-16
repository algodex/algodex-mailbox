/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useEffect, useState } from 'react'

//mui files
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

//Lib files
import Helper from '@/lib/helper'

export const AssetSearchInput = ({
  disabled,
  setAssetId,
  parentProp,
  defaultValue,
}) => {
  const [query, setQuery] = useState('')
  const top100Films = [
    { label: 'The Shawshank Redemption', id: 1994 },
    { label: 'The Godfather', id: 1972 },
  ]

  useEffect(() => {
    if (query) {
      const res = Helper.searchAlgoAssets(query)
      console.log({ res })
    }
  }, [query])

  return (
    <Autocomplete
      disablePortal
      options={top100Films}
      defaultValue={
        defaultValue
          ? {
            id: defaultValue,
            label: defaultValue,
          }
          : null
      }
      onChange={(event, value) => {
        parentProp.onChange(value?.id || '')
        setAssetId(value?.id || '')
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          data-testid="assetId-input"
          required
          id="outlined-required"
          name="AssetId"
          disabled={disabled}
          label="Asset Id"
          onChange={({ target: { value } }) => {
            setQuery(value)
          }}
        />
      )}
    />
  )
}
