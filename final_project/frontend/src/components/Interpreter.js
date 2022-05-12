import React, { Component } from "react";
import { insertBlanks } from "../utilis";
import axios from "axios";

class Interpreter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeLib: [],
          text: "",
        };
      }
    
    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        axios
            .get("/api/Paragraph/1")
            .then((res) => this.setState({ activeLib: res.data }))
            .catch((err) => console.log(err));
    };

      render() {
        return (
          <div className="thing">
             { this.state.activeLib['body'] }
          </div>
        );
      }
}

export default Interpreter;
