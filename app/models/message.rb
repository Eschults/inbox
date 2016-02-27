class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :conversation

  validates :content, presence: true
  validates :conversation, presence: true
  validates :user, inclusion: { in: :users }

  def mark_as_read
    self.read_at = DateTime.now
    self.save
  end

  def users
    conversation.users
  end
end
