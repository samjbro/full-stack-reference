const fakeDelay = async (duration = 2000) => {
  await new Promise(resolve => {
    setTimeout(() => resolve(), duration)
  })
}

export { fakeDelay }