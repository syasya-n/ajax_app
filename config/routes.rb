Rails.application.routes.draw do
  get 'posts' , to: 'posts#index'
  get 'posts/new', to: 'posts#new'
  post 'posts/b', to: 'posts#create'
end
