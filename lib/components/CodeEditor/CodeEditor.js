import React, {PropTypes} from 'react';
import brace from 'brace';

import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/text';
import 'brace/theme/eclipse';

export default class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this._instance = this._instance.bind(this);
    }
    componentWillUpdate(nextProps, nextState) {
        if (this.props.mode !== nextProps.mode) {
            this.setMode(nextProps.mode);
        }
    }
    setMode(mode) {
        this.editor.session.setMode(`ace/mode/${mode}`);
    }
    _instance(input) {
        if (input) {
            var editor = brace.edit(this.props.editorId);
            editor.setTheme('ace/theme/eclipse');
            editor.session.setMode(`ace/mode/${this.props.mode}`);
            editor.setOptions(this.props.editorOptions);
            editor.session.setValue(this.props.value);
            editor.on('change', e => {
                this.props.onChange(editor.getSession().getValue());
            });
            editor.on('blur', e=> {
                editor.renderer.hideCursor();
            });
            this.editor = editor;
            this.props.onAfterLoad(editor);
        }
    }
    render() {
        return <div ref={this._instance} id={this.props.editorId}  />
    }
}

CodeEditor.propTypes = {
    editorId: PropTypes.string,
    editorOptions: PropTypes.object,
    mode: PropTypes.oneOf(['javascript', 'json', 'text']),
    onAfterLoad: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string
};

CodeEditor.defaultProps = {
    editorId: 'code_editor',
    editorOptions: {
        maxLines: 30,
        minLines: 1,
        showPrintMargin: false,
        showGutter: false
    },
    mode: 'json',
    onAfterLoad: editor => {},
    onChange: value => {},
    value: ''
};

