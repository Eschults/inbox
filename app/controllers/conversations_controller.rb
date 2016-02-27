class ConversationsController < ApplicationController
  def index
    @conversations = current_user.conversations.includes(:messages).order("messages.created_at DESC")
    if params[:conversation_id]
      @selected_conversation = @conversations.find(params[:conversation_id])
    else
      @selected_conversation = @conversations.first
    end
    @unread_messages = @selected_conversation.messages.where(
      read_at: nil,
      user: @selected_conversation.other_user(current_user)
    )
    @unread_messages.each do |message|
      message.mark_as_read
    end
    @unread_conversations_count = current_user.unread_conversations_count
  end
end
