var ConversationListItem = React.createClass({
  render: function() {
    var divClasses = classNames({
      "conversation-link": true,
      "flexbox-start": true,
      "selected": this.props.conversation.id == this.props.selectedConversationId,
      "unread-messages": !this.props.conversation.is_last_message_writer_current_user && !this.props.conversation.last_message_read_at
    })
    var iClasses = classNames({
      "fa": this.props.conversation.is_last_message_writer_current_user,
      "fa-reply": this.props.conversation.is_last_message_writer_current_user && !this.props.conversation.last_message_read_at,
      "fa-check": this.props.conversation.is_last_message_writer_current_user && this.props.conversation.last_message_read_at,
      "small-badge": !this.props.conversation.is_last_message_writer_current_user,
      "small-badge-off": !this.props.conversation.is_last_message_writer_current_user && this.props.conversation.last_message_read_at
    })
    return (
      <div className={divClasses}>
        <span className="flex-item-shrink">
          <img src={this.props.conversation.other_user_piture_url} className="avatar-square" />
        </span>
        <div className="conversation-preview flexbox-columns flex-item">
          <ul className="conversation-header list-unstyled list-inline flex-item">
            <li><h6>{this.props.conversation.other_user_first_name}</h6></li>
            <li className="date">{this.props.conversation.last_message_created_at}</li>
          </ul>
          <div className="message-preview flex-item">
            <i className={iClasses}> </i>&nbsp;&nbsp;
            <span>{this.props.conversation.last_message_content}</span>
          </div>
        </div>
      </div>
    )
  }
})