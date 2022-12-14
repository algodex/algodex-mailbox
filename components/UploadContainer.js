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

/* eslint-disable max-len */
/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

// MUI Components
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import PropTypes from 'prop-types'
import { useGetWalletOwner } from '../hooks/useGetWalletOwner'

const styles = {
  uploadWrapper: {
    background: '#fffcff',
    height: '10rem',
    borderRadius: '0.4rem',
    border: '0.1rem dashed #a698b5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}

const UploadContainer = ({
  setDuplicateList,
  updateStatusMessage,
  setCsvTransactions,
}) => {
  const { t } = useTranslation('common')
  const [fileName, setFileName] = useState()
  const { getWalletOwner } = useGetWalletOwner()

  const getFileUpload = async ({ target }) => {
    const csvFiles = target.files[0]
    target.value = null
    if (csvFiles) {
      updateStatusMessage()
      setDuplicateList([])
      setFileName(csvFiles.name)
      const reader = new FileReader()
      reader.onloadend = ({ target }) => {
        const text = target.result
        checkForDuplicateandValidity(text)
      }
      reader.readAsText(csvFiles)
    }
  }

  const checkForDuplicateandValidity = async (csv) => {
    const rows = csv.slice(csv.indexOf('\n') + 1).split('\n')
    const count = {}
    let invalidWalletNames = []
    if (rows[0] == '') {
      updateStatusMessage('Oops, empty CSV file', false)
    } else {
      const finalData = []
      finalData.push(['ToWallet', 'Amount'])
      await Promise.all(
        rows.map(async (v) => {
          if (v) {
            const value = v.split(',')[0]
            const lastWord = value.split('.')[value.split('.').length - 1]
            if (lastWord.toLowerCase() == 'algo') {
              const res = await getWalletOwner(value.toLowerCase(), 'getOwner')
              if (res instanceof Error) {
                invalidWalletNames = [...invalidWalletNames, value]
              } else {
                count[res] = count[res] + 1 || 1
                finalData.push([res, v.split(',')[1]])
              }
              return
            }
            count[value] = count[value] + 1 || 1
            finalData.push([value, v.split(',')[1]])
          }
        })
      )

      setCsvTransactions()
      if (invalidWalletNames.length > 0) {
        updateStatusMessage(
          `Invalid Algorand address${
            invalidWalletNames.length > 1 ? 'es' : ''
          }: ${invalidWalletNames.map(
            (name, index) =>
              `${name}${invalidWalletNames.length > index + 1 ? ', ' : ''}`
          )}`,
          false
        )
        return
      }
      const duplicate = []
      Object.entries(count).forEach((c) => {
        c[1] > 1 && duplicate.push(c[0])
      })
      if (!process.env.NEXT_PUBLIC_IGNORE_DUPLICATES && duplicate.length > 0) {
        setDuplicateList(duplicate)
        updateStatusMessage(
          'Same wallet address on multiple rows of your CSV file is not allowed. This causes race conditions and we can\'t support it',
          false
        )
      } else {
        let csvContent = ''
        finalData.forEach((row) => {
          csvContent += row.join(',') + '\n'
        })
        setCsvTransactions(csvContent.replace(/\r?\r/g, ''))
      }
    }
  }

  return (
    <Box>
      <label htmlFor="contained-button-file">
        <input
          data-testid="file-input"
          accept="text/csv"
          id="contained-button-file"
          type="file"
          hidden
          onChange={getFileUpload}
        />
        {fileName ? (
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadFileIcon />}
            style={{ marginTop: '1rem' }}
          >
            {fileName}
          </Button>
        ) : (
          <Box style={styles.uploadWrapper}>
            <Typography variant="p" marginBottom="1rem" textAlign={'center'}>
              {t('Click to upload CSV transactions')}
            </Typography>

            <Button
              variant="contained"
              component="span"
              startIcon={<UploadFileIcon />}
            >
              {t('Upload CSV')}
            </Button>
          </Box>
        )}
      </label>
    </Box>
  )
}

UploadContainer.propTypes = {
  setDuplicateList: PropTypes.any,
  updateStatusMessage: PropTypes.func,
  setCsvTransactions: PropTypes.any,
}
export default UploadContainer
