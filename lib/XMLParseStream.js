var util = require('util');
var StringDecoder = require('string_decoder').StringDecoder;
var Transform = require('stream').Transform;

var xmlUtils = require('./utils');

var allowedEncodings = [
  'ascii',    // for 7 bit ASCII data only. This encoding method is way fast, but is limited to the ascii character set. To convert a null character into 0x00, you should use 'utf8'.
  'utf8',     // Multibyte encoded Unicode characters. It has become the dominant character encoding for the world wide web.
  'utf16le',  // 2 or 4 bytes, little endian encoded Unicode characters, surrogate pairs (U+10000 to U+10FFFF) are supported.
  'ucs2',     // Alias of 'utf16le'.
  'base64',   // Base64 string encoding.
  'binary',   // Method of encoding raw binary data into strings by using only the first 8 bits of each character. This encoding method is deprecated.
  'hex'       // This method is used to encode each byte as two hexadecimal characters.
];

// Gets XML string data and emits the parsed XMLDocument object
function XMLParseStream(options, encoding) {
  if (!(this instanceof XMLParseStream)) {
    return new XMLParseStream(options, encoding);
  }

  options = options || {};
  options.readableObjectMode = true;
  Transform.call(this, options);

  this._encoding = (encoding && allowedEncodings.indexOf(encoding) > -1) ? encoding : 'utf8';
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
