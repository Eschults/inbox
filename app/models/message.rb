class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :conversation

  def mark_as_read
    self.read_at = DateTime.now
    self.save
  end

  def mark_as_unread
    self.read_at = nil
    self.save
  end
end
