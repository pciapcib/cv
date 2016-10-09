export default (arrayLength, step, time, callback) =>
  new Array(arrayLength)
    .fill(() => new Promise(resolve => setTimeout(step(resolve), time)))
    .reduce((cur, next) => cur.then(next), Promise.resolve())
    .then(callback)
