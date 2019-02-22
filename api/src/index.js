import '@babel/polyfill'

import server from './server'

const PORT = 4000

server.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`)
})