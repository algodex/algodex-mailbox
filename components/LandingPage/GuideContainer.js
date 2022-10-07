/* 
 * Algodex Service 
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
import React from 'react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

// MUI Components
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const styles = {
  guideContainer: {
    backgroundColor: 'primary.main',
    border: '0.25rem solid',
    borderColor: 'secondary.contrastText',
    borderRadius: '0.3rem',
    minHeight: '17rem',
    padding: '0.8rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    '@media (min-width: 400px)': {
      width: '21rem',
      maxWidth: '100%',
    },
    '& ul': {
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      width: 'fit-content',
      margin: 'auto',
      listStyle: 'auto',
    },
  },
  illustration: {
    marginBottom: '0.7rem',
  },
}
export const GuideContainer = ({ icon, content, contentStyle, list }) => {
  const { t } = useTranslation('common')
  return (
    <Grid item md={4} marginX="auto">
      <Box sx={styles.guideContainer}>
        <Box sx={styles.illustration}>
          <Image src={`/${icon}.png`} alt={icon} width={103} height={103} />
        </Box>
        <Typography variant="p" sx={contentStyle || {}}>
          {t(content)}
          {list ? ':' : '.'}
        </Typography>
        {list && (
          <ul>
            {list.map((l) => (
              <li key={l}>{t(`${l}`)}</li>
            ))}
          </ul>
        )}
      </Box>
    </Grid>
  )
}
