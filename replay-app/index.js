const express = require('express')
const app = express()
const port = 8080

app.all('/blog*', function replayToBlog(req, res) {
  res.set('Fly-Replay', 'app=fly-replay-blog')
  res.status(204).send('')
})

app.all('*', (req, res) => {
  res.send(`You are in the replay app!
FLY_REGION = ${process.env.FLY_REGION}
FLY_MACHINE_ID = ${process.env.FLY_MACHINE_ID}
FLY_APP_NAME = ${process.env.FLY_APP_NAME}
FLY_MACHINE_VERSION = ${process.env.FLY_MACHINE_VERSION}
FLY_PROCESS_GROUP = ${process.env.FLY_PROCESS_GROUP}
`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})