Spree::Core::Engine.add_routes do
  # Add your extension routes here

  post "/sezzle_pay/cancel", to: "sezzle_pay#cancel", as: :sezzle_pay_cancel
  post "/sezzle_pay/complete", to: "sezzle_pay#complete", as: :sezzle_pay_complete
  post "/sezzle_pay/failure", to: "sezzle_pay#failure", as: :sezzle_pay_failure
end
