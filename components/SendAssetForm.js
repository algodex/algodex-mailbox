import React from 'react'
import PropTypes from 'prop-types'

// MUI Components
import LoadingButton from '@mui/lab/LoadingButton'
import { MuiForm5 as Form } from '@rjsf/material-ui'

// Custom Components
import SelectWalletWidget from '@/components/Form/Widget/SelectWalletWidget'
import SelectAssetWidget from '@/components/Form/Widget/SelectAssetWidget'

/**
 * Send Asset to Mailbox Form
 * @param {boolean} isLoading
 * @param {boolean} isDisabled
 * @param {Object} rest RJSF Properties
 * @returns {JSX.Element}
 * @constructor
 */
function SendAssetForm({ isLoading, isDisabled, ...rest }) {
  console.log('SendAssetForm(', arguments[0],')')
  const schema = {
    '$schema': 'http://json-schema.org/draft-07/schema',
    '$id': 'https://schemas.algodex.com/v1/Transactions/SendToMailbox.json',
    'title': 'Send Asset',
    'description': 'Transfer a Algorand asset to a escrow account',
    'type': 'object',
    'examples': [
      {
        'type': 'Transaction.SendToMailbox',
        'asset': 224234,
        'from': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI',
        'to': [
          {
            'address': 'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI',
            'amount': 123231
          },
          {
            'address': 'OOU3O5OSZGVFE5C3KZKH33TSD77UFB445OWVHDBYI6BB542HWU3A6ZLFHI',
            'amount': 4242
          }
        ]
      }
    ],
    'properties': {
      'from': {
        'title': 'Select Address',
        '$ref': '#/definitions/Wallet.address'
      },
      'asset': {
        'type': 'object',
        'title': 'Asset',
        'properties':{
          'id':{
            'title': 'ID',
            'description': 'Identifier for the ASA',
            'type': 'number',
            'minimum': 0
          }
        }
      },
      'to': {
        'title': 'Receiver Addresses',
        'type': 'array',
        'description': 'Add destination wallets',
        'items': {
          '$ref': '#/definitions/DestinationWallet'
        }
      }
    },
    'required': ['from', 'asset', 'to'],
    'dependencies':{
      'asset': ['from'],
      'to': ['from', 'asset']
    },
    'additionalProperties': false,
    'definitions': {
      'Wallet.address':{
        'title': 'Wallet Address',
        'type': 'string',
        'pattern': '[A-Z0-9]{58}',
        'description': 'An account public key'

      },
      'Wallet':{
        'title': 'Wallet',
        'type': 'object',
        'properties':{
          'address':{
            '$ref': '#/definitions/Wallet.address'
          }
        }
      },
      'DestinationWallet': {
        'type': 'object',
        'title': 'Transaction',
        'properties': {
          'address': {
            'title': 'wallet',
            '$ref': '#/definitions/Wallet.address'
          },
          'amount': {
            'type': 'integer',
            'description': 'Amount of the ASA to be transferred',
            'minimum': 0
          }
        },
        'required': ['address', 'amount']
      }
    }
  }

  const uiSchema = {
    'from': {
      'ui:widget': 'SelectWalletWidget'
    }
  }

  const widgets = {
    SelectWalletWidget,
    SelectAssetWidget
  }

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      widgets={widgets}
      showErrorList={false}
      {...rest}
    >
      <LoadingButton
        loading={isLoading}
        variant="contained"
        disabled={isDisabled}
        type="submit"
      >
        Send Assets
      </LoadingButton>
    </Form>
  )
}

SendAssetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
export default SendAssetForm
