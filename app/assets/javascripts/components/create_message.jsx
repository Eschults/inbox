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
      <div className="message-input" id="newMessage">
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
    $('.wrapper').css('padding-bottom', 268)
    $('.wrapper').scrollTop($('.wrapper')[0].scrollHeight)
    setTimeout(function() {
      $('#newTextarea').focus();
    }, 100)
  },

  handleKeyUp: function(e) {
    if(e.which == 27) {
      $('#newTextarea').val('')
      this.setState({
        focused: false,
        value: ''
      })
      $('.wrapper').css('padding-bottom', 61)
    } else {
      this.setState({
        value: $('#newTextarea').val()
      })
    }
  },

  handleCancel: function() {
    this.setState({
      focused: false
    })
    $('.wrapper').css('padding-bottom', 61)
  },

  createMessage: function() {
    this.props.onMessageCreation(this.props.conversationId, this.state.value)
    var that = this
    setTimeout(function() {
      $('#newTextarea').val('')
      that.setState({
        focused: false,
        value: ''
      })
    }, 100)
  }
})