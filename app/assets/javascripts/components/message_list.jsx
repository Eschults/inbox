var MessageList = React.createClass({
  render: function() {
    return (
      <div className="flexbox-columns">
        {this.props.messages.map(function(message, index){
          return <MessageListItem message={message} key={index} />;
        })}
      </div>
    )
  }
})