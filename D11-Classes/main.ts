export {};
// ReactStudy5thDay11-Classes
// nomadId = vanillalattejs
const assertEq = <T, K, V>(
  testName: string,
  actual: T | Map<K, V>,
  expected: T | Map<K, V>
) => {
  let _actual;
  let _expected;
  if (actual instanceof Map) {
    _actual = Array.from(actual);
  } else {
    _actual = actual;
  }

  if (expected instanceof Map) {
    _expected = Array.from(expected);
  } else {
    _expected = expected;
  }

  let expectedStr = JSON.stringify(_expected);
  let actualStr = JSON.stringify(_actual);
  if (expectedStr !== actualStr) {
    throw Error(
      `${testName} FAIL:\nactual: ${actualStr}\nexpected: ${expectedStr}`
    );
  }
  console.log(`${testName} PASS`);
};

// 타입스크립트의 클래스를 이용하여 Dict (사전. dictionary) 클래스를 만드세요. Dict 클래스는 아래와 같은 메소드들을 갖고 있어야 합니다.
// add: 단어를 추가함.
// get: 단어의 정의를 리턴함.
// delete: 단어를 삭제함.
// update: 단어를 업데이트 함.
// showAll: 사전 단어를 모두 보여줌.
// count: 사전 단어들의 총 갯수를 리턴함.
// upsert 단어를 업데이트 함. 존재하지 않을시. 이를 추가함. (update + insert = upsert)
// exists: 해당 단어가 사전에 존재하는지 여부를 알려줌.
// bulkAdd: 다음과 같은 방식으로. 여러개의 단어를 한번에 추가할 수 있게 해줌. [{term:"김치", definition:"대박이네~"}, {term:"아파트", definition:"비싸네~"}]
// bulkDelete: 다음과 같은 방식으로. 여러개의 단어를 한번에 삭제할 수 있게 해줌. ["김치", "아파트"]

class Result<T> {
  ok?: T;
  err?: string;
  constructor(ok?: T, err?: string) {
    this.ok = ok;
    this.err = err;
  }
}

type Word = {
  term: string;
  definition: string;
};

type Words = Map<string, Word>;

class Dict {
  private words: Words;
  constructor() {
    this.words = new Map<string, Word>();
  }

  count(): number {
    return this.words.size;
  }

  add(word: Word): Result<Words | undefined> {
    if (this.words.has(word.term)) {
      return new Result(undefined, `${word.term} already exists`);
    }
    return new Result(this.words.set(word.term, word), undefined);
  }

  get(term: string): Word | undefined {
    return this.words.get(term);
  }

  delete(term: string): boolean {
    return this.words.delete(term);
  }

  update(word: Word): Words {
    return this.words.set(word.term, word);
  }

  showAll(): Words {
    return this.words;
  }

  upsert(word: Word): Words {
    return this.words.set(word.term, word);
  }

  exists(term: string): boolean {
    return this.words.has(term);
  }

  bulkAdd(words: Word[]): Words {
    words.forEach((word) => this.words.set(word.term, word));

    return this.words;
  }

  bulkDelete(words: Word[]): Words {
    words.forEach((word) => this.words.delete(word.term));

    return this.words;
  }
}

const dict = new Dict();
assertEq("count", dict.count(), 0);
const word = { term: "김치", definition: "대박이네" };
assertEq("add", dict.add(word), new Result(new Map([["김치", word]])));
assertEq("add", dict.add(word), new Result(undefined, "김치 already exists"));
assertEq("count", dict.count(), 1);
assertEq("get", dict.get("김치"), word);
const updatedWord = { term: "김치", definition: "맛있어요" };
assertEq("update", dict.update(updatedWord), new Map([["김치", updatedWord]]));
assertEq("showAll", dict.showAll(), new Map([["김치", updatedWord]]));
const upsertedWord = { term: "김치", definition: "Good" };
assertEq(
  "upsert should update",
  dict.upsert(upsertedWord),
  new Map([["김치", upsertedWord]])
);
const newWord = { term: "아파트", definition: "비싸네~" };
assertEq(
  "upsert should insert",
  dict.upsert(newWord),
  new Map([
    ["김치", upsertedWord],
    ["아파트", newWord],
  ])
);
assertEq("delete", dict.delete("김치"), true);
assertEq("exists with 김치 should be false", dict.exists("김치"), false);
assertEq("exists with 아파트 should be true", dict.exists("아파트"), true);
const apple = { term: "apple", definition: "사과" };
const banana = { term: "banana", definition: "바나나" };
const items = [apple, banana];
assertEq(
  "bulkAdd",
  dict.bulkAdd(items),
  new Map([
    ["아파트", newWord],
    ["apple", apple],
    ["banana", banana],
  ])
);
assertEq("bulkDelete", dict.bulkDelete(items), new Map([["아파트", newWord]]));
