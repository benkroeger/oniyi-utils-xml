'use strict';

// node core modules

// 3rd party modules
import test from 'ava';

// internal modules
const utils = require('../lib/utils');

test((t) => {
  t.is(typeof utils.parse, 'function', 'utils.parse should be a function');
  t.is(typeof utils.select, 'function', 'utils.select should be a function');
  t.is(typeof utils.serialize, 'function', 'utils.serialize should be a function');
  t.is(typeof utils.selectUseNamespaces, 'function', 'utils.selectUseNamespaces should be a function');
  t.is(typeof utils.ensureXMLDoc, 'function', 'utils.ensureXMLDoc should be a function');
});
