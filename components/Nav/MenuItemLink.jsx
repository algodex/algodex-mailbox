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

import React, {forwardRef, useMemo} from 'react'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'

// MUI Components
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

// Custom Components
import CustomLink from '@/components/Nav/Link'

/**
 * ListItemLink
 *
 * @param icon
 * @param primary
 * @param onClick
 * @param locale
 * @param to
 * @returns {JSX.Element}
 * @see https://mui.com/guides/routing/#list
 * @constructor
 */
function MenuItemLink({ onClick, locale, icon, primary, to }) {
  const router = useRouter()
  const activeNav = router.asPath

  const renderLink = useMemo(
    () =>
      forwardRef(function Link(itemProps, ref) {
        return <CustomLink locale={locale} href={to} ref={ref} {...itemProps} role={undefined} />
      }),
    [to, locale],
  )

  return (
    <MenuItem onClick={onClick} component={renderLink} selected={activeNav === to}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </MenuItem>
  )
}

MenuItemLink.propTypes = {
  /**
   * icon
   */
  icon: PropTypes.element,
  /**
   * primary
   */
  primary: PropTypes.string.isRequired,
  /**
   * to
   */
  to: PropTypes.string.isRequired,
}

export default MenuItemLink
