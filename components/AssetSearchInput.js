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
  const [suggestedAssets, setSuggestedAssets] = useState([])
  const [timer, setTimer] = useState(null)

  const fetchData = () => {
    clearTimeout(timer)
    const newTimer = setTimeout(async () => {
      const res = await Helper.searchAlgoAssets(query)
      const list = [...res.data.assets].filter((asset) => !asset.destroyed)
      setSuggestedAssets(
        list.map((asset) => {
          return { ...asset, name: `${asset.id} - ${asset.name}` }
        })
      )
    }, 500)
    setTimer(newTimer)
  }

  useEffect(() => {
    if (query.split('').length > 2) {
      fetchData()
    }
  }, [query])

  return (
    <Autocomplete
      disablePortal
      getOptionLabel={(option) => option.name}
      options={suggestedAssets}
      defaultValue={
        defaultValue
          ? {
            id: defaultValue,
            name: defaultValue,
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
