'use strict';


var xmldom = require('xmldom'),
  DOMParser = xmldom.DOMParser,
  XMLSerializer = xmldom.XMLSerializer,
  xpath = require('xpath');

exports.parse = function parse(xmlString, mimeType, parserOptions) {
  parserOptions = parserOptions || {};
  mimeType = (typeof mimeType === 'string') ? mimeType : 'text/xml';

  var parser = new DOMParser(parserOptions);
  return parser.parseFromString(xmlString, mimeType);
};

exports.selectUseNamespaces = function selectUseNamespaces(nameSpaces) {
  return xpath.useNamespaces(nameSpaces);
};

exports.serialize = function serialize() {
  var serializer = new XMLSerializer();
  return serializer.serializeToString.apply(serializer, Array.prototype.slice.call(arguments, 0));
};

exports.select = function select() {
  return xpath.select.apply(xpath, Array.prototype.slice.call(arguments, 0));
};

