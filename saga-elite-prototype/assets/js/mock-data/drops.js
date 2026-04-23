const drops = [
    {
        id: 1,
        title: "Limited Edition Sneakers",
        description: "A unique pair of sneakers designed for comfort and style.",
        releaseDate: "2023-10-15T12:00:00Z",
        imageUrl: "https://source.unsplash.com/random/400x300?sneakers",
        price: 150,
        variants: [
            { size: "7", stock: 10 },
            { size: "8", stock: 5 },
            { size: "9", stock: 0 },
            { size: "10", stock: 8 },
        ],
    },
    {
        id: 2,
        title: "Stylish Hoodie",
        description: "A cozy hoodie perfect for the fall season.",
        releaseDate: "2023-10-20T12:00:00Z",
        imageUrl: "https://source.unsplash.com/random/400x300?hoodie",
        price: 75,
        variants: [
            { size: "S", stock: 15 },
            { size: "M", stock: 10 },
            { size: "L", stock: 5 },
            { size: "XL", stock: 2 },
        ],
    },
    {
        id: 3,
        title: "Classic Denim Jacket",
        description: "A timeless denim jacket that never goes out of style.",
        releaseDate: "2023-10-25T12:00:00Z",
        imageUrl: "https://source.unsplash.com/random/400x300?denim",
        price: 120,
        variants: [
            { size: "S", stock: 8 },
            { size: "M", stock: 12 },
            { size: "L", stock: 6 },
            { size: "XL", stock: 3 },
        ],
    },
];

export default drops;