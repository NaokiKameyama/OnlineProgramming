const express = require('express')
const bodyParser = require('body-parser')
var { Client } = require('pg');
const app = express()
const port = 3000

// CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// メッセージをパースする
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const execSync = require('child_process').execSync
const pullCmd = "docker pull golang"
execSync(pullCmd).toString()

app.post('/run', (req, res) => {
  console.log("run実行")
  console.log(req.body);

  const fs = require('fs');
  fs.writeFile('hello.go', req.body.code, function (err) {
      if (err) { throw err; }
      console.log("ファイル作成処理開始")
      console.log(req.body.code);
      console.log('hello.goが作成されました');
  });

  const createCmd = "docker run -d -t golang:latest"
  console.log("コンテナ起動処理開始")
  const containerId =  execSync(createCmd).toString().substr(0, 12);
  console.log(containerId)
  console.log("コンテナ起動中")

  const exec = require('child_process').exec;
  const cpCmd = `docker cp ./hello.go ${containerId}:/root/`
  exec(cpCmd, (err, stdout, stderr) => {
    if(err) { console.log(err); }
    console.log("go実行")
    console.log(stdout);
    console.log("go実行終了")
  });

  const runCmd = `docker exec ${containerId} go run /root/hello.go`
  // const runCmd = `docker exec ${containerId} echo "aaa"`
  exec(runCmd, (err, stdout, stderr) => {
    // if (err) { console.log(err); }
    console.log({stdout, stderr, err});
    const removeCmd = `docker rm -f ${containerId}`
    console.log("コンテナ削除処理開始")
    execSync(removeCmd)
    console.log("コンテナ削除完了")
    res.send( {stdout, stderr, err} )
  });
});

app.get('/get_answer/', (req, res) => {
  // postgresqlに接続するためのクライアント
  const client = new Client({
    user: 'admin',
    host: 'online_programming-db',
    database: 'testdb',
    password: 'admin',
    port: 5432
  })
  client.connect()
  .then(() => client.query(`select * from gquestions WHERE questionnumber=${req.query.lessun_id}`))
  .then(results => res.send(results.rows[0]))
  .catch((e => console.log(e)))
  .finally((() => client.end()))
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

