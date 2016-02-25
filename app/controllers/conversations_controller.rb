class ConversationsController < ApplicationController
  def index
    @conversations = current_user.conversations.includes(:messages).order("messages.created_at DESC")
    if params[:conversation_id]
      @selected_conversation = @conversations.find(params[:conversation_id])
    else
      @selected_conversation = @conversations.first
    end
    @unread_messages = @selected_conversation.messages.where(read_at: nil, user: @selected_conversation.other_user(current_user))
    @unread_messages.each do |message|
      message.read_at = Time.now
      message.save
    end
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
