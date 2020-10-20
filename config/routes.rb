Rails.application.routes.draw do
  
  resources :room_types
  root 'welcome#index'

  get 'welcome/index'
  
  
  get 'article/:vid/show_version' => 'articles#show_version', :as => "article_show_version"
  get 'article/:id/show_history' => 'articles#show_history', :as => "article_show_history"
  resources :articles do
    # match 'articles/:vid/version/show' => 'articles#show_version', :via => [:get, :post], :as => :article_show_version
    resources :comments
  end

  resources  :comments 
 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
