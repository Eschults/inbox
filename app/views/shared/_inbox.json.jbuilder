json.selected_conversation_id @selected_conversation.id
json.first_name selected_conversation.other_user(current_user).first_name

json.conversations do
  json.array! conversations do |conversation|
    json.partial! "conversations/conversation", conversation: conversation
  end
end

json.messages do
  json.array! selected_conversation.messages.order(created_at: :asc) do |message|
    json.partial! "conversations/message", message: message
  end
end