class Colector {
  // Collector constructor
  //   expected - <number> | <string[]>, count or keys
  constructor(expected) {
    this.expectedKeys = Array.isArray(expected) ? new Set(expected) : null;
    this.expectedCount = this.expectedKeys ? expected.length : expected;
    this.collectedKeys = new Set();
    this.collectedKeysCount = 0;
    this.timer = null;
    this.onDone = () => {};
    this.isDistinct = false;
    this.isDone = false;
    this.data = {};
  }

  //  key - <string>
  //  err - <Error>
  //  value  - <any>
  // Returns: <Collector>
  collect(key, err, value) {
    if (this.isDone) return this;
    if (err) {
      this.finalize(err, this.data);
      return this;
    }

    if (this.expectedKeys && !this.expectedKeys.has(key)) {
      if (this.isDistinct) {
        const err = new Error(`Unexpected key ${key}`);
        this.finalize(err, this.data);
        return this;
      }
    } else if (!this.collectedKeys.has(key)) {
      this.collectedKeysCount++;
    }

    this.data[key] = value;
    this.collectedKeys.add(key);

    if (this.expectedCount === this.collectedKeysCount) {
      this.finalize(null, this.data);
    }

    return this;
  }

  //  key - <string>
  //  value  - <any>
  // Returns: <Collector>
  pick(key, value) {
    this.collect(key, null, value);
    return this;
  }

  //  key - <string>
  //  err - <Error>
  // Returns: <Collector>
  fail(key, err) {
    this.collect(key, err);
    return this;
  }

  //  msec - <number>
  // Returns: <Collector>
  timeout(msec) {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (msec > 0) {
      this.timer = setTimeout(() => {
        const err = new Error('Collector time out');
        this.finalize(err, this.data);
      }, msec);
    }

    return this;
  }

  //  callback - <Function>
  // Returns: <Collector>
  done(callback) {
    this.onDone = callback;
    return this;
  }

  //  key - <string>
  //  err - <Error>
  //  data  - <any>
  // Returns: <Collector>
  finalize(key, err, data) {
    if (this.isDone) return this;
    if (this.onDone) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.isDone = true;
      this.onDone(key, err, data);
    }

    return this;
  }

  //  value - <boolean>
  // Returns: <Collector>
  distinct(value = true) {
    this.isDistinct = value;
    return this;
  }

  // value - <boolean>
  // Returns: <Collector>
  cancel(err) {
    err = err || new Error('Collect canceled');
    this.finalize(err, this.data);
    return this;
  }

  then(fulfiled, rejected) {
    const fulfill = this._callOnce(fulfiled);
    const reject = this._callOnce(rejected);
    this.onDone = (err, result) => {
      if (err) reject(err);
      else fulfill(result);
    };
    return this;
  }

  _callOnce(fn) {
    if (!fn) return () => {};
    let wasCalled = false;

    const wrap = (...args) => {
      if (wasCalled) return;
      wasCalled = true;
      fn(...args);
    };

    return wrap;
  }
}

// Collector instance constructor
// expected - <number> | <string[]>
// Returns: <Collector>
const collector = (expected) => new Colector(expected);

const dc = collector(3)
  .done((err, result) => {
    if (err) console.dir(err);
    console.dir(result);
  })
  .timeout(5000);

dc.collect('name', null, 'Hleb');
dc.collect('age', null, '24');
dc.collect('status', null, 'Dev');
