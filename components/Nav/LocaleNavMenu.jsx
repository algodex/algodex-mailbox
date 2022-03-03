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
        color={isMobile ? 'secondary' : 'info'}
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
