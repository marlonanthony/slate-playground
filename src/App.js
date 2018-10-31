import React, { Component } from 'react';
import { Editor } from 'slate-react' 
import { Value } from 'slate' 
import './App.css';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph', 
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.'
              }
            ]
          }
        ]
      }
    ]
  }
})

const MarkHotKey = (options) => {
  const { type, key } = options 

  return {
    onKeyDown(event, editor, next) {
      if(!event.ctrlKey || event.key !== key) return next()
      event.preventDefault()
      editor.toggleMark(type)
    }
  }
}

const plugins = [
  MarkHotKey({ key: 'b', type: 'bold' }),
  MarkHotKey({ key: '`', type: 'code' }),
  MarkHotKey({ key: 'i', type: 'italic' }),
  MarkHotKey({ key: '-', type: 'strikethrough' }),
  MarkHotKey({ key: 'u', type: 'underline' }),
] 

class App extends Component {

  state = { value: initialValue }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  render() {
    return (
      <Editor 
        className="App" 
        plugins={plugins}
        value={this.state.value} 
        onChange={this.onChange}
        renderMark={this.renderMark}>
      </Editor>
    );
  }

  renderMark = (props, editor, next) => {
    switch(props.mark.type) {
      case 'bold': 
        return <strong>{props.children}</strong>
      case 'code':
        return <code>{props.children}</code>
      case 'italic':
        return <em>{props.children}</em>
      case 'strikethrough':
        return <del>{props.children}</del>
      case 'underline':
        return <u>{props.children}</u>
      default: 
        return next() 
    }
  }
}

export default App
