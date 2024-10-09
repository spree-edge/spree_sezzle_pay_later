# frozen_string_literal: true

class CreateSpreeSezzlePayCheckout < ActiveRecord::Migration[7.1]
  def change
    create_table :spree_sezzle_pay_checkouts do |t|
      t.string :checkout_uuid
      t.string :session_uuid
      t.string :order_uuid
      t.string :state, default: 'complete'
    end
  end
end
