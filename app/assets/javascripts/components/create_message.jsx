var CreateMessage = React.createClass({
  getInitialState: function() {
    return {
      focused: false,
      value: ''
    }
  },

  render: function() {
    var fakeTextareaClasses = classNames({
      "hidden": this.state.focused
    })
    var textareaClasses = classNames({
      "focused": this.state.focused,
      "hidden": !this.state.focused
    })
    var btnClasses = classNames({
      "btn": true,
      "flex-item": true,
      "hidden": !this.state.focused
    })

    return (
      <div className="message-input" id="newMessage">
        <textarea className={fakeTextareaClasses}
          placeholder="Click me..."
          onClick={this.handleClick}></textarea>
        <textarea className={textareaClasses}
          id="newTextarea"
          placeholder="Answer here..."
          onKeyUp={this.handleKeyUp}></textarea>
        <div className="actions flexbox-end">
          <button className={btnClasses + " btn-stop"} onClick={this.handleCancel}>Cancel</button>
          <button className={btnClasses + " btn-send"} onClick={this.createMessage}>Send</button>
        </div>
      </div>
    )
  },

  handleClick: function() {
    this.setState({
      focused: true
    })
    this.props.setPadding()
    setTimeout(function() {
      $('#newTextarea').focus()
    }, 100)
  },

  handleKeyUp: function(e) {
    if(e.which == 27) {
      this.handleCancel()
    } else {
      this.setState({
        value: $('#newTextarea').val()
      })
    }
  },

  handleCancel: function() {
    this.resetState()
  },

  createMessage: function() {
    this.props.onMessageCreation(this.props.conversationId, this.state.value)
  },

  resetState: function() {
    this.setState({
      focused: false,
      value: ''
    })
    this.props.cancelPadding()
    $('#newTextarea').val('')
  }
})