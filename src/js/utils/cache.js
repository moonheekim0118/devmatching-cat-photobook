class cache {
  constructor() {
    this.data = new Map();
  }

  has(key) {
    return this.data.has(key);
  }

  get(key) {
    return this.data.get(key);
  }

  set(key, value) {
    return this.data.set(key, value);
  }
}

export default cache;
