var CreateMessage = React.createClass({
  getInitialState: function() {
    return {
      focused: false,
      twoLine: false,
      threeLine: false
    }
  },

  render: function() {
    var textareaClasses = classNames({
      "focused": this.state.focused,
      "two-line": this.state.focused && this.state.twoLine,
      "three-line": this.state.focused && this.state.threeLine
    })
    return(
      <div className="message-input" id="newMessage">
        <textarea className={textareaClasses}
          id="newTextarea"
          ref='textarea'
          placeholder="Answer here..."
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}></textarea>
      </div>
    )
  },

  handleKeyDown: function(e) {
    if (e.which == 27) {
      this.handleCancel()
    } else if (e.which === 13 && e.altKey) {
      if (this.state.twoLine) {
        this.setState({
          twoLine: false,
          threeLine: true
        })
        this.props.onTextareaLineBreak(3);
      } else if (this.state.threeLine) {
        return false
      } else {
        this.setState({twoLine: true})
        this.props.onTextareaLineBreak(2);
      }
      this.refs.textarea.value += "\n"
    } else if (e.which === 13) {
      e.preventDefault();
      this.props.onTextareaLineBreak(1);
      this.createMessage();
    }
  },

  handleClick: function() {
    this.setState({
      focused: true
    })
    var that = this
    setTimeout(function() {
      that.refs.textarea.focus()
    }, 100)
  },

  handleCancel: function() {
    this.props.onTextareaLineBreak(1);
    this.setState({
      focused: false,
      twoLine: false,
      threeLine: false
    })
    this.refs.textarea.value = ''
    this.refs.textarea.blur()
  },

  handleKeyUp: function() {
    var text = this.refs.textarea.value;
    var count = (text.match(/\n/g) || []).length;
    if (count === 0) {
      this.setState({
        twoLine: false,
        threeLine: false
      })
      this.props.onTextareaLineBreak(1);
    } else if (count === 1) {
      this.setState({
        twoLine: true,
        threeLine: false
      })
      this.props.onTextareaLineBreak(2);
    }
  },

  createMessage: function() {
    if (this.props.createConversation) {
      this.props.onConversationCreation(this.refs.textarea.value)
    } else {
      this.props.onMessageCreation(this.props.selectedConversationId, this.refs.textarea.value)
    }
  }
})
