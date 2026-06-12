const { add, sub, mul, div, modulo, power, squareRoot, evalExpression } = require('../calculator-core');

describe('Calculator core functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(sub(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(mul(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(div(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => div(5, 0)).toThrow('Division by zero');
  });

  test('evalExpression: "2 + 3 * 4" = 14', () => {
    expect(evalExpression('2 + 3 * 4')).toBe(14);
  });

  test('evalExpression rejects invalid characters', () => {
    expect(() => evalExpression('2 + foo')).toThrow('Invalid expression');
  });

  test('supports floating point operations', () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
    expect(div(7.5, 2.5)).toBeCloseTo(3);
  });

  test('negative numbers', () => {
    expect(sub(-2, -3)).toBe(1);
    expect(mul(-4, 3)).toBe(-12);
  });

  // New tests for extended operations
  test('modulo: 5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(5, 0)).toThrow('Division by zero');
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('power with zero exponent: 2 ^ 0 = 1', () => {
    expect(power(2, 0)).toBe(1);
  });

  test('power with negative exponent: 2 ^ -1 = 0.5', () => {
    expect(power(2, -1)).toBeCloseTo(0.5);
  });

  test('squareRoot: sqrt(16) = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('squareRoot of negative number throws', () => {
    expect(() => squareRoot(-4)).toThrow('Cannot take square root of negative number');
  });
});