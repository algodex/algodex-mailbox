import React from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'next-i18next'

// MUI Components
import MUIToolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'

// Custom Language Selector
import LocaleNavMenu from '@/components/Nav/LocaleNavMenu'

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
function Toolbar({title, height, isMobile, onClick, ...rest}) {
  const { t } = useTranslation('common')
  return (
    <MUIToolbar sx={{height}} {...rest}>
      {/* TODO: Make Menu Collapsable*/}
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={()=>{alert('TODO: Make Menu Collapse')}}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {title || t('app-title')}
      </Typography>
      <LocaleNavMenu isMobile={isMobile} onClick={onClick}/>
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
  isMobile: PropTypes.bool
}

Toolbar.defaultProps = {
  onClick: console.debug
}
export default Toolbar
