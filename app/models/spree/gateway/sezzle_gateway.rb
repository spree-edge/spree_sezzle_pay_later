module Spree
  class Gateway::SezzleGateway < Gateway
    preference :public_key, :string

    def supports?(_source)
      true
    end

    def provider_class
      self
    end

    def auto_capture?
      true
    end

    def method_type
      'sezzle'
    end

    def request_type
      'DEFAULT'
    end
  end
end
