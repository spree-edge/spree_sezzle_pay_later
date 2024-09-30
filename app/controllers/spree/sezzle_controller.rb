# frozen_string_literal: true

module Spree
  class SezzleController < Spree::StoreController
    def complete; end

    def cancel
      flash[:notice] = Spree.t("flash.cancel")

      render json: { redirect_url: checkout_state_path(current_order.state) }, status: :ok
    end

    def failure; end
  end
end
