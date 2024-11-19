Spree::Core::Engine.add_routes do
  # Add your extension routes here

  resources :sezzle_pay, only: [] do
    collection do
      post :cancel, as: :cancel
      post :complete, as: :complete
      post :failure, as: :failure
    end
  end
end
