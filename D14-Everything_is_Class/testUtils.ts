export {};
const test = (testName: string, f: VoidFunction): void => {
  try {
    f();
    console.log(`[PASS] ${testName}`);
  } catch (e) {
    console.error(`[FAIL] ${testName} => ${e}`);
  }
};
const expect = (actual: unknown) => new Matcher(actual);
class Matcher<T> {
  private actual: T;
  constructor(actual: T) {
    this.actual = actual;
  }

  toEqual(expected: T) {
    let _actual;
    let _expected;

    if (this.actual instanceof Map || this.actual instanceof Set) {
      _actual = Array.from(this.actual);
    } else {
      _actual = this.actual;
    }

    if (expected instanceof Map || expected instanceof Set) {
      _expected = Array.from(expected);
    } else {
      _expected = expected;
    }

    let expectedStr = JSON.stringify(_expected);
    let actualStr = JSON.stringify(_actual);

    if (expectedStr !== actualStr) {
      throw Error(`\n\tactual: ${actualStr}\n\texpected: ${expectedStr}`);
    }
  }

  any(expectedType: Function) {
    if (typeof this.actual !== expectedType.name.toLowerCase()) {
      throw Error(
        `\n\t${this.actual} is not a ${expectedType.name.toLowerCase()}`
      );
    }
  }
}

enum ResultType {
  Ok,
  Err,
}

class Result<T, E> {
  constructor(public type: ResultType, public value?: T, public error?: E) {}

  static ok<T>(value?: T) {
    return new Result<T, never>(ResultType.Ok, value);
  }

  static err<E>(error: E) {
    return new Result<never, E>(ResultType.Err, undefined, error);
  }

  isOk(): this is Result<T, never> {
    return this.type === ResultType.Ok;
  }

  isErr(): this is Result<never, E> {
    return this.type === ResultType.Err;
  }
}

enum OptionType {
  Some,
  None,
}

class Optional<T> {
  private constructor(public type: OptionType, private value?: T) {}

  static some<T>(value: T): Optional<T> {
    return new Optional(OptionType.Some, value);
  }

  static none<T>(): Optional<T> {
    return new Optional(OptionType.None);
  }

  isSome(): this is Optional<NonNullable<T>> {
    return this.type == OptionType.Some;
  }

  isNone(): this is Optional<never> {
    return this.type == OptionType.None;
  }

  unwrap(): T {
    if (this.isNone()) {
      throw new Error("Optional is none and cannot be unwrapped");
    }
    return this.value!;
  }

  unwrapOr(defaultValue: T): T {
    return this.isNone() ? defaultValue : this.value!;
  }

  map<U>(mapper: (value: T) => U): Optional<U> {
    if (this.isNone()) {
      return Optional.none<U>();
    }
    return Optional.some(mapper(this.value!));
  }
}

interface Error {
  name: string;
  message: string;
}

class DuplicatedKeyError implements Error {
  name = "DuplicatedKeyError";
  message: string;

  constructor(key: string) {
    this.message = `A duplicated key error occurred with key: ${key}`;
  }
}

class NotFoundError implements Error {
  name = "NotFoundError";
  message: string;

  constructor(key: string | number) {
    this.message = `The key "${key.toString()}" was not found`;
  }
}

class StorageEmptyError implements Error {
  name = "StorageEmptyError";
  message = "The storage is empty";
}

interface Data<T> {
  [key: string]: T;
}

abstract class _Storage<T> {
  constructor(protected data: Data<T> = {}) {}
  abstract setItem(key: string, value: T): Result<void, DuplicatedKeyError>;
}

class LocalStorage<T> extends _Storage<T> {
  setItem(key: string, value: T): Result<void, Error> {
    if (this.data.hasOwnProperty(key)) {
      return Result.err(new DuplicatedKeyError(key));
    }
    this.data[key] = value;
    return Result.ok();
  }

  getItem(key: string): Optional<T> {
    const value = this.data[key];
    if (value) {
      return Optional.some(value);
    }
    return Optional.none();
  }

  clearItem(key: string): Result<void, Error> {
    if (this.data.hasOwnProperty(key)) {
      delete this.data[key];
      return Result.ok();
    }
    return Result.err(new NotFoundError(key));
  }

  clear(): Result<void, Error> {
    if (Object.keys(this.data).length === 0) {
      return Result.err(new StorageEmptyError());
    }
    this.data = {};
    return Result.ok();
  }
}

const stringStroage = new LocalStorage<string>();
test("setItem should add item", () => {
  expect(stringStroage.setItem("apple", "사과")).toEqual(Result.ok());
});
test("setItem should get error with duplicated key", () => {
  expect(stringStroage.setItem("apple", "사과")).toEqual(
    Result.err(new DuplicatedKeyError("apple"))
  );
});
test("getItem should return some", () => {
  expect(stringStroage.getItem("apple")).toEqual(Optional.some("사과"));
});
test("getItem with wrong key should return none", () => {
  expect(stringStroage.getItem("wrong")).toEqual(Optional.none());
});
test("clearItem should delete a item", () => {
  expect(stringStroage.clearItem("apple")).toEqual(Result.ok());
});
test("clearItem should not found item", () => {
  expect(stringStroage.clearItem("apple")).toEqual(
    Result.err(new NotFoundError("apple"))
  );
});

stringStroage.setItem("banana", "바나나");
test("clear should clear all storage", () => {
  expect(stringStroage.clear()).toEqual(Result.ok());
});
test("clear cannot clear empty storage", () => {
  expect(stringStroage.clear()).toEqual(Result.err(new StorageEmptyError()));
});

abstract class GeolocationBase {
  constructor(
    protected pos: GeolocationPosition,
    protected watchId: number,
    protected activeWatchIds: Set<number>
  ) {}
  abstract getCurrentPosition(successFn: PositionCallback): Result<void, Error>;
  abstract getCurrentPosition(
    successFn: PositionCallback,
    errorFn: PositionErrorCallback
  ): Result<void, Error>;
  abstract getCurrentPosition(
    successFn: PositionCallback,
    errorFn: PositionErrorCallback,
    options: PositionOptions
  ): Result<void, Error>;
  abstract watchPosition(successFn: PositionCallback): Result<number, Error>;
  abstract watchPosition(
    successFn: PositionCallback,
    errorFn: PositionErrorCallback
  ): Result<number, Error>;
  abstract watchPosition(
    successFn: PositionCallback,
    errorFn: PositionErrorCallback,
    options: PositionOptions
  ): Result<number, Error>;
  abstract clearWatch(id: number): Result<void, Error>;
}

class _Geolocation extends GeolocationBase {
  constructor() {
    super(
      {
        coords: {
          latitude: 37.7749,
          longitude: -122.4194,
          accuracy: 100,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      },
      0,
      new Set()
    );
  }
  getCurrentPosition(
    successFn: PositionCallback,
    errorFn?: PositionErrorCallback,
    options?: PositionOptions
  ): Result<void, Error> {
    options && this.enableHighAccuracy(options);
    successFn(this.pos);

    return Result.ok();
  }
  watchPosition(
    successFn: PositionCallback,
    errorFn?: PositionErrorCallback,
    options?: PositionOptions
  ): Result<number, Error> {
    options && this.enableHighAccuracy(options);
    successFn(this.pos);

    const newWatchId = ++this.watchId;
    this.activeWatchIds.add(newWatchId);

    return Result.ok(newWatchId);
  }
  clearWatch(id: number): Result<void, Error> {
    if (this.activeWatchIds.has(id)) {
      this.activeWatchIds.delete(id);
      return Result.ok();
    }

    return Result.err(new NotFoundError(id));
  }
  getActiveWatchIds(): Optional<Set<number>> {
    return Optional.some(this.activeWatchIds);
  }
  private enableHighAccuracy(options: PositionOptions) {
    if (options?.enableHighAccuracy) {
      this.pos = {
        coords: {
          ...this.pos.coords,
          accuracy: 200,
        },
        timestamp: Date.now(),
      };
    }
  }
}

function success(pos: GeolocationPosition) {
  const { latitude, longitude, accuracy } = pos.coords;
  expect(latitude).any(Number);
  expect(longitude).any(Number);
  expect(accuracy).any(Number);
}
function error(err: GeolocationPositionError) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const geolocation = new _Geolocation();

test("In getCurrentPosition, successFn takes position param", () => {
  expect(geolocation.getCurrentPosition(success, error, options)).toEqual(
    Result.ok()
  );
});
test("In watchPosition, successFn takes position param and issue watchId", () => {
  expect(geolocation.watchPosition(success, error, options)).toEqual(
    Result.ok(1)
  );
  expect(geolocation.watchPosition(success, error, options)).toEqual(
    Result.ok(2)
  );
});
test("It should get 2 active watchIds", () => {
  expect(geolocation.getActiveWatchIds().unwrap().size).toEqual(2);
});
test("It should clear watch", () => {
  expect(geolocation.clearWatch(1)).toEqual(Result.ok());
});
test("It should get 1 active watchIds", () => {
  expect(geolocation.getActiveWatchIds().unwrap()).toEqual(new Set([2]));
});
