type Value = string | number;

export type Spacing = [Value, Value?, Value?, Value?];
export type ToShorthand = (...args: Spacing) => string;

export default (multiple: number): ToShorthand =>
  (...args) =>
    args
      .filter((x) => x !== undefined)
      .map((x) => (typeof x === 'string' ? x : `${x! * multiple}px`))
      .join(' ');
