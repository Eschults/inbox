class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :messages, dependent: :nullify
  devise :omniauthable, omniauth_providers: [:facebook]

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
    avatar_url ? avatar_url : "https://placehold.it/64x64"
  end

  def self.find_for_facebook_oauth(auth)
    puts auth
    user_params = auth.to_h.slice(:provider, :uid)
    user_params.merge! auth.info.slice(:email, :first_name, :last_name)
    user_params[:avatar_url] = auth.info.image
    user_params[:token] = auth.credentials.token
    user_params[:token_expiry] = Time.at(auth.credentials.expires_at)

    user = User.find_by(provider: auth.provider, uid: auth.uid)
    user ||= User.find_by(email: auth.info.email) # User did a regular sign up in the past.
    if user
      user.update(user_params)
    else
      user = User.new(user_params)
      user.password = Devise.friendly_token[0,20]  # Fake password for validation
      user.save!
    end

    return user
  end
end
