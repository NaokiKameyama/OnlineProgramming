import React, { Component} from 'react';
import './App.css';
import axios from "axios";


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.',
      test: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.run = this.run.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  run(){
    console.log(this.state.value)
    // const code = {
    //   code: "package main\nimport \"fmt\"\nfunc main() {\nfmt.Printf(\"Hello Nammmmmmmmmmm\")\n}"
    // };
    const code = {
      code: this.state.value
    };

    // let codeFromEditor = this.state.value
    // console.log(codeFromEditor)

    axios.post('http://localhost:5000/run', code)
      .then(res => {
        console.log(res.data.stdout);
        console.log(res.data.stderr);
        this.stdout = res.data.stdout + res.data.stderr
        this.setState({test: res.data.stdout + res.data.stderr});
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <textarea value={this.state.value} onChange={this.handleChange} className="form-control" rows="30" cols="120"></textarea>
          <button onClick={this.run}>
            run!!
          </button>
          <div>
            ---Console---<br/>
            {this.state.test}
          </div>
        </header>
      </div>
    );
  }
}
export default App;
