const products = [
    {
        id: 1,
        name: "Limited Edition Sneakers",
        description: "Stylish and comfortable sneakers for everyday wear.",
        price: 120.00,
        imageUrl: "https://example.com/images/sneakers.jpg",
        variants: [
            { size: "7", stock: 10 },
            { size: "8", stock: 5 },
            { size: "9", stock: 0 },
            { size: "10", stock: 8 }
        ],
        category: "Footwear",
        releaseDate: "2023-11-01",
        isFeatured: true
    },
    {
        id: 2,
        name: "Designer Handbag",
        description: "A chic handbag that complements any outfit.",
        price: 250.00,
        imageUrl: "https://example.com/images/handbag.jpg",
        variants: [
            { color: "Black", stock: 3 },
            { color: "Brown", stock: 2 }
        ],
        category: "Accessories",
        releaseDate: "2023-11-15",
        isFeatured: true
    },
    {
        id: 3,
        name: "Classic T-Shirt",
        description: "A comfortable t-shirt made from organic cotton.",
        price: 30.00,
        imageUrl: "https://example.com/images/tshirt.jpg",
        variants: [
            { size: "S", stock: 15 },
            { size: "M", stock: 20 },
            { size: "L", stock: 10 }
        ],
        category: "Apparel",
        releaseDate: "2023-10-20",
        isFeatured: false
    },
    {
        id: 4,
        name: "Stylish Sunglasses",
        description: "Protect your eyes in style with these trendy sunglasses.",
        price: 80.00,
        imageUrl: "https://example.com/images/sunglasses.jpg",
        variants: [
            { color: "Black", stock: 5 },
            { color: "Tortoise", stock: 7 }
        ],
        category: "Accessories",
        releaseDate: "2023-12-01",
        isFeatured: true
    }
];

export default products;