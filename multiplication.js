// 7.a  Multiplication table generator
// Can be used as a program:  node multiplication.js 5
// Or imported by the web server (server.js)

function generateTable(number, limit = 10) {
  if (number === null || number === undefined || String(number).trim() === '') {
    throw new Error('Please enter a whole number');
  }
  const n = Number(number);
  if (!Number.isInteger(n)) {
    throw new Error('Please enter a whole number');
  }
  const rows = [];
  for (let i = 1; i <= limit; i++) {
    rows.push({ multiplier: i, result: n * i, text: `${n} x ${i} = ${n * i}` });
  }
  return rows;
}

module.exports = { generateTable };

// Run from the terminal: node multiplication.js 7
if (require.main === module) {
  const input = process.argv[2];
  if (input === undefined) {
    console.log('Usage: node multiplication.js <number>');
    process.exit(1);
  }
  try {
    generateTable(input).forEach((row) => console.log(row.text));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
