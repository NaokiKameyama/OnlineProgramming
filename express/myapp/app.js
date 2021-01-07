const express = require('express')
const bodyParser = require('body-parser')
var { Client } = require('pg');

// ===============事前定義===============
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

// Express起動時にgolangイメージを取得
const execSync = require('child_process').execSync;
const { text } = require('body-parser');
const { timeStamp } = require('console');
const pullCmd = "docker pull golang"
execSync(pullCmd).toString()

const postgresConnectionInfo = {
  user: 'admin',
  host: 'online_programming-db',
  database: 'postgres',
  password: 'admin',
  port: 5432
};
// =====================================


// ===============API===============
// ソースコードの実行結果を返却するAPI
app.post('/run', (req, res) => {
  console.log("run apiの実行")
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

// カテゴリーID, テーマID, レッスンIDの値に一致する実行結果の答えを返却するAPI
app.get('/get_answer_output/:category_id/:theme_id/:lessun_id', async (req, res) => {
  console.log("get_answer_output apiの実行")
  // postgresqlに接続するためのクライアント
  const client = new Client(postgresConnectionInfo)
  await client.connect()
  const results = await client.query(`select answer_output from lessun WHERE 
    category_id=${req.params.category_id} AND
    theme_id=${req.params.theme_id} AND
    lessun_id=${req.params.lessun_id}`)
  client.end()
  res.send(results.rows[0].answer_output)
});

// カテゴリーID, テーマID, レッスンIDの値に一致するソースコードの答えを返却するAPI
app.get('/get_answer_script/:category_id/:theme_id/:lessun_id', async (req, res) => {
  console.log("get_answer_script apiの実行")
  const client = new Client(postgresConnectionInfo)
  await client.connect()
  const results = await client.query(`select answer_script from lessun WHERE 
    category_id=${req.params.category_id} AND
    theme_id=${req.params.theme_id} AND
    lessun_id=${req.params.lessun_id}`)
  client.end()
  res.send(results.rows[0].answer_script)
})

// カテゴリーID, テーマID, レッスンIDの値に一致する問題文を返却するAPI
app.get('/get_question_sentence/:category_id/:theme_id/:lessun_id', async (req, res) => {
  console.log("get_question_sentence apiの実行")
  const client = new Client(postgresConnectionInfo)
  await client.connect()
  const results = await client.query(`select question_sentence from lessun WHERE 
    category_id=${req.params.category_id} AND
    theme_id=${req.params.theme_id} AND
    lessun_id=${req.params.lessun_id}`)
  client.end()
  res.send(results.rows[0].question_sentence)
})

// カテゴリーID, テーマID, レッスンIDの値に一致するレッスンが有料(true)か無料(false)かを返却
app.get('/get_is_premium/:category_id/:theme_id/:lessun_id', async (req, res) => {
  console.log("get_is_premium apiの実行")
  const client = new Client(postgresConnectionInfo)
  await client.connect()
  const results = await client.query(`select ispremium from lessun WHERE 
    category_id=${req.params.category_id} AND
    theme_id=${req.params.theme_id} AND
    lessun_id=${req.params.lessun_id}`)
  client.end()
  res.send(results.rows[0].ispremium)
})

// コード実行結果をlessun_statusテーブルにUPSERTする
app.post('/update_lessun_status/:category_id/:theme_id/:lessun_id', async (req, res) => {
  console.log("update_lessun_status apiの実行")
  const client = new Client(postgresConnectionInfo)
  await client.connect()
  const sqlCmd = 
  `insert into lessun_status (user_id, category_id, theme_id, lessun_id, result, created_at, updated_at)
  VALUES (
    '${req.body.userId}',
    ${req.params.category_id},
    ${req.params.theme_id},
    ${req.params. lessun_id},
    TRUE,
    current_timestamp,
    current_timestamp
    )
  on conflict (user_id, category_id, theme_id, lessun_id)
  do update set result=${req.body.runResult}, updated_at=current_timestamp;`
  await client.query(sqlCmd)
  client.end()
})

// ログインしたユーザーの情報をテーブルにUPSERTする
app.post('/login', async (req, res) => {
  console.log("login apiの実行")
  const { displayName, email, photoURL, emailVerified, uid} = req.body
  const client = new Client(postgresConnectionInfo);
  await client.connect();
  const sqlCmd = 
  `insert into public.user (user_id, email, displayName, photoURL, created_at, updated_at)
  VALUES (
    '${uid}',
    '${email}',
    '${displayName}',
    '${photoURL}',
    current_timestamp,
    current_timestamp
    )
  on conflict (user_id)
  do update set updated_at=current_timestamp;`
  await client.query(sqlCmd);
  client.end();
})

// =====================================


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




// CREATE TABLE user (
//   id SERIAL,
//   user_id text,
//   email text,
//   displayName text,
//   photoURL text,
//   subscription_id text,
//   subscription_status text,
//   created_at timestamp,
//   updated_at timestamp,
//   constraint user_unique unique (user_id)
// );

// insert into user (user_id, email, displayName, photoURL, created_at, updated_at)
//   VALUES ('test', 'test', 'test', 'test', current_timestamp, current_timestamp)
//   on conflict (user_id)
//   do update set updated_at=current_timestamp;