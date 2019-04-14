// https://repl.it/@dance2die/Adders
// const log = console.log;

const xor = (a: any, b: any) => Boolean(a) != Boolean(b);
const and = (a: any, b: any) => !!a && !!b;
const or = (a: any, b: any) => Boolean(a) || Boolean(b);

type Predicate = (a: any, b: any) => boolean;
const toBit = (predicate: Predicate) => (a: any, b: any) =>
  predicate(a, b) ? 1 : 0;
const xorBit = toBit(xor);
const andBit = toBit(and);
const orBit = toBit(or);

const halfAdder = (a: any, b: any) => ({ s: xorBit(a, b), c: andBit(a, b) });

const fullAdder = (a: any, b: any, c = 0) => {
  const first = halfAdder(a, b);
  const second = halfAdder(first.s, c);
  return { s: second.s, c: orBit(first.c, second.c) };
};

// // sum should be "1010"
// let t1 = "111";
// let t2 = "11";
// let len = Math.max(t1.length, t2.length);

// t1 = t1.padStart(len, "0");
// t2 = t2.padStart(len, "0");

// const to_a = str => str.split("").map(_ => +_);

// const v1 = to_a(t1);
// const v2 = to_a(t2);

type DigitProp = string | Digit[];
type Digit = 1 | 0;
type Output = { s: Digit; c: Digit };

function addDigits<T extends DigitProp>(left: T, right: T) {
  const pad = (text: string, len: number) => text.padStart(len, "0");
  const to_a = (str: string) => str.split("").map(_ => +_) as T;

  // let [a1, a2] = [left, right];
  let a1: T, a2: T;
  if (typeof left === "string" && typeof right === "string") {
    let len = Math.max(left.length, right.length);
    a1 = to_a(pad(left, len));
    a2 = to_a(pad(right, len));
  } else {
    a1 = left;
    a2 = right;
  }

  const result = (a1 as Digit[]).reduceRight(
    (acc: Output[], a: Digit, i: number) => {
      const b = a2[i];
      let c = 0;
      let s = 0;

      // start with half adder
      if (i === a1.length - 1) {
        ({ c, s } = halfAdder(a, b));
      } else {
        const carry = (acc[0] && acc[0].c) || 0;
        ({ c, s } = fullAdder(a, b, carry));
      }

      return [{ c, s }, ...acc] as Output[];
    },
    []
  );

  const text = result.reduce((acc, o, i) => {
    const { s, c } = o;
    return `${acc}${(i === 0 && c === 1 && "1") || ""}${s}`;
  }, "");

  return text;
}

// // const text = addDigits(v1, v2);
// // log(`text ===> `, text);
// // log(`addDigits([0,1,0], [0, 0, 1]) ===> `, addDigits([0,1,0], [0, 0, 1]));
// // log(`addDigits([1,1], [0,1]) ===> `, addDigits([1,1], [0,1]));
// // log(`addDigits([1,1,1], [1,1,1]) ===> `, addDigits([1,1,1], [1,1,1]));
// // log(`addDigits([1,1,1,1], [0,0,1,1]) ===> `, addDigits([1,1,1,1], [0,0,1,1]));
// // log(`addDigits(to_a("1111"), to_a("11")) ===> `, addDigits("1111", "11"));

// [[0, 0], [0, 1], [1, 0], [1, 1],
// [00, 00], [00, 01], [00, 10], [01, 00], [10, 00],
// [10, 01], [10, 10], [11, 00],
// [11, 01], [11, 10], [11, 11],
// [1111, 11], [11111, 111111]
// ]
//   .map(([a, b]) => {
//     log(`${a} + ${b} => ${addDigits(`${a}`, `${b}`)}`);
//   })

export { addDigits };
