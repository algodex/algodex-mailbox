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
    [to],
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
