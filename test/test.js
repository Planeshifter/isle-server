'use strict';

// MODULES //

var tape = require( 'tape' );
var request = require( 'supertest' );
var proxyquire = require( 'proxyquire' );
var noop = require( '@stdlib/utils/noop' );
var utils = require( './utils.js' );
var app = proxyquire( './../lib/index.js', {
	'./config.json': {
		'namespacesDirectory': './fixtures',
		'server': 'http://localhost',
		'@noCallThru': true
	},
	'./connect_mongoose.js': noop,
	'./mailer.js': {
		'send': noop,
		'@noCallThru': true
	}
});


// TESTS //

tape( 'connect to a clean mongoDB database', utils.before );

tape( 'GET /', function test( t ) {
	request( app )
		.get( '/' )
		.end( function onEnd( err, res ) {
			t.error( err, 'does not return an error' );
			t.ok( res.redirect, 'redirects request' );
			t.strictEqual( res.text, 'Found. Redirecting to /dashboard/', 'has expected `text`' );
			t.end();
		});
});

tape( 'GET /ping', function test( t ) {
	request( app )
		.get( '/ping' )
		.end( function onEnd( err, res ) {
			t.error( err, 'does not return an error' );
			t.strictEqual( res.text, 'live', 'sends live status' );
			t.end();
		});
});

tape( 'perform clean-up', utils.after );
