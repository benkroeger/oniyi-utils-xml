var util = require('util');
var Transform = require('stream').Transform;

var xmlUtils = require('./utils');

// Gets XML Object data and emits the stringified XMLDocument
function XMLSerializeStream(options) {
  if (!(this instanceof XMLSerializeStream)) {
    return new XMLSerializeStream();
  }

  options = options || {};
  options.writableObjectMode = true;
  Transform.call(this, options);
}
util.inherits(XMLSerializeStream, Transform);

XMLSerializeStream.prototype._transform = function(xmlDocument, encoding, callback) {
  try {
    var xmlString = xmlUtils.serialize(xmlDocument);
    this.push(xmlString);
  } catch (err) {
    this.emit('error', err);
    return;
  }
  callback();
};

module.exports = XMLSerializeStream;
