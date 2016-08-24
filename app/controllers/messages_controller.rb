class MessagesController < ApplicationController
  def create
    @selected_conversation = Conversation.find(params[:conversation_id])
    @message = Message.new(message_params)
    @message.user = current_user
    @message.conversation = @selected_conversation
    # @message.content = @message.content.gsub("\n", "  \n").gsub("  \n  \n", "\n\n")
    @message.save
    @messages = @selected_conversation.messages.order(created_at: :desc).page(params[:page]).per(9)
    @conversations = current_user.conversations
    other_user = @selected_conversation.other_user(current_user)
    ActionCable.server.broadcast('messages', {
      message: {
        id: @message.id,
        read_at: @message.read_at,
        writer_avatar_url: @message.user.avatar_url,
        writer_first_name: @message.user.first_name,
        created_at: @message.created_at.strftime("%b %e, %l:%M%P"),
        content: view_context.render_markdown(@message.content),
        conversation_id: @message.conversation.id
      },
      sender_id: current_user.id,
      sender_conversations: @conversations.map do |conversation|
        {
          id: conversation.id,
          other_user_picture_url: conversation.other_user(current_user).one_avatar_url,
          other_user_first_name: conversation.other_user(current_user).first_name,
          last_message_created_at: conversation.last_message.created_at.strftime("%b %e"),
          last_message_content: conversation.last_message.content,
          last_message_read_at: conversation.last_message.read_at,
          is_last_message_writer_current_user: conversation.last_message.user == current_user,
          user: conversation.other_user(current_user)
        }
      end,
      receiver_conversations: other_user.conversations.map do |conversation|
        {
          id: conversation.id,
          other_user_picture_url: conversation.other_user(other_user).one_avatar_url,
          other_user_first_name: conversation.other_user(other_user).first_name,
          last_message_created_at: conversation.last_message.created_at.strftime("%b %e"),
          last_message_content: conversation.last_message.content,
          last_message_read_at: conversation.last_message.read_at,
          is_last_message_writer_current_user: conversation.last_message.user == other_user,
          user: conversation.other_user(other_user)
        }
      end
    })
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
