class PreviewsChannel < ApplicationCable::Channel
  def follow
    stop_all_streams
    stream_from 'previews'
  end
end
