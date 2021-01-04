import React, { Component} from 'react';
import './App.css';
import axios from "axios";
import MonacoEditor from 'react-monaco-editor';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
    this.run = this.run.bind(this);
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
        this.setState({test: res.data.stdout + res.data.stderr});
      })
  }

  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: "line",
      automaticLayout: false,
    };
    return (
      <div className="App">
        <header className="App-header">
          <MonacoEditor
            width="800"
            height="600"
            language="go"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
          />
          <button onClick={this.run}>
            run!!
          </button>
          <div className="console">
            {this.state.test}
          </div>
        </header>
      </div>
    );
  }
}
export default App;
