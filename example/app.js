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
                age: "45",
                sex: "MALE",
                phones: '["123 123 123", "456 456 456", "789 789 789"]',
                email: "john@doe.com"
            }
        };
        this._onObjectChange = this._onObjectChange.bind(this);
    }
    _onObjectChange(key, value) {
        const object = Object.assign(this.state.object, {[key]: value});
        this.setState({
            object,
            preview: object
        });
    }
    render() {
        return (
            <div>
                <Tablar
                    object={this.state.object}
                    onChange={this._onObjectChange} />
                {this.state.preview ? <per>{JSON.stringify(this.state.preview, null, 2)}</per> : null}
            </div>

        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));