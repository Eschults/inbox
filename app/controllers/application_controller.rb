class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  private

  def action_cable_params
    other_user = @selected_conversation.other_user(current_user)
    {
      message: {
        id: @message.id,
        read_at: @message.read_at,
        writer_avatar_url: @message.user.one_avatar_url,
        writer_first_name: @message.user.first_name,
        created_at: @message.created_at.strftime("%b %e, %l:%M%P"),
        content: view_context.render_markdown(@message.content),
        conversation_id: @message.conversation.id
      },
      sender_id: current_user.id,
      receiver_id: other_user.id,
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
    }
  end
end
