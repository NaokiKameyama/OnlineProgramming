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
      output: '',
      value: '',
      code: '',
      answerCode: '',
    };
    this.run = this.run.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({code: value});
  }

  async run(){
    const { data: { stdout, stderr } } = await axios.post('http://localhost:5000/run', {code: this.state.code})
    const { data : {answer_output} } = await axios.get('http://localhost:5000/get_answer/1/1/2')
    const check = (stdout + stderr).replace(/\r?\n/g,'') === answer_output.replace(/\r?\n/g,'')
    this.setState({output: stdout + stderr});
    ( check ) ? alert("正解") : alert("不正解")
  }

  async getAnswer(){
    const { data : {answer_script, answer_output} } = await axios.get('http://localhost:5000/get_answer/1/1/2')
    console.log(answer_script)
    console.log(answer_output)
    return answer_output
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
            run😎
          </Button>
          <Button className="run-button" variant="outlined" color="primary" onClick={this.getAnswer}>
            answer😎
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
