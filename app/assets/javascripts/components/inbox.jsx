var Inbox = React.createClass({
  getInitialState: function() {
    return {
      conversations: this.props.conversations,
      selectedConversationId: this.props.conversation_id,
      firstName: this.props.first_name,
      messages: this.props.messages
    }
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4" id="conversation-list">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>Inbox</h4>
              </div>
              <div className="panel-body fixed-height">
                <ConversationList conversations={this.state.conversations} />
              </div>
            </div>
          </div>
          <div className="col-sm-8" id="message-list">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>{this.state.firstName}</h4>
              </div>
              <div className="panel-body fixed-height">
                <MessageList messages={this.state.messages}/>
                <CreateMessage conversationId={this.state.selectedConversationId}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})