json.extract! message, :id, :read_at
json.writer_avatar_url message.user.one_avatar_url
json.writer_first_name message.user.first_name
json.created_at message.created_at.strftime("%b %e, %l:%M%P")
json.content render_markdown(message.content)
