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
    ActionCable.server.broadcast('messages', {
      id: @message.id,
      read_at: @message.read_at,
      writer_avatar_url: @message.user.avatar_url,
      writer_first_name: @message.user.first_name,
      created_at: @message.created_at.strftime("%b %e, %l:%M%P"),
      content: view_context.render_markdown(@message.content)
    })
    head :ok
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
