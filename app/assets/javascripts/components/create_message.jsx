var CreateMessage = React.createClass({
  getInitialState: function() {
    return {
      focused: false,
      value: ''
    }
  },

  render: function() {
    fakeTextareaClasses = classNames({
      "hidden": this.state.focused
    })
    textareaClasses = classNames({
      "focused": this.state.focused,
      "hidden": !this.state.focused
    })
    sendBtnClasses = classNames({
      "btn": true,
      "btn-send": true,
      "flex-item": true,
      "hidden": !this.state.focused
    })
    cancelBtnClasses = classNames({
      "btn": true,
      "btn-stop": true,
      "flex-item": true,
      "hidden": !this.state.focused
    })
    return (
      <div className="message-input">
        <textarea className={fakeTextareaClasses} placeholder="Click me..." onClick={this.handleClick} onKeyUp={this.handleKeyUp} ></textarea>
        <textarea className={textareaClasses} id="newTextarea" placeholder="Answer here..." onKeyUp={this.handleKeyUp} ></textarea>
        <div className="actions flexbox-end">
          <button className={cancelBtnClasses} onClick={this.handleCancel}>Cancel</button>
          <button className={sendBtnClasses} onClick={this.createMessage}>Send</button>
        </div>
      </div>
    )
  },

  handleClick: function() {
    this.setState({
      focused: true
    })
    setTimeout(function() {
      document.getElementById('newTextarea').focus();
    }, 100)
  },

  handleKeyUp: function(e) {
    if(e.which == 27) {
      this.setState({
        focused: false,
        value: ''
      })
    }
  },

  handleCancel: function() {
    this.setState({
      focused: false
    })
  }
})