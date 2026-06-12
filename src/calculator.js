#!/usr/bin/env node

// Node.js CLI Calculator (uses calculator-core.js)
// Supported operations:
//  - add : addition (a + b)
//  - sub : subtraction (a - b)
//  - mul : multiplication (a * b)
//  - div : division (a / b)

const { add, sub, mul, div, modulo, power, squareRoot, evalExpression } = require('./calculator-core');
const args = process.argv.slice(2);

function printHelp() {
  console.log(`Usage:
  node src/calculator.js add <a> <b>   # addition
  node src/calculator.js sub <a> <b>   # subtraction
  node src/calculator.js mul <a> <b>   # multiplication
  node src/calculator.js div <a> <b>   # division
  node src/calculator.js "2 + 3 * 4"  # optional: evaluate a simple expression

Options:
  -h, --help    Show this help message
`);
}

if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
  printHelp();
  process.exit(0);
}

// If a single argument looks like an expression, evaluate it
if (args.length === 1) {
  const expr = args[0];
  try {
    const result = evalExpression(expr);
    console.log(result);
    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(2);
  }
}

const cmd = args[0];
const a = Number(args[1]);
const b = Number(args[2]);

function invalidUsage(msg) {
  console.error('Error:', msg);
  printHelp();
  process.exit(2);
}

// sqrt is a single-operand command: node src/calculator.js sqrt <a>
if (cmd === 'sqrt') {
  if (args.length < 2) {
    invalidUsage('Not enough arguments for sqrt.');
  }
  const n = Number(args[1]);
  if (!isFinite(n)) {
    invalidUsage('Operand must be a valid number.');
  }
  try {
    console.log(squareRoot(n));
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(2);
  }
  process.exit(0);
}

if (!cmd || args.length < 3) {
  invalidUsage('Not enough arguments.');
}

if (!isFinite(a) || !isFinite(b)) {
  invalidUsage('Both operands must be valid numbers.');
}

switch (cmd) {
  case 'add':
    console.log(add(a, b));
    break;
  case 'sub':
    console.log(sub(a, b));
    break;
  case 'mul':
    console.log(mul(a, b));
    break;
  case 'div':
    try {
      console.log(div(a, b));
    } catch (e) {
      console.error('Error:', e.message);
      process.exit(2);
    }
    break;
  case 'mod':
    try {
      console.log(modulo(a, b));
    } catch (e) {
      console.error('Error:', e.message);
      process.exit(2);
    }
    break;
  case 'pow':
    console.log(power(a, b));
    break;
  default:
    invalidUsage(`Unknown command: ${cmd}`);
}
