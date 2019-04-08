/* eslint-disable no-underscore-dangle */

'use strict';

// core node modules
const util = require('util');
const { Transform } = require('stream');

// 3rd party modules

// internal modules
const { serialize } = require('./utils');

// Gets XML Object data and emits the stringified XMLDocument
function XMLSerializeStream(options = {}) {
  if (!(this instanceof XMLSerializeStream)) {
    return new XMLSerializeStream();
  }

  Object.assign(options, { writableObjectMode: true });
  Transform.call(this, options);
}
util.inherits(XMLSerializeStream, Transform);

XMLSerializeStream.prototype._transform = function transform(
  xmlDocument,
  encoding,
  callback,
) {
  try {
    const xmlString = serialize(xmlDocument);
    this.push(xmlString);
  } catch (err) {
    this.emit('error', err);
    return;
  }
  callback();
};

module.exports = XMLSerializeStream;
