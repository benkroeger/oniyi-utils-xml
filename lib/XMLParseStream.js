/* eslint-disable no-underscore-dangle */

'use strict';

// core node modules
const util = require('util');
const { StringDecoder } = require('string_decoder');
const { Transform } = require('stream');

// 3rd party modules

// internal modules
const { parse } = require('./utils');

// Gets XML string data and emits the parsed XMLDocument object
function XMLParseStream(options = {}, encoding) {
  if (!(this instanceof XMLParseStream)) {
    return new XMLParseStream(options, encoding);
  }

  Object.assign(options, { readableObjectMode: true });
  Transform.call(this, options);

  this._encoding = Buffer.isEncoding(encoding) ? encoding : 'utf8';
  this._decoder = new StringDecoder(this._encoding);
  this._buffer = '';
}
util.inherits(XMLParseStream, Transform);

XMLParseStream.prototype._transform = function transform(
  data,
  encoding,
  callback,
) {
  // concatenate decoded string chunks in _buffer
  this._buffer += this._decoder.write(data);
  callback();
};

XMLParseStream.prototype._flush = function flush(callback) {
  // make xmlDoc object from our _buffer
  const xmlString = this._buffer.trim();

  try {
    const xmlDoc = parse(xmlString);
    this.push(xmlDoc);
  } catch (err) {
    this.emit('error', err);
    return;
  }
  callback();
};

module.exports = XMLParseStream;
