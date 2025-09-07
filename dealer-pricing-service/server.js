const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Sample dealer data
const dealers = [
    { id: 1, name: "TechMart", location: "New York", rating: 4.5 },
    { id: 2, name: "ElectroHub", location: "California", rating: 4.2 },
    { id: 3, name: "GadgetWorld", location: "Texas", rating: 4.7 },
    { id: 4, name: "DigitalStore", location: "Florida", rating: 4.1 },
    { id: 5, name: "TechZone", location: "Washington", rating: 4.6 }
];

// Sample pricing data (dealerId -> productId -> price)
const pricing = {
    1: { // TechMart
        1: 2299.99, // MacBook Pro
        2: 999.99,  // iPhone 15
        3: 899.99,  // Samsung Galaxy S24
        4: 1199.99, // Dell XPS 13
        5: 599.99   // iPad Air
    },
    2: { // ElectroHub
        1: 2199.99,
        2: 979.99,
        3: 879.99,
        4: 1149.99,
        5: 589.99
    },
    3: { // GadgetWorld
        1: 2349.99,
        2: 1019.99,
        3: 919.99,
        4: 1249.99,
        5: 619.99
    },
    4: { // DigitalStore
        1: 2179.99,
        2: 969.99,
        3: 859.99,
        4: 1129.99,
        5: 579.99
    },
    5: { // TechZone
        1: 2249.99,
        2: 989.99,
        3: 889.99,
        4: 1179.99,
        5: 599.99
    }
};

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: "Dealer Pricing Service is running" });
});

// Get all dealers for a specific product
app.get('/dealers/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    console.log(`Getting dealers for product ID: ${productId}`);
    
    // Return dealers that have pricing for this product
    const availableDealers = dealers.filter(dealer => 
        pricing[dealer.id] && pricing[dealer.id][productId]
    );
    
    res.json(availableDealers);
});

// Get price for a specific dealer and product
app.get('/price/:dealerId/:productId', (req, res) => {
    const dealerId = parseInt(req.params.dealerId);
    const productId = parseInt(req.params.productId);
    
    console.log(`Getting price for dealer ${dealerId} and product ${productId}`);
    
    if (pricing[dealerId] && pricing[dealerId][productId]) {
        const dealer = dealers.find(d => d.id === dealerId);
        res.json({
            dealerId: dealerId,
            productId: productId,
            price: pricing[dealerId][productId],
            dealerName: dealer ? dealer.name : 'Unknown',
            dealerLocation: dealer ? dealer.location : 'Unknown'
        });
    } else {
        res.status(404).json({ error: "Price not found for this dealer-product combination" });
    }
});

// Get prices from all dealers for a specific product
app.get('/prices/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    console.log(`Getting all prices for product ID: ${productId}`);
    
    const allPrices = [];
    
    dealers.forEach(dealer => {
        if (pricing[dealer.id] && pricing[dealer.id][productId]) {
            allPrices.push({
                dealerId: dealer.id,
                dealerName: dealer.name,
                dealerLocation: dealer.location,
                price: pricing[dealer.id][productId],
                rating: dealer.rating
            });
        }
    });
    
    // Sort by price (lowest first)
    allPrices.sort((a, b) => a.price - b.price);
    
    res.json(allPrices);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dealer Pricing Service running on port ${PORT}`);
});