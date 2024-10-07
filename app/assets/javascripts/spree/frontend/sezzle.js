//= require spree/frontend

const orderDataElement = document.getElementById('order-data');
const { orderTotal, orderNumber, publicKey } = orderDataElement.dataset;

const checkout = new Checkout({
  'mode': "popup",
  'publicKey': publicKey,
  'apiMode': "sandbox",
  'isVirtualCard': true
});

checkout.renderSezzleButton("sezzle-smart-button-container");

checkout.init({
  onClick: function () {
    event.preventDefault();
    checkout.startCheckout({
      checkout_payload: {
        "order": {
          "intent": "AUTH",
          "reference_id": orderNumber,
          "description": "tesitng",
          "order_amount": {
            "amount_in_cents": Number(orderTotal),
            "currency": "USD"
          }
        }
      }
    });
  },
  onComplete: function (event) {
    handleComplete();
  },
  onCancel: function() {
    handleCancel();
  },
  onFailure: function() {
    console.log("checkout failed");
  }
})

function handleCancel() {
  fetch('/sezzle/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to update Status');
    }
    return response.json();
  })
  .then(data => {
      window.location.href = data.redirect_url; 
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function handleComplete() {
  fetch('/sezzle/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to update Status');
    }
    return response.json();
  })
  .then(data => {
      window.location.href = data.redirect_url; 
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
