json.extract! message, :id, :user, :content, :read_at
json.writer_avatar_url message.user.avatar_url
json.writer_first_name message.user.first_name
json.created_at message.created_at.strftime("%b %e, %l:%M%P")