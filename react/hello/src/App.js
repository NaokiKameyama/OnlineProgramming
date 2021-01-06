import React, { Component} from 'react';
import './App.css';
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/theme-monokai";
import Button from '@material-ui/core/Button';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      domain: 'http://localhost',
      port: '5000',
      output: '',
      value: '',
      code: '',
      answerCode: '',
    };
    this.run = this.run.bind(this);
    this.getAnswerScript = this.getAnswerScript.bind(this);
    this.getQuestionSentence = this.getQuestionSentence.bind(this);
    this.getIsPremium = this.getIsPremium.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({code: value});
  }

  async run(){
    const { data: { stdout, stderr } } = await axios.post(`${this.state.domain}:${this.state.port}/run`, {code: this.state.code})
    const {data: answer_output }= await axios.get(`${this.state.domain}:${this.state.port}/get_answer_output/1/1/2`)
    console.log(`実行結果:\n${stdout+stderr}`);
    console.log(`答え:\n${answer_output}`);
    const check = (stdout + stderr).replace(/\r?\n/g,'') === answer_output.replace(/\r?\n/g,'');
    this.setState({output: stdout + stderr});
    axios.post(`${this.state.domain}:${this.state.port}/update_lessun_status/1/1/2`, {
      runResult: check,
      userId: "user01"
    });
    ( check ) ? alert("正解") : alert("不正解");
  }

  async getAnswerScript(){
    const { data : answer_script } = await axios.get(`${this.state.domain}:${this.state.port}/get_answer_script/1/1/2`)
    console.log(answer_script)
    return answer_script
  }

  async getQuestionSentence() {
    const { data: question_sentence } = await axios.get(`${this.state.domain}:${this.state.port}/get_question_sentence/1/1/2`)
    console.log(question_sentence)
    return question_sentence
  }

  async getIsPremium() {
    const { data: ispremium } = await axios.get(`${this.state.domain}:${this.state.port}/get_is_premium/1/1/2`)
    console.log(ispremium)
    return ispremium
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="editor">
            <div className="editor-header">Editor</div>
            <AceEditor
                placeholder="🧑‍💻👩‍💻 < Let's coding!"
                mode="golang"
                theme="monokai"
                name="blah2"
                // onLoad={this.onLoad}
                height="60vh"
                width="800px"
                onChange={this.onChange}
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
            />
          </div>
          <Button className="run-button" variant="outlined" color="primary" onClick={this.run}>
            run
          </Button>
          <Button className="run-button" variant="outlined" color="primary" onClick={this.getAnswerScript}>
            getgetAnswerScript
          </Button>
          <Button className="run-button" variant="outlined" color="primary" onClick={this.getQuestionSentence}>
            getQuestionSentence
          </Button>
          <Button className="run-button" variant="outlined" color="primary" onClick={this.getIsPremium}>
            getIsPremium
          </Button>
          <div className="console">
            <div className="console-header">Console</div>
            {this.state.output}
          </div>
        </header>
      </div>
    );
  }
}
export default App;
