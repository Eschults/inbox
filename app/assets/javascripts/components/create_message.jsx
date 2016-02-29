var CreateMessage = React.createClass({
  getInitialState: function() {
    return {
      focused: false
    }
  },

  render: function() {
    var fakeTextareaClasses = classNames({
      "hidden": this.state.focused
    })
    var textareaClasses = classNames({
      "focused": this.state.focused
    })
    var btnClasses = classNames({
      "btn": true,
      "flex-item": true,
      "hidden": !this.state.focused
    })

    return (
      <div className="message-input" id="newMessage">
        <textarea className={textareaClasses}
          id="newTextarea"
          placeholder="Answer here..."
          ref="textarea"
          onClick={this.handleClick}
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
    this.props.openTextarea()
  },

  handleKeyUp: function(e) {
    if(e.which == 27) {
      this.handleCancel()
    }
  },

  handleCancel: function() {
    this.resetState()
  },

  createMessage: function() {
    this.props.onMessageCreation(this.props.conversationId, this._textarea().value)
  },

  resetState: function() {
    this.setState({
      focused: false
    });
    this._textarea().blur();
    this._textarea().value = '';
    this.props.closeTextarea();
  },

  _textarea: function() {
    return this.refs.textarea;
  }
})