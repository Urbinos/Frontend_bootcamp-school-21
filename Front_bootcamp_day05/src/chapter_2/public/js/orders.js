const orderForm = document.querySelector('.order-form');

if (!orderForm) {
  orderForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const selectedWaiterIndex = Number(orderForm.elements.waiter.value);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    if (!checked) {
      alert('Please select at least one menu item.');
      event.preventDefault();
    } else {
      const checkedBoxes = Array.from(
        orderForm.querySelectorAll('input[type="checkbox"]:checked')
      ).map((checkbox) => checkbox.value);

      const data = {
        userId: selectedWaiterIndex,
        items: checkedBoxes,
        isActive: true,
      };

      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.status === 201) {
          const responseData = await response.json();
          const newOrder = responseData.data;

          orderForm.reset();
          window.location.href = `/orders/${newOrder.id}`;
        }
      } catch (error) {
        console.error('Error create order:', error);
      }
    }
  });
}
