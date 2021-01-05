import React, { Component} from 'react';
import './App.css';
import axios from "axios";
// import MonacoEditor from 'react-monaco-editor';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/theme-monokai";
import Button from '@material-ui/core/Button';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 'vvv',
      code: ''
    };
    this.run = this.run.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  onChange(value) {
    this.setState({code: value});
  }

  run(){
    axios.post('http://localhost:5000/run', {code: this.state.code})
      .then(res => {
        console.log(res.data.stdout);
        console.log(res.data.stderr);
        this.stdout = res.data.stdout + res.data.stderr
        // const sample_str = this.stdout.replace(/\r?\n/g, '<br/>')
        this.setState({test: this.stdout});
      })
  }

  getAnswer(){
    axios.get('http://localhost:5000/get_answer')
    .then(res => {
      console.log(res.data.question)
      this.setState({value: res.data.question});
    })
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
            {this.state.test}
          </div>
        </header>
      </div>
    );
  }
}
export default App;
