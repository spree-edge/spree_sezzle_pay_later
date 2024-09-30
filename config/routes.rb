Spree::Core::Engine.add_routes do
  # Add your extension routes here

  post "/sezzle/cancel", to: "sezzle#cancel", as: :sezzle_cancel
  post "/sezzle/complete", to: "sezzle#complete", as: :sezzle_complete
  post "/sezzle/failure", to: "sezzle#failure", as: :sezzle_failure
end
