export function sleep(time = 500) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function createUuid() {
  return URL.createObjectURL(new Blob()).slice(-36);
}

export function swap({ a, b, from, to }: { a: number, b: number, from: Array<unknown>, to?: Array<unknown> }) {
  to
    ? [from[a], to[b]] = [to[b], from[a]]
    : [from[a], from[b]] = [from[b], from[a]];
}

export function throttle(fun: Function, delay = 0) {
  let timeStamp = 0;
  return function (this: Function, ...args: unknown[]) {
    const now = Date.now();
    if (now - timeStamp < delay) return;

    fun.apply(this, args);
    timeStamp = now;
  }
}