export class Publisher {
  subscribers = {};
  static instance = null;

  constructor() {
    if (!Publisher.instance) {
      Publisher.instance = this;
    }
    return Publisher.instance;
  }
  subscribe(event, callback) {
    this.initEvent(event);
    this.subscribers[event].push(callback);
  }
  unsubscribe(event, callback) {
    this.initEvent(event);
    this.subscribers[event] = this.subscribers[event].filter(listener => listener != callback);
  }
  notify(event, data) {
    this.subscribers[event].forEach(listener => listener(data));
  }

  initEvent(event) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
  }
}
