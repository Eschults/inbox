var UserList = React.createClass({
  render: function() {
    var that = this
    return (
      <ul className="list-unstyled users">
        {this.props.users.map(function(user, index) {
          return <UserListItem
                    user={user}
                    key={index}
                    selectedUserIndex={that.props.selectedUserIndex}
                    selectedUserId={that.props.selectedUserId}
                    onUserSelection={that.props.onUserSelection}
                  />
        })}
      </ul>
    )
  }
})