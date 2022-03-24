import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

// MUI Components
import MUIToolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// Custom Language Selector
import LocaleNavMenu from '@/components/Nav/LocaleNavMenu'

//Algodex
import Helper from '@/lib/helper'

/**
 * Toolbar
 * @param title
 * @param height
 * @param isMobile
 * @param onClick
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */

const environmentLinks = ['TESTNET', 'MAINNET']

const styles = {
  select: {
    fontStyle: 'italic',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: 'green',
    marginBlock: '0.25rem',
  },
}

const MAINNET_LINK = process.env.NEXT_PUBLIC_MAINNET_LINK
const TESTNET_LINK = process.env.NEXT_PUBLIC_TESTNET_LINK
const ENABLE_NETWORK_SELECTION = TESTNET_LINK && MAINNET_LINK
function Toolbar({ title, height, isMobile, onClick, toggleDrawer, ...rest }) {
  const { t } = useTranslation('common')
  const { environment } = Helper.getAlgodex()

  const [environmentText, setEnvironmentText] = React.useState(
    environment.toUpperCase()
  )

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    if (ENABLE_NETWORK_SELECTION) {
      setEnvironmentText(value)
      if (value === 'MAINNET') {
        window.location = MAINNET_LINK
      } else {
        window.location = TESTNET_LINK
      }
    }
  }

  return (
    <MUIToolbar sx={{ height }} {...rest}>
      {!isMobile && (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            toggleDrawer()
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" component="div" marginRight={2}>
          {title || t('app-title')}
        </Typography>
        <Select
          className="environment-select-wrapper"
          value={environmentText}
          onChange={handleChange}
          input={<OutlinedInput />}
          inputProps={{ 'aria-label': 'Without label' }}
          style={styles.select}
        >
          {environmentLinks.map((environment) => (
            <MenuItem key={environment} value={environment}>
              {environment}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <LocaleNavMenu isMobile={isMobile} onClick={onClick} />
    </MUIToolbar>
  )
}

Toolbar.propTypes = {
  /**
   * onClick
   */
  onClick: PropTypes.func.isRequired,
  /**
   * height
   */
  height: PropTypes.number,
  /**
   * isMobile
   */
  isMobile: PropTypes.bool,

  toggleDrawer: PropTypes.func.isRequired,
}

Toolbar.defaultProps = {
  onClick: console.debug,
}
export default Toolbar
