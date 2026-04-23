const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        address: {
            street: "123 Fashion St",
            city: "Style City",
            state: "CA",
            zip: "90210"
        },
        orders: [101, 102],
        notifications: [
            { id: 1, message: "Your order #101 has been shipped.", read: false },
            { id: 2, message: "New drops are available!", read: true }
        ]
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "securepassword",
        address: {
            street: "456 Trend Ave",
            city: "Chic Town",
            state: "NY",
            zip: "10001"
        },
        orders: [103],
        notifications: [
            { id: 3, message: "Your order #103 has been delivered.", read: false }
        ]
    },
    {
        id: 3,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "mypassword",
        address: {
            street: "789 Style Blvd",
            city: "Fashion City",
            state: "TX",
            zip: "73301"
        },
        orders: [],
        notifications: []
    }
];

export default users;