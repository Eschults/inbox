class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :messages

  def conversations
    Conversation.where("conversations.user1_id = :id OR conversations.user2_id = :id", id: id)
  end

  def other_user(conversation)
    conversation.users.include?(self) ? conversation.other_user(self) : nil
  end

  def unread_conversations
    conversations.joins(:messages).where("messages.read_at = ?", nil)
  end

  def unread_conversations_count
    unread_conversations.count
  end
end
