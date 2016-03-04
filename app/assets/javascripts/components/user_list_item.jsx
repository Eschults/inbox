var UserListItem = React.createClass({
  render: function() {
    var userClasses = classNames({
      "user": true,
      "selected": this.props.selectedUserId == this.props.user.id
    })
    return(
      <li>
        <div className={userClasses} onClick={this.selectUser}>
          <div className="user-avatar">
            <img src={this.props.user.avatar_url} className="avatar-square-small" />
          </div>
          <div className="user-name">{this.props.user.first_name}</div>
        </div>
      </li>
    )
  },

  selectUser: function() {
    this.props.onUserSelection(this.props.user.id)
  }
})