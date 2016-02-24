var ConversationListItem = React.createClass({
  getInitialState: function() {
    return {
      selected: this.props.conversation.id == this.props.selectedConversationId
    }
  },

  render: function() {
    var divClasses = classNames({
      "conversation-link": true,
      "flexbox-start": true,
      "flex-item": true,
      "selected": this.state.selected
    })
    return (
      <div className={divClasses} id={"conversation_" + this.props.conversation.id}>
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