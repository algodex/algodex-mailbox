/* 
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import normal from './normal'
import dark from './dark'

const themes = {
  normal,
  dark,
}

export default function getTheme(theme) {
  return themes[theme]
}
