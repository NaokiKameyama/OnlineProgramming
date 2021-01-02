const express = require('express')
const app = express()
const port = 3000


const execSync = require('child_process').execSync
const pullCmd = "docker pull golang"
execSync(pullCmd).toString()


app.get('/', (req, res) => {
const createCmd = "docker run -d -t 5f9d35ce5cfe"
const containerId =  execSync(createCmd).toString().substr(0, 12);
console.log(containerId)

const exec = require('child_process').exec;
const cpCmd = `docker cp ./hello.go ${containerId}:/root/`
exec(cpCmd, (err, stdout, stderr) => {
  if(err) { console.log(err); }
  console.log(stdout);
  console.log(1)
});


const runCmd = `docker exec ${containerId} go run /root/hello.go`
exec(runCmd, (err, stdout, stderr) => {
  if (err) { console.log(err); }
  console.log(stdout);
  console.log(2)
  const removeCmd = `docker rm -f ${containerId}`
  execSync(removeCmd)
  console.log(3)
  res.send(stdout)
});
  
 // res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

