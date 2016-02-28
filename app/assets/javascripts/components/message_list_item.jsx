var MessageListItem = React.createClass({
  render: function() {
    return (
      <div className="message-container flexbox-start flex-item">
        <span className="flex-item-shrink">
          <img src={"TODO"} className="avatar-square-small" />
        </span>
        <div className="message-content flex-item flexbox-columns">
          <ul className="message-header list-unstyled list-inline flex-item">
            <li><h6>{"TODO"}</h6></li>
            <li className="date">{"TODO"}</li>
          </ul>
          <div dangerouslySetInnerHTML={{__html: "TODO"}}></div>
        </div>
      </div>
    )
  }
})