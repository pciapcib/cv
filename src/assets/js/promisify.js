export default ({ promiseNumber, step, interval }, callback) =>
  new Array(promiseNumber)
    .fill(() => new Promise(resolve => setTimeout(step(resolve), interval)))
    .reduce((cur, next) => cur.then(next), Promise.resolve())
    .then(callback)
