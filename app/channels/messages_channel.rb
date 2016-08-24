class MessagesChannel < ApplicationCable::Channel
  def follow
    stop_all_streams
    stream_from 'messages'
  end
end
