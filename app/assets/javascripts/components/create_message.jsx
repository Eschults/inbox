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
    if (e.which == 27) {
      this.handleCancel()
    }
  },

  handleClick: function() {
    this.setState({
      focused: true
    })
  },

  handleCancel: function() {
    this.setState({
      focused: false
    })
    this.refs.textarea.value = ''
    this.refs.textarea.blur()
  },

  createMessage: function() {
    this.props.onMessageCreation(this.props.selectedConversationId, this.refs.textarea.value)
  }
})