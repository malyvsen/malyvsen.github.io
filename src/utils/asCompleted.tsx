export default async function* asCompleted<T>(
  promises: Array<Promise<T>>
): AsyncGenerator<T> {
  let remainingPromises = [...promises];

  while (remainingPromises.length > 0) {
    const completedPromise = await Promise.race(
      remainingPromises.map((promise) =>
        promise.then((value) => ({ promise, value }))
      )
    );
    remainingPromises = remainingPromises.filter(
      (promise) => promise !== completedPromise.promise
    );
    yield completedPromise.value;
  }
}
