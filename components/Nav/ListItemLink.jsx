/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, {forwardRef, useMemo} from 'react'
import PropTypes from 'prop-types'

// MUI Components
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

// Custom Components
import CustomLink from '@/components/Nav/Link'

/**
 * ListItemLink
 *
 * @param icon
 * @param primary
 * @param to
 * @param rest
 * @returns {JSX.Element}
 * @see https://mui.com/guides/routing/#list
 * @constructor
 */
function ListItemLink({ icon, primary, to, router, ...rest }) {
  const activeNav = router.asPath
  const renderLink = useMemo(
    () =>
      forwardRef(function Link(itemProps, ref) {
        return <CustomLink href={to} ref={ref} {...itemProps} role={undefined} />
      }),
    [to],
  )

  return (
    <li>
      <ListItem
        button
        component={renderLink}
        selected={`/${router.locale}${activeNav}` === to}
        {...rest}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

ListItemLink.propTypes = {
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

export default ListItemLink
