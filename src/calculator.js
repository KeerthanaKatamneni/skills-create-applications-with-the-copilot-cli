#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - add : addition (a + b)
//  - sub : subtraction (a - b)
//  - mul : multiplication (a * b)
//  - div : division (a / b)

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

// If a single argument looks like an expression, evaluate it (only safe chars)
if (args.length === 1) {
  const expr = args[0];
  if (/^[0-9.\s()+\-*/]+$/.test(expr)) {
    try {
      // evaluate expression after basic validation
      // Note: using Function for a local CLI tool; input is restricted to numbers and operators above
      const result = Function(`"use strict"; return (${expr})`)();
      if (typeof result === 'number' && Number.isFinite(result)) {
        console.log(result);
        process.exit(0);
      } else {
        console.error('Error: Expression did not produce a finite numeric result.');
        process.exit(2);
      }
    } catch (e) {
      console.error('Error: Failed to evaluate expression:', e.message);
      process.exit(2);
    }
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

if (!cmd || args.length < 3) {
  invalidUsage('Not enough arguments.');
}

if (!isFinite(a) || !isFinite(b)) {
  invalidUsage('Both operands must be valid numbers.');
}

switch (cmd) {
  case 'add':
    console.log(a + b);
    break;
  case 'sub':
    console.log(a - b);
    break;
  case 'mul':
    console.log(a * b);
    break;
  case 'div':
    if (b === 0) {
      console.error('Error: Division by zero');
      process.exit(2);
    }
    console.log(a / b);
    break;
  default:
    invalidUsage(`Unknown command: ${cmd}`);
}
