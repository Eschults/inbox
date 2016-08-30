var MessageListItem = React.createClass({
  render: function() {
    var messageContainerClasses = classNames({
      "message-container": true,
      "flexbox-start": true,
      "flex-item": true,
      "preview": this.props.message.id === null
    })
    return(
      <div className={messageContainerClasses}>
        <span className="flex-item-shrink">
          <img src={this.props.message.writer_avatar_url} className="avatar-square-small" />
        </span>
        <div className="message-content flex-item flexbox-columns">
          <ul className="message-header list-unstyled list-inline flex-item">
            <li><h6>{this.props.message.writer_first_name}</h6></li>
            <li className="date">{this.props.message.created_at}</li>
          </ul>
          <span className="markdown-body" dangerouslySetInnerHTML={{__html: this.props.message.content}}></span>
        </div>
      </div>
    )
  }
})
