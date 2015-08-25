var util = require('util');
var StringDecoder = require('string_decoder').StringDecoder;
var Transform = require('stream').Transform;

var xmlUtils = require('./utils');

// Gets XML string data and emits the parsed XMLDocument object
function XMLParseStream(options, encoding) {
  if (!(this instanceof XMLParseStream)) {
    return new XMLParseStream(options, encoding);
  }

  options = options || {};
  options.readableObjectMode = true;
  Transform.call(this, options);

  this._encoding = (Buffer.isEncoding(encoding)) ? encoding : 'utf8';
  this._decoder = new StringDecoder(this._encoding);
  this._buffer = '';
}
util.inherits(XMLParseStream, Transform);

XMLParseStream.prototype._transform = function(data, encoding, callback) {
  // concatenate decoded string chunks in _buffer
  this._buffer += this._decoder.write(data);
  callback();
};

XMLParseStream.prototype._flush = function(callback) {
  // make xmlDoc object from our _buffer
  var xmlString = this._buffer.trim();

  try {
    var xmlDoc = xmlUtils.parse(xmlString);
    this.push(xmlDoc);
  } catch (err) {
    this.emit('error', err);
    return;
  }
  callback();
};

module.exports = XMLParseStream;
