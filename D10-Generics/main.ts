export {};
// ReactStudy5thDay10-Generics
// nomadId = vanillalattejs
const assertEq = <T>(testName: string, actual: T, expected: T) => {
  if (JSON.stringify(expected) !== JSON.stringify(actual)) {
    throw Error(`${testName} FAIL:\nactual: ${actual}\nexpected: ${expected}`);
  }
  console.log(`${testName} PASS`);
};

// last(arr): 이 함수는 배열의 마지막 요소를 반환해야 합니다.
const last = <T>(arr: T[]): T => arr[arr.length - 1];
assertEq("last", last([1, 2]), 2);

// prepend(arr, item): 이 함수는 배열의 시작 부분에 item을 넣고 return해야 합니다.
const prepend = <T>(arr: T[], item: T): T[] => [item, ...arr];
assertEq("prepend", prepend([1, 2], 3), [3, 1, 2]);

// mix(arr,arr) : 두개의 배열을 매개변수로 받아, 매개변수로 받은 두 배열을 하나의 배열로 섞어서 하나의 배열로 반환합니다.
const mix = <T>(arr1: T[], arr2: T[]): T[] => [...arr1, ...arr2];
assertEq("mix", mix([1, 2], [3, 4]), [1, 2, 3, 4]);

// count(arr) : 배열을 매개변수로 받아, 매개변수로 받아온 배열의 길이를 반환하면됩니다.
const count = <T>(arr: T[]): number => arr.length;
assertEq("count", count([1, 2]), 2);

// findIndex(arr, item) : 첫번째 매개변수로 배열을, 두번째 매개변수로 받아온 item이 첫번째 매개변수 arr배열의 몇번째 index로 존재하는지 체크한후 존재한다면 몇번째 index인지 반환하고 존재하지않는다면 null을 반환합니다.
const findIndex = <T>(arr: T[], item: T): number | null => {
  const index = arr.findIndex((e) => e === item);

  return index === -1 ? null : index;
};
assertEq("findIndex1", findIndex([1, 2], 2), 1);
assertEq("findIndex2", findIndex([1, 2], 3), null);

// slice(arr, startIndex, endIndex): 첫번째 매개변수로 배열 arr을 받고, 두번째 매개변수로 숫자 startIndex, 세번째 매개변수 숫자 endIndex를 받습니다.
// 첫번째 매개변수 arr을 두번째 매개변수로 받은 startIndex부터 세번째 매개변수로 받은 인덱스까지 자른 결과를 반환하면됩니다. 이때 세번째 매개변수는 필수 매개변수가 아닙니다.
const slice = <T>(arr: T[], startIndex: number, endIndex?: number): T[] =>
  arr.slice(startIndex, endIndex);
assertEq("slice1", slice([0, 1, 2, 3], 1, 3), [1, 2]);
assertEq("slice2", slice([0, 1, 2, 3], 1), [1, 2, 3]);
