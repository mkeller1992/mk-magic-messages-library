import { NewlineAndTabsPipe } from "./new-line-and-tabs.pipe";

describe('NewlineAndTabsPipe', () => {
  let pipe: NewlineAndTabsPipe;

  beforeEach(() => {
    pipe = new NewlineAndTabsPipe();
  });

  it('should replace newline characters with <br /> tags', () => {
    const value = 'Line1\nLine2\rLine3\r\nLine4';
    const transformed = pipe.transform(value);
    expect(transformed).toBe('Line1<br />Line2<br />Line3<br />Line4');
  });

  it('should replace tab characters with four non-breaking spaces', () => {
    const value = 'Item1\tItem2';
    const transformed = pipe.transform(value);
    expect(transformed).toBe('Item1&nbsp;&nbsp;&nbsp;&nbsp;Item2');
  });

  it('should replace both newline and tab characters appropriately', () => {
    const value = 'Item1\tItem2\nItem3\tItem4';
    const transformed = pipe.transform(value);
    expect(transformed).toBe('Item1&nbsp;&nbsp;&nbsp;&nbsp;Item2<br />Item3&nbsp;&nbsp;&nbsp;&nbsp;Item4');
  });

  it('should return an empty string for null input', () => {
    const transformed = pipe.transform(null);
    expect(transformed).toBe('');
  });

  it('should return an empty string for undefined input', () => {
    const transformed = pipe.transform(undefined);
    expect(transformed).toBe('');
  });

  it('should work with non-string inputs by converting them to string', () => {
    const value = 12345;
    const transformed = pipe.transform(value);
    expect(transformed).toBe('12345');
  });
});