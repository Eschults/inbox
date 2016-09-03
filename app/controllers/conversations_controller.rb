class ConversationsController < ApplicationController
  def index
    @conversations = current_user.conversations
    if params[:conversation_id]
      @selected_conversation = @conversations.find(params[:conversation_id])
    else
      @selected_conversation = @conversations.first
    end
    if @selected_conversation
      @unread_messages = @selected_conversation.unread_messages(current_user)
      @unread_messages.each { |message| message.mark_as_read }
      @messages = @selected_conversation.messages.order(created_at: :desc).page(params[:page]).per(9)
    else
      @messages = []
    end
    @unread_conversations_count = current_user.unread_conversations_count
  end

  def create
    @selected_conversation = Conversation.new(conversation_params)
    @selected_conversation.user1 = current_user
    @selected_conversation.save
    @message = Message.new(content: params[:message][:content], conversation: @selected_conversation)
    @message.user = current_user
    @message.save
    @messages = @selected_conversation.messages.order(created_at: :desc).page(params[:page]).per(9)
    @conversations = current_user.conversations
    ActionCable.server.broadcast('messages', action_cable_params)
  end

  private

  def conversation_params
    params.require(:conversation).permit(:user2_id)
  end
end
