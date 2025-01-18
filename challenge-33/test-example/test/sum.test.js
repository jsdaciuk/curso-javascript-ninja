'use strict';

import { expect } from 'chai';
import assert from 'assert';
import sum from '../src/sum.js';

describe('# sum', function () {

  it('should sum module be a function', function () {
    expect(sum).to.be.a('function');
  });

  const testCases = [
    { args: [4, 6], expected: 10 },
    { args: [-2, 2], expected: 0 }
  ];
  testCases.forEach(({ args, expected }) => {
    it(`should sum return ${expected}, when args are ${args.join(' and ')}`, function () {
      expect(sum(...args)).to.be.equal(expected);
    });
  });

  it('should throw an error when there are not exactly 2 arguments', function () {
    const invalidArgs = [
      [],
      [1],
      [1, 2, 3]
    ];

    invalidArgs.forEach(args => {
      expect(() => sum(...args)).to.throw(Error);
    });
  });

  it('should throw an error when input is not a number', function () {
    const invalidInputs = [
      ['a', 2],
      [2, 'b'],
      ['a', 'b']
    ];

    invalidInputs.forEach(args => {
      expect(() => sum(...args)).to.throw(Error);
    });
  });

  it('Assert', function () {
    assert.strictEqual(sum(4, 6), 10, 'Message');
    assert.notEqual(sum(4, 6), 11, 'Message');
  });

});
