var Inbox = React.createClass({
  getInitialState: function() {
    return {
      conversations: this.props.conversations,
      messages: this.props.messages,
      selectedConversationId: this.props.selected_conversation_id,
      firstName: this.props.first_name,
      focused: false
    }
  },

  render: function() {
    var wrapperClasses = classNames({
      "focused": this.state.focused
    })
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4" id="conversation-list">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>Inbox</h4>
              </div>
              <div className="panel-body fixed-height">
                <ConversationList
                  conversations={this.state.conversations}
                  selectedConversationId={this.state.selectedConversationId}
                  onConversationSelection={this.handleConversationSelection}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-8" id="message-list">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>{this.state.firstName}</h4>
              </div>
              <div className="panel-body fixed-height">
                <div className={wrapperClasses} id="wrapper">
                  <MessageList
                    messages={this.state.messages}
                  />
                  <CreateMessage
                    ref="createMessage"
                    conversationId={this.state.selectedConversationId}
                    onMessageCreation={this.handleMessageCreation}
                    openTextarea={this.openTextarea}
                    closeTextarea={this.closeTextarea}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  handleConversationSelection: function(conversationId) {
    var that = this;
    $.ajax({
      type: 'GET',
      url: Routes.conversations_path({format: 'json', conversation_id: conversationId}),
      success: function(data) {
        that.setState({
          selectedConversationId: data.selected_conversation_id,
          firstName: data.first_name,
          conversations: data.conversations,
          messages: data.messages
        })
        that.refs.createMessage.resetState()
      }
    })
  },

  handleMessageCreation: function(conversationId, content) {
    var that = this;
    $.ajax({
      type: 'POST',
      data: { message: { content: content} },
      url: Routes.conversation_messages_path({
        format: 'json',
        conversation_id: conversationId
      }),
      success: function(data) {
        that.setState({
          selectedConversationId: data.selected_conversation_id,
          firstName: data.first_name,
          conversations: data.conversations,
          messages: data.messages
        })
        that.refs.createMessage.resetState()
      }
    })
  },

  openTextarea: function() {
    this.setState({
      focused: true
    })
  },

  closeTextarea: function() {
    this.setState({
      focused: false
    })
  }
})