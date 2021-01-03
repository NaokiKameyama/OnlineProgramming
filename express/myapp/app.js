const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


const execSync = require('child_process').execSync
const pullCmd = "docker pull golang"
execSync(pullCmd).toString()


app.get('/test', (req, res) => {
  const createCmd = "docker run -d -t golang:latest"
  const containerId =  execSync(createCmd).toString().substr(0, 12);
  console.log(containerId)

  const exec = require('child_process').exec;
  const cpCmd = `docker cp ./hello.go ${containerId}:/root/`
  exec(cpCmd, (err, stdout, stderr) => {
    if(err) { console.log(err); }
    console.log(stdout);
  });

  const runCmd = `docker exec ${containerId} go run /root/hello.go`
  // const runCmd = `docker exec ${containerId} echo "aaa"`
  exec(runCmd, (err, stdout, stderr) => {
    if (err) { console.log(err); }
    console.log(stdout);
    const removeCmd = `docker rm -f ${containerId}`
    execSync(removeCmd)
    res.send(stdout)
  });
})


app.post('/run', (req, res) => {
  console.log(req.body);
  console.log(req.body.code);

  const fs = require('fs');
  fs.writeFile('hello.go', req.body.code, function (err) {
      if (err) { throw err; }
      console.log('hello.goが作成されました');
  });

  const createCmd = "docker run -d -t golang:latest"
  const containerId =  execSync(createCmd).toString().substr(0, 12);
  console.log(containerId)

  const exec = require('child_process').exec;
  const cpCmd = `docker cp ./hello.go ${containerId}:/root/`
  exec(cpCmd, (err, stdout, stderr) => {
    if(err) { console.log(err); }
    console.log(stdout);
  });

  const runCmd = `docker exec ${containerId} go run /root/hello.go`
  // const runCmd = `docker exec ${containerId} echo "aaa"`
  exec(runCmd, (err, stdout, stderr) => {
    if (err) { console.log(err); }
    console.log(stdout);
    const removeCmd = `docker rm -f ${containerId}`
    execSync(removeCmd)
    res.send(stdout)
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

