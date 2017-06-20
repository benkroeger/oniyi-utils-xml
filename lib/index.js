'use strict';

// core node modules

// 3rd party modules

// internal modules
const utils = require('./utils');
const XMLParseStream = require('./XMLParseStream');
const XMLSerializeStream = require('./XMLSerializeStream');

module.exports = Object.assign({ XMLParseStream, XMLSerializeStream }, utils);

// function removeChildNodesByXPath(selectFn, expression, xmlDoc, callback) {
//   async.each(selectFn(expression, xmlDoc), function(node, iteratorCallback) {
//     node.parentNode.removeChild(node);
//     iteratorCallback();
//   }, callback);
// }
