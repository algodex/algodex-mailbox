/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React from 'react'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'

// MUI Components
import MUIDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListSubheader from '@mui/material/ListSubheader'

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
function Drawer({ width, offset, links, toggleDrawer, ...props }) {
  const { t } = useTranslation('common')
  return (
    <MUIDrawer
      variant="persistent"
      anchor="left"
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
          {links.map((link) => (
            <ListItemLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              primary={link.primary}
              onClick={() => {
                if (toggleDrawer) {
                  toggleDrawer()
                }
              }}
            />
          ))}
        </List>
      </Box>
    </MUIDrawer>
  )
}

Drawer.propTypes = {
  /**
   * width
   */
  width: PropTypes.any,
  /**
   * offset
   */
  offset: PropTypes.number,
  /**
   * toggleDrawer to close drawer on mobile
   */
  toggleDrawer: PropTypes.func,
}

Drawer.defaultProps = {
  width: 250,
}
export default Drawer
