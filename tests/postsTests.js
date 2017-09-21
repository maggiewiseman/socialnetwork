var expect = require('chai').expect;
var rewire = require('rewire');

var handler = rewire('../handler');
handler.__set__('dbQuery', require('./mocks/mockDbQuery'));
