class Conversation < ActiveRecord::Base
  belongs_to :user1, class_name: "User"
  belongs_to :user2, class_name: "User"
  has_many :messages, dependent: :destroy

  validates :user1, uniqueness: {scope: :user2}
  validates :user1, :user2, presence: true

  def users
    return [user1, user2]
  end

  def other_user(user)
    users.include?(user) ? (users - [user]).first : nil
  end

  def unread_messages(user)
    messages.where(user: other_user(user), read_at: nil)
  end

  def unread_messages_count(user)
    unread_messages(user).count
  end

  def unread_messages?(user)
    unread_messages_count(user) > 0
  end

  def last_message
    messages.order(created_at: :asc).last
  end
end