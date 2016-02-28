var ConversationListItem = React.createClass({
  render: function() {
    return (
      <div className={"TODO"}>
        <span className="flex-item-shrink">
          <img src={"TODO"} className="avatar-square" />
        </span>
        <div className="conversation-preview flexbox-columns flex-item">
          <ul className="conversation-header list-unstyled list-inline flex-item">
            <li><h6>{"TODO"}</h6></li>
            <li className="date">{"TODO"}</li>
          </ul>
          <div className="message-preview flex-item">
            <i className={"TODO"}> </i>&nbsp;&nbsp;
            <span>{"TODO"}</span>
          </div>
        </div>
      </div>
    )
  }
})