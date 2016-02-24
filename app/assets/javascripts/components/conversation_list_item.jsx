var ConversationListItem = React.createClass({
  render: function() {
    return (
      <div className="conversation-link flexbox-start flex-item" id={"conversation_" + this.props.conversation.id}>
        <span className="flex-item-shrink">
          <img src={this.props.conversation.other_user_piture_url} className="avatar-square" />
        </span>
        <div className="conversation-preview flexbox-columns flex-item">
          <ul className="conversation-header list-unstyled list-inline flex-item">
            <li><h6>{this.props.conversation.other_user_first_name}</h6></li>
            <li className="date">{this.props.conversation.last_message_created_at}</li>
          </ul>
          <div className="message-preview flex-item">
            <span>{this.props.conversation.last_message_content}</span>
          </div>
        </div>
      </div>
    )
  }
})