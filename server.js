const express = require('express')

const port = 3000;
const app = express()

app.get('/', function (req, res) {
  const htmlLines = [
    '<html>',
    '<body>',
    '  <h1>Learn CSP</h1>',
    '</body>',
    '</html>',
  ]
  res.set({
    'Content-Type': 'text/html',
    'Cache-Control': 'no-store',
  })
  res.send(htmlLines.join('\n'))
})

app.listen(port, () => {
  console.log(`Listening on ${port} port.`)
})
