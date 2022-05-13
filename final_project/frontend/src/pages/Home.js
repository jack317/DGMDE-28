import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './static/Home.css';
import axios from 'axios';
import { LoadBlanks } from '../components/LoadBlanks';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLib: {
                title: "",
                body: "",
            },
            id: 1,
            output: [],
            count: 10,
            random: 2,
        };
      }

    componentDidMount() {
        this.getParagraphOutput();
    }

    // function gets all of the objects from the paragraphs table
    // then counts how many objects there are and uses that to get a random madlib
    getParagraphOutput = () => {
        axios
            .get('/api/Paragraph/')
            .then((response) => this.setState({ output: response.data }))
            .then(() => this.setState({ count: this.state.output.length }))
            .then(() => this.setState({ random: Math.floor(Math.random() * this.state.count)+1 }))
            .then(() => console.log(Math.floor(Math.random() * this.state.count)+1))
            .then(() => this.loadText());
    }
    
    // function to load the specific madLib that has been chosen at random. Sets the state
    // of the activeLib array to be pushed as props later
    loadText = () => {
        axios
            .get(`/api/Paragraph/${this.state.random}`)
            .then((res) => this.setState({ activeLib: res.data }))
            .catch((err) => console.log(err));
    };
    
    render() {
        return (
            <Card className="main-card" style={{ width: '50rem' }}>
                <Card.Body>
                    <Card.Title className="madlib-title">{this.state.activeLib.title}</Card.Title>
                        <LoadBlanks
                            passTitle={this.state.activeLib.title}
                            passText={this.state.activeLib.body}
                        />
                </Card.Body>
            </Card>
        );
    }
}

export default Home;
