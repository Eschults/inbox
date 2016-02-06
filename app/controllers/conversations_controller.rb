class ConversationsController < ApplicationController
  def index
    @conversations = current_user.conversations
  end

  def create
    @conversation = Conversation.new(user1: current_user, user2: User.find(conversation_params[:user2_id]))
    @message = Message.new(conversation: @conversation, user: current_user, content: conversation_params[:content])
    if @message.save
      @conversation.save
    end
  end

  private

  def conversation_params
    params.require(:conversation).permit(:user2_id, :content)
  end
end
