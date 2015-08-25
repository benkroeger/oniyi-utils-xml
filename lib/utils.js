'use strict';

/**
 * XML NodeTypes
 *
 * http://www.w3schools.com/dom/dom_nodetype.asp
 *
 * 1 ELEMENT_NODE
 * 2 ATTRIBUTE_NODE
 * 3 TEXT_NODE
 * 4 CDATA_SECTION_NODE
 * 5 ENTITY_REFERENCE_NODE
 * 6 ENTITY_NODE
 * 7 PROCESSING_INSTRUCTION_NODE
 * 8 COMMENT_NODE
 * 9 DOCUMENT_NODE
 * 10  DOCUMENT_TYPE_NODE
 * 11  DOCUMENT_FRAGMENT_NODE
 * 12  NOTATION_NODE
 */

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