class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :messages

  def conversations
    Conversation.includes(:messages).where("user1_id = :id OR user2_id = :id", id: id)
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
end
