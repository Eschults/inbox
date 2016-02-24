var ConversationList = React.createClass({
  render: function() {
    return (
      <div className="flexbox-columns">
        {this.props.conversations.map(function(conversation, index){
          return <ConversationListItem conversation={conversation} key={index} />;
        })}
        <div className="end-of-messages">
          <p>End of messages</p>
        </div>
      </div>
    )
  }
})