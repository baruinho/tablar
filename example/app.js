import React from 'react';
import ReactDOM from 'react-dom';
import Tablar from '../lib/tablar';

import '../lib/tablar.css';

import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                name: "John Doe",
                age: 45,
                sex: "MALE",
                email: "john@doe.com"
            },
            types: {
                name: 'string',
                age: 'number',
                sex: 'string',
                email: 'string'
            }
        };
        this._onObjectChange = this._onObjectChange.bind(this);
        this._onTypeChange = this._onTypeChange.bind(this);
    }
    _onObjectChange(key, value) {
        const object = Object.assign(this.state.object, {[key]: value});
        this.setState({
            object,
            preview: object
        });
    }
    _onTypeChange(key, type) {
        this.setState({
            types: Object.assign({}, this.state.types, {[key]: type})
        });
    }
    render() {
        return (
            <div>
                <Tablar
                    object={this.state.object}
                    onValueChange={this._onObjectChange}
                    onTypeChange={this._onTypeChange}
                    types={this.state.types} />
                {this.state.preview ? <per>{JSON.stringify(this.state.preview, null, 2)}</per> : null}
            </div>

        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));