var MessageList = React.createClass({
  render: function() {
    return(
      <div className="messages flexbox-columns-end flex-item" ref="messages">
        {this.props.messages.map(function(message, index) {
          return <MessageListItem
                    message={message}
                    key={index}
                  />
        })}
      </div>
    )
  }
})
