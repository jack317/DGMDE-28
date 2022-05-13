import { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../pages/static/AddForm.css';
import axios from 'axios';

class AddForm extends Component {
    state = {
        activeLib: {
            title: "",
            body: "",
        },
    };

    handleChange = (e) => {
        let { name, value } = e.target;
        const activeLib = { ...this.state.activeLib, [name]: value };

        this.setState({ activeLib });
      };
    
    addedMessage() {
        document.getElementById('add-lib').style.display = "none";
        document.getElementById('create-form').style.display = "none";
        var message = document.createElement("h2");
        message.innerHTML = "Yay you submitted a new Madlib!";
        message.className = "custom-title"
        document.getElementById('create-main-div').appendChild(message);
    }

    handleSubmit = (activeLib) => {
        axios
          .post('api/Paragraph/', activeLib)
          .then((res) => console.log(res))
          .then(() => this.addedMessage()) 
      };

    render () {
        return (
            <div id="create-main-div">
            <Form id='create-form' style= {{ width: '40em' }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="custom-title">Create Your Own MadLib</Form.Label>
                    <Form.Control
                        type="title"
                        name="title"
                        placeholder="Enter a Fun Title"
                        value={this.state.activeLib.title}
                        onChange= {this.handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="custom-instructions">Type up your own MadLib! Use a &lt; 
                    wherever you would like there to be a blank space.</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="body"
                        name="body"
                        placeholder="Add the Body of your new MadLib"
                        rows ={5}
                        value={this.state.activeLib.body}
                        onChange= {this.handleChange}
                    />
                </Form.Group>
                <Button
                    id="add-lib"
                    variant="primary"
                    onClick={() => this.handleSubmit(this.state.activeLib)}
                >
                    Submit
                </Button>
            </Form>
            </div>
        );
    }
}

export default AddForm;
