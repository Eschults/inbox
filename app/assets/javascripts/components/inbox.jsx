var Inbox = React.createClass({
  getInitialState: function() {
    return {
      selectedConversationId: this.props.selected_conversation_id,
      firstName: this.props.first_name,
      conversations: this.props.conversations,
      messages: this.props.messages
    }
  },

  render: function() {
    return(
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
                  onConversationSelection={this.handleConversationSelection}
                  selectedConversationId={this.state.selectedConversationId}
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
                <div id="wrapper">
                  <MessageList
                    messages={this.state.messages}
                  />
                </div>
                <CreateMessage
                 onMessageCreation={this.handleMessageCreation}
                 selectedConversationId={this.state.selectedConversationId}
                 ref="createMessage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  handleConversationSelection: function(conversationId) {
    var that = this
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
      }
    })
  },

  handleMessageCreation: function(conversationId, content) {
    var that = this
    $.ajax({
      type: 'POST',
      url: Routes.conversation_messages_path({format: 'json', conversation_id: conversationId}),
      data: { message: { content: content } },
      success: function(data) {
        that.setState({
          selectedConversationId: data.selected_conversation_id,
          firstName: data.first_name,
          conversations: data.conversations,
          messages: data.messages
        })
        that.refs.createMessage.handleCancel()
      }
    })
  }
})