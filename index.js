'use strict';

var utils = require('./lib/utils');

exports.parse = utils.parse;
exports.selectUseNamespaces = utils.selectUseNamespaces;
exports.serialize = utils.serialize;
exports.select = utils.select;

exports.XMLParseStream = require('./lib/XMLParseStream');
exports.XMLSerializeStream = require('./lib/XMLSerializeStream');

// function removeChildNodesByXPath(selectFn, expression, xmlDoc, callback) {
//   async.each(selectFn(expression, xmlDoc), function(node, iteratorCallback) {
//     node.parentNode.removeChild(node);
//     iteratorCallback();
//   }, callback);
// }