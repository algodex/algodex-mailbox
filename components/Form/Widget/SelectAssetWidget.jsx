import {TextField} from '@mui/material'
import React from 'react'

function SelectAssetWidget(props){
  console.log('SelectAssetWidget(', arguments[0], ')')
  return (
    <TextField
      required
      id="outlined-required"
      label="Required"
      defaultValue="Hello World"
      onChange={props.onChange}
    />
  )
}

export default SelectAssetWidget
