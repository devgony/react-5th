export {};
// 0. util functions and classes
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

class WrongOptionError implements Error {
  name = "WrongOptionError";
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

class StorageEmptyError implements Error {
  name = "StorageEmptyError";
  message = "The storage is empty";
}

// 1-1. implement LocalStorage API
interface Data<T> {
  [key: string]: T;
}

abstract class _Storage<T> {
  constructor(protected data: Data<T> = {}) {}
  abstract setItem(key: string, value: T): Result<void, DuplicatedKeyError>;
  abstract getItem(key: string): Optional<T>;
  abstract clearItem(key: string): Result<void, NotFoundError>;
  abstract clear(): Result<void, StorageEmptyError>;
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

// 1-2. test LocalStorage API
const stringStroage = new LocalStorage<string>();
test("setItem should add item", () => {
  expect(stringStroage.setItem("apple", "사과")).toEqual(Result.ok());
});
test("setItem should get error with duplicated key", () => {
  expect(stringStroage.setItem("apple", "사과")).toEqual(
    Result.err(new DuplicatedKeyError("apple"))
  );
});
test("getItem should return some string", () => {
  expect(stringStroage.getItem("apple")).toEqual(Optional.some("사과"));
});
test("getItem with wrong key should return none", () => {
  expect(stringStroage.getItem("wrong")).toEqual(Optional.none());
});
test("clearItem should delete a item", () => {
  expect(stringStroage.clearItem("apple")).toEqual(Result.ok());
});
test("clearItem should get error with wrong key", () => {
  expect(stringStroage.clearItem("apple")).toEqual(
    Result.err(new NotFoundError("apple"))
  );
});

stringStroage.setItem("banana", "바나나");
test("clear should remove all data in storage", () => {
  expect(stringStroage.clear()).toEqual(Result.ok());
});
test("clear cannot be executed with empty storage", () => {
  expect(stringStroage.clear()).toEqual(Result.err(new StorageEmptyError()));
});

// 2-1. implement Geolocation mocking API
type _EpochTimeStamp = number;

interface _GeolocationCoordinates {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

interface _GeolocationPosition {
  readonly coords: _GeolocationCoordinates;
  readonly timestamp: _EpochTimeStamp;
}

interface _PositionCallback {
  (position: _GeolocationPosition): void;
}

interface _GeolocationPositionError {
  readonly code: number;
  readonly message: string;
  readonly PERMISSION_DENIED: 1;
  readonly POSITION_UNAVAILABLE: 2;
  readonly TIMEOUT: 3;
}

interface _PositionErrorCallback {
  (positionError: _GeolocationPositionError): void;
}

interface _PositionOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

abstract class GeolocationBase {
  constructor(
    protected pos: _GeolocationPosition,
    protected watchId: number,
    protected activeWatchIds: Set<number>
  ) {}
  abstract getCurrentPosition(
    successFn: _PositionCallback
  ): Result<void, Error>;
  abstract getCurrentPosition(
    successFn: _PositionCallback,
    errorFn: _PositionErrorCallback
  ): Result<void, Error>;
  abstract getCurrentPosition(
    successFn: _PositionCallback,
    errorFn: _PositionErrorCallback,
    options: _PositionOptions
  ): Result<void, Error>;
  abstract watchPosition(successFn: _PositionCallback): Result<number, Error>;
  abstract watchPosition(
    successFn: _PositionCallback,
    errorFn: _PositionErrorCallback
  ): Result<number, Error>;
  abstract watchPosition(
    successFn: _PositionCallback,
    errorFn: _PositionErrorCallback,
    options: _PositionOptions
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
    successFn: _PositionCallback,
    errorFn?: _PositionErrorCallback,
    options?: _PositionOptions
  ): Result<void, Error> {
    if (options?.maximumAge && options.maximumAge < 0) {
      errorFn &&
        errorFn({
          code: 1,
          message: "maximumAge should be non-negative",
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        });

      return Result.err(
        new WrongOptionError("maximumAge should be non-negative")
      );
    }
    options && this.enableHighAccuracy(options);
    successFn(this.pos);

    return Result.ok();
  }
  watchPosition(
    successFn: _PositionCallback,
    errorFn?: _PositionErrorCallback,
    options?: _PositionOptions
  ): Result<number, Error> {
    if (options?.maximumAge && options.maximumAge < 0) {
      errorFn &&
        errorFn({
          code: 1,
          message: "maximumAge should be non-negative",
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        });

      return Result.err(
        new WrongOptionError("maximumAge should be non-negative")
      );
    }

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
  private enableHighAccuracy(options: _PositionOptions) {
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

// 2-2. test Geolocation mocking API
function success(pos: _GeolocationPosition) {
  const { latitude, longitude, accuracy } = pos.coords;
  expect(latitude).any(Number);
  expect(longitude).any(Number);
  expect(accuracy).any(Number);
}
function error(err: _GeolocationPositionError) {
  expect(err).toEqual({
    code: 1,
    message: "maximumAge should be non-negative",
    PERMISSION_DENIED: 1,
    POSITION_UNAVAILABLE: 2,
    TIMEOUT: 3,
  });
}
const options = {
  enableHighAccuracy: true,
  timeout: 3,
  maximumAge: 0,
};
const wrongOptions = {
  enableHighAccuracy: true,
  timeout: 3,
  maximumAge: -1,
};
const geolocation = new _Geolocation();

test("in getCurrentPosition, successFn takes position param", () => {
  expect(geolocation.getCurrentPosition(success, error, options)).toEqual(
    Result.ok()
  );
});
test("getCurrentPosition with wrongOption should get error", () => {
  expect(geolocation.getCurrentPosition(success, error, wrongOptions)).toEqual(
    Result.err(new WrongOptionError("maximumAge should be non-negative"))
  );
});
test("in watchPosition, successFn takes position param and issue watchId", () => {
  expect(geolocation.watchPosition(success, error, options)).toEqual(
    Result.ok(1)
  );
  expect(geolocation.watchPosition(success, error, options)).toEqual(
    Result.ok(2)
  );
});
test("watchPosition with wrongOption should get error", () => {
  expect(geolocation.watchPosition(success, error, wrongOptions)).toEqual(
    Result.err(new WrongOptionError("maximumAge should be non-negative"))
  );
});
test("should get 2 active watchIds", () => {
  expect(geolocation.getActiveWatchIds().unwrap().size).toEqual(2);
});
test("should clear watch", () => {
  expect(geolocation.clearWatch(1)).toEqual(Result.ok());
});
test("clear watch with wrong id should get error", () => {
  expect(geolocation.clearWatch(1)).toEqual(Result.err(new NotFoundError(1)));
});
test("should get 1 active watchIds", () => {
  expect(geolocation.getActiveWatchIds().unwrap()).toEqual(new Set([2]));
});
