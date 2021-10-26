const express = require('express')

const port = 3000;
const app = express()

function createJsScriptTag(options = {}) {
  const withEval = options.withEval === true ? true : false;
  return [
    '<script>',
    withEval
      ? 'eval("window.foo = 1 + 2;"); console.log("JS includes `eval`.", foo);'
      : 'console.log("JS does not include `eval`.");',
    '</script>',
  ].join('')
}

app.get('/without-csp/without-eval', function (req, res) {
  const htmlLines = [
    '<html><body>',
    createJsScriptTag(),
    '</body></html>',
  ]
  res.set({
    'Content-Type': 'text/html',
    'Cache-Control': 'no-store',
  })
  res.send(htmlLines.join('\n'))
})
app.get('/without-csp/with-eval', function (req, res) {
  const htmlLines = [
    '<html><body>',
    createJsScriptTag({withEval: true}),
    '</body></html>',
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
