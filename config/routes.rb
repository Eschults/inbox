Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  resources :conversations, only: [:index, :create] do
    resources :messages, only: :create
  end
  resources :users, only: :index
end
