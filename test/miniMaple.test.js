import {MiniMaple} from "../src/miniMaple";

test('unallowed operations presence/ unallowed form of expression', () => {
    const mimiMaple = new MiniMaple();

    let testString = '2*x^3+y/3';
    expect(() => {mimiMaple.isValid(testString)}).toThrow(Error);
    expect(() => {mimiMaple.diff(testString,'x')}).toThrow(Error);

    testString = '2*x^3+y*3-ln(e)';
    expect(() => {mimiMaple.isValid(testString)}).toThrow(Error);
    expect(() => {mimiMaple.diff(testString,'x')}).toThrow(Error);

    testString = '2*x+y*x^2-y^7*x-4+y';
    expect(() => {mimiMaple.isValid(testString)}).not.toThrow(Error);
    expect(() => {mimiMaple.diff(testString,'x')}).not.toThrow(Error);
    expect(mimiMaple.isValid(testString)).toBe(true);
});

test('independence from whitespaces presence', () => {
    const mimiMaple = new MiniMaple();

    let testString = '-2 + x^7 - 3 * y^4';
    expect(() => {mimiMaple.isValid(testString)}).not.toThrow(Error);
});

test('independence from elements position in terms', () => {
    const mimiMaple = new MiniMaple();

    let testString = 'x*y';
    expect(() => {mimiMaple.isValid(testString)}).not.toThrow(Error);
    expect(mimiMaple.diff(testString,'x')).toBe('y');

    testString = 'y*x';
    expect(() => {mimiMaple.isValid(testString)}).not.toThrow(Error);
    expect(mimiMaple.diff(testString,'x')).toBe('y');

    testString = 'x^3*6';
    expect(() => {mimiMaple.isValid(testString)}).not.toThrow(Error);
    expect(mimiMaple.diff(testString,'x')).toBe('18*x^2');

    testString = '6*x^3';
    expect(() => {mimiMaple.isValid(testString)}).not.toThrow(Error);
    expect(mimiMaple.diff(testString,'x')).toBe('18*x^2');
});

test('differentiation with respect to missing value', () => {
    const mimiMaple = new MiniMaple();

    let testString = '2*x+y*x^2-y^7*x-4+y';
    expect(mimiMaple.diff(testString,'c')).toBe('0');

    testString = '10';
    expect(mimiMaple.diff(testString,'x')).toBe('0');

    testString = '+2*x+y*x^2';
    expect(mimiMaple.diff(testString,'')).toBe('0');
});

test('base differentiation checks', () => {
    const mimiMaple = new MiniMaple();

    let testString = 'x';
    expect(mimiMaple.diff(testString,'x')).toBe('1');

    testString = 'x^2';
    expect(mimiMaple.diff(testString,'x')).toBe('2*x');

    testString = 'x*y';
    expect(mimiMaple.diff(testString,'x')).toBe('y');

    testString = 'x*2';
    expect(mimiMaple.diff(testString,'x')).toBe('2');

    testString = '-x^3';
    expect(mimiMaple.diff(testString,'x')).toBe('-3*x^2');

    testString = '-x*2';
    expect(mimiMaple.diff(testString,'x')).toBe('-2');

    testString = '3*x^21';
    expect(mimiMaple.diff(testString,'x')).toBe('63*x^20');

    testString = '-x^5*c';
    expect(mimiMaple.diff(testString,'x')).toBe('-5*c*x^4');
});

test('differentiation of expression with one variable', () => {
    const mimiMaple = new MiniMaple();

    let testString = '-x+10*x^2';
    expect(mimiMaple.diff(testString,'x')).toBe('-1+20*x');

    testString = '+y-20*y';
    expect(mimiMaple.diff(testString,'y')).toBe('1-20');

    testString = '-x*x+5*x^3-x*x^7+x*3';
    expect(mimiMaple.diff(testString,'x')).toBe('-2*x+15*x^2-8*x^7+3');
});

test('differentiation of expression with two variables', () => {
    const mimiMaple = new MiniMaple();

    let testString = '-x+10*y^2';
    expect(mimiMaple.diff(testString,'x')).toBe('-1');

    testString = '+y-20*x';
    expect(mimiMaple.diff(testString,'x')).toBe('-20');

    testString = '-x*y+5*x^3-x*y^7+x*3';
    expect(mimiMaple.diff(testString,'y')).toBe('-x-7*x*y^6');
});