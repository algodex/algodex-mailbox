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

/* eslint-disable @typescript-eslint/no-var-requires */
const EventEmitter = require('eventemitter3')

let EE

function makeEventEmiiter() {
  if (typeof EE === 'undefined') {
    const _ee = new EventEmitter()
    EE = {
      on: (event, fn) => _ee.on(event, fn),
      once: (event, fn) => _ee.once(event, fn),
      off: (event, fn) => _ee.off(event, fn),
      emit: (event, payload) => _ee.emit(event, payload),
    }
    Object.freeze(EE)
  }
  return EE
}

module.exports = makeEventEmiiter()
