Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users
  root to: 'pages#home'
  resources :conversations, only: [:index, :create] do
    resources :messages, only: :create
  end
  resources :users, only: :index

  get 'conversations/:conversation_id/preview' => 'messages#preview', as: :preview

  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
end
