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
      code: ''
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
    this.setState({output: stdout + stderr});
  }

  async getAnswer(){
    const { data: { question } } = await axios.get('http://localhost:5000/get_answer', { 
      params:{lessun_id:16} 
    })
    console.log(question)
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
