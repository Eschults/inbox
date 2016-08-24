class MessageRelayJob < ApplicationJob
  def perform(message_id)
    message = Message.find(message_id)
    message_list_item =  ConversationsController.render(partial: 'conversations/message',
                                         locals: {message: message})
    ActionCable.server.broadcast "messages", message: message_list_item
  end
end
