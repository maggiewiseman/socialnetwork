var rewire = require('rewire');

var handler = rewire('../handler');

handler.__set__('dbQuery', require('./mocks/mockDbQuery'));


module.exports = handler;
