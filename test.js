// Simple unit tests for the multiplication logic (run: npm test)
const assert = require('assert');
const { generateTable } = require('./multiplication');

const t5 = generateTable(5);
assert.strictEqual(t5.length, 10);
assert.strictEqual(t5[0].text, '5 x 1 = 5');
assert.strictEqual(t5[9].text, '5 x 10 = 50');
console.log('PASS: table for 5 is correct');

assert.strictEqual(generateTable(0)[3].result, 0);
console.log('PASS: table for 0 is correct');

assert.strictEqual(generateTable(-2)[1].result, -4);
console.log('PASS: table for a negative number is correct');

assert.throws(() => generateTable('abc'));
assert.throws(() => generateTable(''));
console.log('PASS: invalid and empty input is rejected');

console.log('ALL UNIT TESTS PASSED');
