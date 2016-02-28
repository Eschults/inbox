var CreateMessage = React.createClass({
  render: function() {
    return (
      <div className="message-input" id="newMessage">
        <textarea className={"TODO"} placeholder="Click me..."></textarea>
        <textarea className="hidden" id="newTextarea" placeholder="Answer here..."></textarea>
        <div className="actions flexbox-end">
          <button className="btn btn-stop hidden">Cancel</button>
          <button className="btn btn-send hidden">Send</button>
        </div>
      </div>
    )
  }
})