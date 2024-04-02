const orderForm = document.querySelector('.main-form');

orderForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const selectedWaiterIndex = Number(orderForm.elements.waiter.value);

  try {
    const response = await fetch(`/api/waiters/${selectedWaiterIndex}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const waiter = await response.json();
    const orders = await Promise.all(
      waiter.data.orderItems.map(async (waiterOrder) => {
        waiterOrder.items = await Promise.all(
          waiterOrder.items.map(async (item) => {
            try {
              const response = await fetch(`/api/menu/${item}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const menuItem = await response.json();
              return menuItem.data;
            } catch (error) {
              console.error(error);
            }
          })
        );
        return waiterOrder;
      })
    );

    const ordersContainer = document.getElementById('main-orders');
    ordersContainer.innerHTML = '';
    orders.forEach((order) => {
      const orderDiv = document.createElement('li');
      orderDiv.className = 'item order-item';
      const menuList = document.createElement('ul');
      menuList.className = 'order-list';

      order.items.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.className = 'item order-item';
        listItem.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <!-- <img src="/images/${item.picture}" alt="${item.title}" class="img"> -->
        <p>Cost: ${item.cost}</p>
        <!-- <p>Call quantity: ${item.callQuantity}</p> -->
      `;
        menuList.appendChild(listItem);
      });

      orderDiv.innerHTML = `
        <h2>Order &numero;${order.id}</h2>
        <p>Waiter: ${order.userId}</p>
        <p>Active: ${order.isActive}</p>
        <h3>Menu: </h3>
      `;
      orderDiv.appendChild(menuList);
      ordersContainer.appendChild(orderDiv);
    });
  } catch (error) {
    console.error(error);
  }
});
