const mockOrders = [
    {
        id: 1,
        userId: 101,
        items: [
            {
                productId: 201,
                quantity: 2,
                price: 49.99,
                status: 'Delivered'
            },
            {
                productId: 202,
                quantity: 1,
                price: 29.99,
                status: 'Delivered'
            }
        ],
        totalAmount: 129.97,
        orderDate: '2023-10-01',
        status: 'Completed'
    },
    {
        id: 2,
        userId: 102,
        items: [
            {
                productId: 203,
                quantity: 1,
                price: 19.99,
                status: 'Pending'
            }
        ],
        totalAmount: 19.99,
        orderDate: '2023-10-05',
        status: 'Pending'
    },
    {
        id: 3,
        userId: 103,
        items: [
            {
                productId: 204,
                quantity: 3,
                price: 39.99,
                status: 'Shipped'
            }
        ],
        totalAmount: 119.97,
        orderDate: '2023-10-10',
        status: 'Shipped'
    }
];

export default mockOrders;