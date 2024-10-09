# frozen_string_literal: true

module Spree
  class SezzlePayController < Spree::StoreController
    def complete
      create_payment('completed', params[:sezzle_pay][:order_uuid])
      current_order.next

      render json: { redirect_url: next_step_url }
    end

    def cancel
      flash[:notice] = Spree.t("flash.cancel")
      render json: { redirect_url: checkout_state_path(current_order.state) }, status: :ok
    end

    def failure
      create_payment('failed')
      render json: { redirect_url: checkout_state_path(current_order.state) }
    end

    private

    def create_payment(state, response_code = nil)
      payment_method = Spree::PaymentMethod.find_by(type: 'Spree::Gateway::SezzleGateway')
      current_order.payments.create!(
        amount: current_order.amount.to_f,
        source: Spree::SezzlePayCheckout.new(sezzle_params),
        payment_method: payment_method,
        state: state,
        response_code: response_code
      )
    end

    def sezzle_params
      params.require(:sezzle_pay).permit(:checkout_uuid, :session_uuid, :order_uuid)
    end

    def next_step_url
      current_order.complete? ? order_path(current_order) : checkout_state_path(current_order.state)
    end
  end
end
