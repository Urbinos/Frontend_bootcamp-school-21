const closeButton = document.getElementById('close-btn');
if (closeButton) {
  closeButton.addEventListener('click', async () => {
    const orderId = document.getElementById('close-btn').dataset.id;

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: false }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      location.reload();
      document.getElementById('close-btn').removeEventListener('click'); // remove the event listener
    } catch (error) {
      console.error('Failed to close the order:', error);
    }
  });
}
