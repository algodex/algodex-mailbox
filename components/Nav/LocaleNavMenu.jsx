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

/* 
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useRouter} from 'next/router'
import {i18n} from 'next-i18next.config'

// MUI Components
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'

// Icons
import Flag from 'react-country-flag'

// Custom Components
import MenuItemLink from '@/components/Nav/MenuItemLink'

// Map locale code to the flag used in 'react-country-flag'
const localeToFlags = {
  ca: 'CA',
  en: 'US',
  es: 'MX',
  nl: 'NL',
  ch: 'CN',
  tr: 'TR',
  vn: 'VN',
  id: 'ID',
  iq: 'IQ',
  my: 'MY',
  ir: 'IR',
  it: 'IT',
  jp: 'JP',
  ru: 'RU',
  se: 'SE',
  sk: 'SK',
  hu: 'HU',
  no: 'NO',
  ct: 'ES-CT',
  th: 'TH',
  in: 'IN',
  de: 'DE',
  kr: 'KR',
  fr: 'FR',
  pl: 'PL'
}

/**
 * LanguageNavMenu
 * @component
 * @param isMobile
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
export const LocaleNavMenu = ( {isMobile, onClick} ) => {
  const { asPath, locale } = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        data-testid="dropdown-container-web"
        variant="contained"
        color={isMobile ? 'secondary' : 'accent'}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {locale} <Flag countryCode={localeToFlags[locale]} svg />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={onClick || handleClose}
      >
        {i18n.locales
          .filter((localeCd) => localeCd !== locale)
          .map((localeCd) => (
            <MenuItemLink
              to={asPath}
              locale={localeCd}
              onClick={onClick || handleClose}
              key={localeCd}
              primary={localeCd}
              icon={<Flag countryCode={localeToFlags[localeCd]} svg />}
              data-testid="dropdown-item-web">
            </MenuItemLink>
          ))}
      </Menu>
    </>
  )
}

LocaleNavMenu.propTypes = {
  /**
   * isMobile
   */
  isMobile: PropTypes.bool
}

LocaleNavMenu.displayName = 'LanguageSelection'

export default LocaleNavMenu
