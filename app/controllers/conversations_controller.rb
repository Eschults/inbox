class ConversationsController < ApplicationController
  def index
    @conversations = current_user.conversations
    if params[:conversation_id]
      @selected_conversation = @conversations.find(params[:conversation_id])
    else
      @selected_conversation = @conversations.first
    end
    @unread_messages = @selected_conversation.unread_messages(current_user)
    @unread_messages.each { |message| message.mark_as_read }
    @unread_conversations_count = current_user.unread_conversations_count
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
