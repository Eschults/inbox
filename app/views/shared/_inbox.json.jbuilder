if selected_conversation
  json.selected_conversation_id selected_conversation.id
  json.first_name selected_conversation.other_user(current_user).first_name
  json.page params[:page] || 1
else
  json.first_name "Welcome, #{current_user.first_name}!"
end

json.conversations do
  json.array! conversations do |conversation|
    json.partial! "conversations/conversation", conversation: conversation
  end
end

json.messages do
  json.array! messages.reverse do |message|
    json.partial! "conversations/message", message: message
  end
end

json.user_id current_user.id
