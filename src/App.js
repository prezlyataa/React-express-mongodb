import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

const API = 'http://localhost:5000/express';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: true
        };
    }

    componentDidMount() {
        axios.get(API)
            .then(res => { this.setState({data: res.data, loading: false}) })
            .catch(error => { console.error(error) })
    }

    content = () => {
        if(!this.state.loading) {
            return <p className="App-intro">{this.state.data.express}</p>
        }
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                  <h1 className="App-title">Welcome to React</h1>
                </header>
                {this.content()}
            </div>
        );
    }
}

export default App;
