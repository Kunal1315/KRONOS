const savedOrder = localStorage.getItem("latestOrder");

if (savedOrder) {
    const orderDetails = JSON.parse(savedOrder);

    document.getElementById("orderID").textContent =
        orderDetails.orderId;

    document.getElementById("orderDate").textContent =
        orderDetails.orderDate;
}