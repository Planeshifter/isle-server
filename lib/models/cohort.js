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

const mongoose = require( 'mongoose' );
const debug = require( 'debug' )( 'cohort' );


// MAIN //

const Schema = mongoose.Schema;

const CohortSchema = new Schema({
	members: [
		{ 'type': Schema.Types.ObjectId, 'ref': 'User' }
	],
	title: {
		'type': String,
		'required': true
	},
	startDate: {
		'type': Date,
		'required': true,
		'default': Date.now
	},
	endDate: {
		'type': Date
	},
	private: {
		'type': Boolean,
		'default': false
	},
	emailFilter: {
		'type': String
	},
	namespace: {
		'type': Schema.Types.ObjectId,
		'ref': 'Namespace'
	}
});

const Cohort = mongoose.model( 'Cohort', CohortSchema );

CohortSchema.path( 'title' ).validate({
	'validator': function validate( title ) {
		const self = this;
		return new Promise( function promise( resolve, reject ) {
			if ( !self.namespace ) {
				debug( 'Namespace not found...' );
				return resolve( true );
			}
			Cohort.findOne( { title: title, namespace: self.namespace._id }, function find( err, cohort ) {
				if ( err ) {
					return reject( err );
				}
				if ( !cohort ){
					debug( 'Cohort does not exist yet, title is valid.' );
					return resolve( true );
				}
				debug( 'Cohort already exists, title is invalid.' );
				resolve( false );
			});
		});
	},
	'message': 'Cohort title is invalid.'
});


// EXPORTS //

module.exports = Cohort;
