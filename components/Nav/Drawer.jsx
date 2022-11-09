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
import {useTheme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

/**
 * Drawer
 * @component
 * @param width
 * @param offset
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Drawer({ width, offset, links, toggleDrawer, router,open, ...props }) {
  const { t } = useTranslation('common')
  const isHomepage = router.pathname === '/'
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <MUIDrawer
      variant={ isHomepage || isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      sx={{
        width:isHomepage ? width : (!isHomepage && open) ? width : 0,
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
              router={router}
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
