var rewire = require('rewire');
var myDbQuery = rewire('../../dbQuery');
var spicedPg = require('spiced-pg');

var expect = require('chai').expect;
var assert = require('chai').assert;

const secrets = require('../../secrets.json');
var url = `postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/social-test`;
myDbQuery.__set__('db', spicedPg(url) );

module.exports = myDbQuery;
