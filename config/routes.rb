Rails.application.routes.draw do
  devise_for :users
  root to: 'conversations#index'
  resources :conversations, only: [:index] do
    resources :messages, only: :create
  end
end
