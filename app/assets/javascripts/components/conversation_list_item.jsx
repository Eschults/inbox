var ConversationListItem = React.createClass({
  render: function() {
    var divClasses = classNames({
      "conversation-link": true,
      "flexbox-start": true,
      "flex-item": true,
      "selected": this.props.conversation.id == this.props.selectedConversationId
    })
    return (
      <div className={divClasses} id={"conversation_" + this.props.conversation.id} onClick={this.handleClick}>
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
  },

  handleClick: function() {
    this.props.onConversationSelection(this.props.conversation.id)
  }
})