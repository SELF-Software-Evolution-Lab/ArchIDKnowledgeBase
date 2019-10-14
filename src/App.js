import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {github} from 'react-syntax-highlighter/dist/esm/styles/hljs';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showing: 0
        }
    }

    componentDidMount() {
        axios.get("https://archtoringbd.herokuapp.com/categorization").then(response => {
            const currentCategorization = [].concat.apply([], response.data.find(c => c.name === "DemoProyectoJava").decisions.map(d => d.rules));
            this.setState({
                currentCategorization,
                showing: parseInt(window.location.hash.charAt(window.location.hash.length - 1))
            })
        });

    }

    render() {
        return (
            <div className="App container">
                <h1 className="text-center">Knowledge base for architectural issues</h1>
                <div className="accordion" id="accordion">
                    {this.state.currentCategorization && this.state.currentCategorization.map((rule, id) => {
                        return <div key={id} className="card">
                            <div className="card-header" id={"heading" + id}>
                                <h4 className="mb-0 container">
                                    <button className="btn" type="button" data-toggle="collapse"
                                            data-target={"#collapse" + id}
                                            aria-expanded={id === this.state.showing ? "true" : "false"}
                                            aria-controls={"#collapse" + id}>
                                        <strong>R{id + 1}:</strong> <em>{rule.title}</em>
                                    </button>
                                </h4>
                            </div>
                            <div id={"collapse" + id}
                                 className={"collapse " + (id === this.state.showing ? "show" : "")}
                                 aria-labelledby={"heading" + id}
                                 data-parent="#accordion">
                                <div className="card-body">
                                    <div className="small"><i className="material-icons">
                                        label
                                    </i>{rule.structuralElement} <i className="material-icons">
                                        timer
                                    </i>{rule.debt} min. <i className="material-icons">
                                        warning
                                    </i>{rule.severity}     </div>
                                    <p>{rule.description}</p>
                                    <h5>Non-Compliant Example</h5>
                                    <div>
                                        <SyntaxHighlighter language="java"
                                                           style={github}>{rule.nonCompliantExample.replace(/\\r\\n/g, "\n")}</SyntaxHighlighter>
                                        <h5>Compliant Solution</h5>
                                        <SyntaxHighlighter language="java"
                                                           style={github}>{rule.compliantSolution.replace(/\\r\\n/g, "\n")}</SyntaxHighlighter>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default App;
