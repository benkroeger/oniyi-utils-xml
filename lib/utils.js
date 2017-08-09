'use strict';

// core node modules

// 3rd party modules
const xmldom = require('xmldom');
const xpath = require('xpath');
const _ = require('lodash');

// internal modules

const DOMParser = xmldom.DOMParser;
const XMLSerializer = xmldom.XMLSerializer;

const parse = (xmlString, mimeType = 'text/xml', parserOptions = {}) => {
  const safeMimeType = (_.isString(mimeType) && mimeType) || 'text/xml';

  const parser = new DOMParser(parserOptions);
  return parser.parseFromString(xmlString, safeMimeType);
};

const selectUseNamespaces = nameSpaces => xpath.useNamespaces(nameSpaces);

const serialize = (...args) => (new XMLSerializer()).serializeToString(...args);

const select = (...args) => xpath.select(...args);

const ensureXMLDoc = stringOrXMLDoc => (_.isString(stringOrXMLDoc) && parse(stringOrXMLDoc)) || stringOrXMLDoc;

const parseXMLNode = (node, selectors, xpathSelect) =>
  _.reduce(selectors, (result, value, selectorKey) => {
    // normalize the selector value to a spec object for future steps
    const spec = ((input) => {
      if (_.isPlainObject(input)) { return input; }
      if (_.isString(input)) { return { selector: input }; }
      return undefined;
    })(value);

    if (!_.isPlainObject(spec)) { return result; }

    const selected = xpathSelect(spec.selector, node, !spec.multi);
    if (_.isUndefined(selected)) { return result; }

    if (!_.isFunction(spec.transform)) {
      /* beautify preserve:start */
      return Object.assign(result, { [selectorKey]: selected });
      /* beautify preserve:end */
    }

    /* beautify preserve:start */
    return Object.assign(result, { [selectorKey]: spec.transform(selected) });
    /* beautify preserve:end */
  }, {});


module.exports = {
  parse,
  select,
  serialize,
  selectUseNamespaces,
  ensureXMLDoc,
  parseXMLNode,
};
