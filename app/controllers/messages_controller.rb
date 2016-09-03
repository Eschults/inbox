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
    ActionCable.server.broadcast('messages', action_cable_params)
  end

  def preview
    @selected_conversation = Conversation.find(params[:conversation_id])
    @message = Message.new(message_params)
    @message.user = current_user
    ActionCable.server.broadcast('previews', action_cable_preview_params)
    head :ok
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end

  def action_cable_preview_params
    other_user = @selected_conversation.other_user(current_user)
    {
      message: {
        id: @message.id,
        read_at: @message.read_at,
        writer_avatar_url: @message.user.one_avatar_url,
        writer_first_name: @message.user.first_name,
        created_at: "Now typing",
        content: view_context.render_markdown(@message.content),
        conversation_id: @selected_conversation.id
      },
      sender_id: current_user.id,
      receiver_id: other_user.id
    }
  end
end
