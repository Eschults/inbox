class MessagesController < ApplicationController
  def create
    @selected_conversation = Conversation.find(params[:conversation_id])
    @message = Message.new(message_params)
    @message.user = current_user
    @message.conversation = @selected_conversation
    @message.save
    @conversations = current_user.conversations
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
