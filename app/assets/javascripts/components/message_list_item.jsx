var MessageListItem = React.createClass({
  render: function() {
    return (
      <div className="message-container flexbox-start flex-item">
        <span className="flex-item-shrink">
          <img src={this.props.message.writer_avatar_url} className="avatar-square-small" />
        </span>
        <div className="message-content flex-item flexbox-columns">
          <ul className="message-header list-unstyled list-inline flex-item">
            <li><h6>{this.props.message.writer_first_name}</h6></li>
            <li className="date">{this.props.message.created_at}</li>
          </ul>
          <div dangerouslySetInnerHTML={{__html: this.props.message.content}}></div>
        </div>
      </div>
    )
  }
})