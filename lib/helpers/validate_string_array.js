/**
* Copyright (C) 2016-present The ISLE Authors
*
* The isle-server program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

'use strict';

// MODULES //

const isStringArray = require( '@stdlib/assert/is-string-array' );
const ErrorStatus = require( './error.js' );


// MAIN //

function validateStringArray( value, name, t ) {
	if ( !isStringArray( value ) ) {
		throw new ErrorStatus( 400, t('field-expect-string-array', { field: name }));
	}
}

// EXPORTS //

module.exports = validateStringArray;
