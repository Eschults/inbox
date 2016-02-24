json.extract! conversation, :id, :user1, :user2, :updated_at, :created_at

json.other_user_piture_url conversation.other_user(current_user).avatar_url
json.other_user_first_name conversation.other_user(current_user).first_name
json.last_message_created_at conversation.last_message.created_at.strftime("%e %b")
json.last_message_content conversation.last_message.content