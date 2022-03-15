import React from 'react'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'

// MUI Components
import MUIDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'

// Icons
import SendIcon from '@mui/icons-material/Send'
import HistoryIcon from '@mui/icons-material/History'
import RedeemIcon from '@mui/icons-material/Redeem'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

// Custom MUI Components
import ListItemLink from '@/components/Nav/ListItemLink'

/**
 * Drawer
 * @component
 * @param width
 * @param offset
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Drawer({ width, offset, ...props }) {
  const { t } = useTranslation('common')
  return (
    <MUIDrawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        ['& .MuiDrawer-paper']: { width, boxSizing: 'border-box' },
      }}
      {...props}
    >
      {/* Add Toolbar for spacing */}
      <Toolbar sx={{ height: offset }} />
      <Box sx={{ overflow: 'auto' }}>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              {t('actions')}
            </ListSubheader>
          }
        >
          <ListItemLink
            to="/send-assets"
            icon={<SendIcon />}
            primary={t('/send-assets')}
          />
          <ListItemLink
            to="/send-history"
            icon={<HistoryIcon />}
            primary={t('/send-history')}
          />
          <ListItemLink
            to="/redeem-assets"
            icon={<RedeemIcon />}
            primary={t('/redeem-assets')}
          />
          <ListItemLink
            to="/return-assets"
            icon={<KeyboardReturnIcon />}
            primary={t('/return-assets')}
          />
        </List>
      </Box>
    </MUIDrawer>
  )
}

Drawer.propTypes = {
  /**
   * width
   */
  width: PropTypes.number.isRequired,
  /**
   * offset
   */
  offset: PropTypes.number,
}

Drawer.defaultProps = {
  width: 250,
}
export default Drawer
