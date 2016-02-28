json.extract! conversation, :id

json.other_user_picture_url               conversation.other_user(current_user).avatar_url
json.other_user_first_name               conversation.other_user(current_user).first_name
json.last_message_created_at             conversation.last_message.created_at.strftime("%b %e")
json.last_message_content                conversation.last_message.content
json.last_message_read_at                conversation.last_message.read_at
json.is_last_message_writer_current_user conversation.last_message.user == current_user