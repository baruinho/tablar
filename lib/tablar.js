import React from 'react';
import CodeEditor from './components/CodeEditor';
import {Map} from 'immutable';

function reduceModes(object) {
    const modes = Object.keys(object).reduce((modes, key) => {
        const value = object[key];
        var mode = 'text';
        if (typeof value == 'string' && /[{}\[\]]/.test(value)) {
            try {
                JSON.parse(value);
                mode = 'json';
            } catch (e) {
                debugger;
            }
        }
        modes[key] = mode;
        return modes;
    }, {});
    return Map(modes);
}

export default class Tablar extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._onModeChange = this._onModeChange.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this.state = {
            modes: reduceModes(props.object)
        };
    }
    _onChange(key, value) {
        this.props.onChange(key, value);
    }
    _onModeChange(key, mode) {
        this.setState({modes: this.state.modes.set(key, mode)});
    }
    _renderRow(key) {
        const value = this.props.object[key];
        const mode = this.state.modes.get(key);
        return (
            <tr key={key}>
                <td className="tablar-key-td">{key}</td>
                <td className="tablar-value-td">
                    <CodeEditor
                        editorId={key}
                        mode={mode}
                        value={value}
                        onChange={value => this._onChange(key, value)}
                    />
                </td>
                <td className="tablar-editor-options">
                    <select value={mode} onChange={e => this._onModeChange(key, e.target.value)}>
                        <option value="javascript">Javascript</option>
                        <option value="json">JSON</option>
                        <option value="text">Text</option>
                    </select>
                </td>
            </tr>
        );
    }
    render() {
        return (
            <div className="tablar">
                <table>
                    <tbody>
                        {Object.keys(this.props.object).map(k => this._renderRow(k))}
                    </tbody>
                </table>
            </div>
        );
    }
}

Tablar.propTypes = {
    object: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
};

Tablar.defaultProps = {
    onChange: (key, value) => {}
};