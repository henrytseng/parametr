'use strict';

const parametr = require('../../lib/parametr');

test('value equivalency', () => {
  expect(parametr({ abc: 1, def: 2 })).toEqual({ abc: 1, def: 2 });
});

test('properties not altered', () => {
  let data = { abc: 1, def: 2 };
  let parametrizedData = parametr(data);
  expect(Object.keys(parametrizedData).indexOf('require')).toEqual(-1);
  expect(Object.keys(parametrizedData).indexOf('permit')).toEqual(-1);
});

test('required are also permitted', () => {
  let data = { abc: 1, def: 2, xyz: 5 };
  let parametrizedData = parametr(data)
    .require('abc')
    .permit('def');
  expect(Object.keys(parametrizedData).indexOf('abc')).not.toEqual(-1);
  expect(Object.keys(parametrizedData).indexOf('def')).not.toEqual(-1);
  expect(Object.keys(parametrizedData).indexOf('xyz')).toEqual(-1);
});

test('missing property throws an error when required', () => {
  let data = { abc: 1, def: 2 };
  expect(() => {
    parametr(data).require('xyz');
  }).toThrowError('A required parameter is missing');
});

test('missing property allowed when permitted', () => {
  let data = { abc: 1, def: 2 };
  let parametrizedData = parametr(data).permit('def');
  expect(parametrizedData).toEqual({ def: 2 });
});

test('missing properties can be parametrized multiple times', () => {
  let data = { abc: 1, def: 2, foo: 'bar' };
  let parametrizedData = parametr(data)
    .permit('def')
    .permit('foo');
  expect(parametrizedData).toEqual({ def: 2, foo: 'bar' });
});
