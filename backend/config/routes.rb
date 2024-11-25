Rails.application.routes.draw do
  devise_for :users, path_names: {sign_in: "signin", sign_out: "signout", registration: "signup"},
    controllers: {
      sessions: "user/sessions",
      registrations: "user/registrations"
    }, defaults: {format: :json}

  devise_scope :user do
    post "users/refresh_token", to: "users/sessions#refresh_token"
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check
  get "ping" => "ping#show"

  # Defines the root path route ("/")
  root to: "home#index"
end
