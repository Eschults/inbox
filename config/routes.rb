Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  resources :conversations, only: :index do
    resources :messages, only: :create
  end
end
