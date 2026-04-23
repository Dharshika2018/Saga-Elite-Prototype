// This file manages the logic for gift tier assignments based on order totals.

const giftTiers = [
    { minAmount: 0, maxAmount: 49.99, gift: "Bronze Tier Gift" },
    { minAmount: 50, maxAmount: 99.99, gift: "Silver Tier Gift" },
    { minAmount: 100, maxAmount: 199.99, gift: "Gold Tier Gift" },
    { minAmount: 200, maxAmount: Infinity, gift: "Platinum Tier Gift" },
];

function getGiftTier(orderTotal) {
    for (const tier of giftTiers) {
        if (orderTotal >= tier.minAmount && orderTotal <= tier.maxAmount) {
            return tier.gift;
        }
    }
    return null; // No gift tier applicable
}

// Example usage
const orderTotal = 120; // This would be dynamically set based on the user's order
const assignedGift = getGiftTier(orderTotal);
console.log(`For an order total of $${orderTotal}, the assigned gift is: ${assignedGift}`);