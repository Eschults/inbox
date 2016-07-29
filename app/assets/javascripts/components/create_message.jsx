var CreateMessage = React.createClass({
  getInitialState: function() {
    return {
      focused: false
    }
  },

  render: function() {
    var textareaClasses = classNames({
      "focused": this.state.focused
    })
    var btnClasses = classNames({
      "btn": true,
      "flex-item": true,
      "hidden": !this.state.focused
    })
    return(
      <div className="message-input" id="newMessage">
        <textarea className={textareaClasses}
          id="newTextarea"
          ref='textarea'
          placeholder="Answer here..."
          onClick={this.handleClick}
          onKeyUp={this.handleKeyUp}></textarea>
        <div className="actions flexbox-end">
          <button className={btnClasses + " btn-stop"} onClick={this.handleCancel}>Cancel</button>
          <button className={btnClasses + " btn-send"} onClick={this.createMessage}>Send</button>
        </div>
      </div>
    )
  },

  handleKeyUp: function(e) {
    console.log(e.which);
    if (e.which == 27) {
      this.handleCancel()
    } else if (e.which === 13 && e.altKey) {
      return false;
    } else if (e.which === 13) {
      this.createMessage();
    }
  },

  handleClick: function() {
    this.setState({
      focused: true
    })
    this.props.onTextareaFocus(true);
    var that = this
    setTimeout(function() {
      that.refs.textarea.focus()
    }, 100)
  },

  handleCancel: function() {
    this.setState({
      focused: false
    })
    this.props.onTextareaFocus(false);
    this.refs.textarea.value = ''
    this.refs.textarea.blur()
  },

  createMessage: function() {
    if (this.props.createConversation) {
      this.props.onConversationCreation(this.refs.textarea.value)
    } else {
      this.props.onMessageCreation(this.props.selectedConversationId, this.refs.textarea.value)
    }
  }
})
