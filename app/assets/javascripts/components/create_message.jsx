var CreateMessage = React.createClass({
  render: function() {
    return (
      <div className="message-input" id="newMessage">
        <textarea className={"TODO"} placeholder="Click me..."></textarea>
        <textarea className="hidden" id="newTextarea" placeholder="Answer here..."></textarea>
        <div className="actions flexbox-end">
          <button className={"TODO"}>Cancel</button>
          <button className={"TODO"}>Send</button>
        </div>
      </div>
    )
  }
})