import React from 'react';
import JsEditor from 'jsoneditor';
import deepEqual from 'deeper';
import 'jsoneditor/dist/jsoneditor.min.css';

import './JsonEditor.css';

export default class JsonEditor extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        	json : props.json || '',
        	jseditor : null,
			readOnly: false
        };
    }

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.jseditor) {
			return !this.state.jseditor || !deepEqual(nextState.json, this.state.jseditor.get());
		}
		return true;
	}

    componentWillReceiveProps(nextProps) {
    	//this.props.onChange();
		if (this.state.jseditor && nextProps.json && !deepEqual(nextProps.json, this.state.jseditor.get())) {
			this.state.jseditor.set(nextProps.json);
		}
    }
	componentDidMount() {
		let options = this.state.readOnly ? {onEditable: false, mode: 'view'} : {mode: 'code', onChange: this._onChange.bind(this)};
    	var editor = new JsEditor(this.refs.container, options, this.state.json);
    	this.setState({ jseditor : editor });
  	}
	_onChange() {
		if (this.props.onChange) {
			this.props.onChange(this.state.jseditor.get());
		}
	}
    render() {
    	return <div>
    		<div ref="container" className='json-editor'></div>
    	</div>
    }
}