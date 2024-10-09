//= require spree/frontend

const orderDataElement = document.getElementById('order-data');
const { orderTotal, orderNumber, publicKey, server } = orderDataElement.dataset;

const checkout = new Checkout({
  'mode': "popup",
  'publicKey': publicKey,
  'apiMode': server,
  'apiVersion': "v2"
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
    handleComplete(event);
  },
  onCancel: function() {
    handleCancel(event);
  },
  onFailure: function() {
    handleFailure(event);
    console.log("checkout failed");
  }
})

function handleCancel() {
  fetch('/sezzle_pay/cancel', {
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

function handleFailure() {
  fetch('/sezzle_pay/failure', {
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

function handleComplete(event) {
  fetch('/sezzle_pay/complete?order_number=' + orderNumber, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    },
    body: JSON.stringify(event.data)
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
