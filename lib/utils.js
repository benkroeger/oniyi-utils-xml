'use strict';

// core node modules

// 3rd party modules
const xmldom = require('xmldom');
const xpath = require('xpath');
const isString = require('lodash.isstring');

// internal modules

const DOMParser = xmldom.DOMParser;
const XMLSerializer = xmldom.XMLSerializer;

const parse = (xmlString, mimeType = 'text/xml', parserOptions = {}) => {
  const safeMimeType = (isString(mimeType) && mimeType) || 'text/xml';

  const parser = new DOMParser(parserOptions);
  return parser.parseFromString(xmlString, safeMimeType);
};

const selectUseNamespaces = nameSpaces => xpath.useNamespaces(nameSpaces);

const serialize = (...args) => (new XMLSerializer()).serializeToString(...args);

const select = (...args) => xpath.select(...args);

const ensureXMLDoc = stringOrXMLDoc => (isString(stringOrXMLDoc) && parse(stringOrXMLDoc)) || stringOrXMLDoc;

module.exports = {
  parse,
  select,
  serialize,
  selectUseNamespaces,
  ensureXMLDoc,
};
