Rails.application.routes.draw do
  
  root 'welcome#index'

  get 'welcome/index'
  
  
  get 'article/:vid/show_version' => 'articles#show_version', :as => "article_show_version"
  get 'article/:id/show_history' => 'articles#show_history', :as => "article_show_history"
  resources :articles do
    # match 'articles/:vid/version/show' => 'articles#show_version', :via => [:get, :post], :as => :article_show_version
    resources :comments
  end

  resources  :comments 

  resources :room_types
  match 'room_types/:id/save' => 'room_types#update', :via => [:get, :post, :patch], :as => :room_type_save 
  get 'room_type/:vid/show_version' => 'room_types#show_version', :as => "room_type_show_version"
  get 'room_type/:id/show_history' => 'room_types#show_history', :as => "room_type_show_history"

  resources :rooms
  get 'room/:vid/show_version' => 'rooms#show_version', :as => "room_show_version"
  get 'room/:id/show_history' => 'rooms#show_history', :as => "room_show_history"
  
 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
