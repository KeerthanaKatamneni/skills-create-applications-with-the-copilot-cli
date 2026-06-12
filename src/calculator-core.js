// Calculator core module
// Exposes basic arithmetic functions used by the CLI and tests

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

function evalExpression(expr) {
  if (typeof expr !== 'string' || !/^[0-9.\s()+\-*/]+$/.test(expr)) {
    throw new Error('Invalid expression');
  }
  const result = Function(`"use strict"; return (${expr})`)();
  if (typeof result !== 'number' || !Number.isFinite(result)) {
    throw new Error('Expression did not produce a finite numeric result');
  }
  return result;
}

module.exports = { add, sub, mul, div, evalExpression };