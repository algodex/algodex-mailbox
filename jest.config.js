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

module.exports = {
  projects: [
    {
      displayName: 'components',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/components/**/*.spec.js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      }
    },
    {
      displayName: 'lib',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/test/**/*.spec.js']
    }
  ],

  coverageThreshold: {
    // TODO: Raise confidence
    global: {
      branches: 10,
    },
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!.next/**/*.js',
    '!node_modules/**/*.js',
    '!coverage/**/*.js',
    '!cypress/**/*.js',
    '!public/**/*.js',
    '!**/*.stories.js',
    '!**/*.config.js',
    '!**/*.spec.js',
  ],
  coverageReporters: ['lcov', 'json-summary', 'json', 'text']
}
