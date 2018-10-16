import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

const API = 'http://localhost:5000/persons';

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
            .catch(error => { console.error(error) });
    }

    addPerson = () => {
        axios.post(API, {
            name: 'Fred',
            age: 28
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    content = () => {
        if(!this.state.loading) {
            return (
                <div>
                    {this.state.data.map((person, idx) => {
                        return (<p key={idx}>{idx}) name: {person.name} | age: {person.age}</p>)
                    })}
                </div>
            );
        }
    };

    render() {
        console.log(this.state.data);
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
