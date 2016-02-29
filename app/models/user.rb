class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :messages

  def conversations
    Conversation.includes(:messages)
                .where("user1_id = :id OR user2_id = :id", id: id)
                .order("messages.created_at DESC")
  end

  def other_user(conversation)
    conversation.users.include?(self) ? conversation.other_user(self) : nil
  end

  def unread_conversations
    conversations.select { |c| c.unread_messages?(self) }
  end

  def unread_conversations_count
    unread_conversations.count
  end

  def unread_conversations?
    unread_conversations_count > 0
  end

  def one_avatar_url
    avatar_url ? avatar_url : "http://placehold.it/64x64"
  end
end