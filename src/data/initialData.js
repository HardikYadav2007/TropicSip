// Initial Data to show to users

import orangeImg from '../assets/orange_juice.jpg';
import strawberryImg from '../assets/strawberry_juice.jpg';
import kiwiImg from '../assets/kiwi_juice.jpg';
import plumImg from '../assets/plum_juice.jpg';
import mangoImg from '../assets/mango_juice.jpg';
import passionImg from '../assets/passion_juice.jpg';

export const initialProducts = [
    {
        id: "prod_1",
        name: "Sunburst Orange Juice",
        flavor: "Valencia Citrus",
        category: "Citrus",
        pricePerCarton: 1200,
        unitsPerCarton: 24,
        stockCartons: 120,
        minOrderQty: 2,
        description: "100% cold-pressed Valencia orange juice with natural pulp. Rich in Vitamin C and antioxidant goodness.",
        image: orangeImg,
        isPopular: true,
        bgGradient: "linear-gradient(135deg, #FFF3E0, #FFE0B2)"
    },
    {
        id: "prod_2",
        name: "Wild Strawberry Glow",
        flavor: "Sweet Berry",
        category: "Berry",
        pricePerCarton: 1450,
        unitsPerCarton: 24,
        stockCartons: 85,
        minOrderQty: 2,
        description: "Vibrant wild strawberry nectar blended with fresh botanical extracts. Sweet, tangy, and refreshing.",
        image: strawberryImg,
        isPopular: true,
        bgGradient: "linear-gradient(135deg, #FFEBEE, #FFCDD2)"
    },
    {
        id: "prod_3",
        name: "Kiwi Lime Elixir",
        flavor: "Zesty Green",
        category: "Tropical",
        pricePerCarton: 1350,
        unitsPerCarton: 24,
        stockCartons: 15,
        minOrderQty: 3,
        description: "Raw green kiwi puree infused with fresh lime zest. Packed with immunity-boosting nutrients.",
        image: kiwiImg,
        isPopular: false,
        bgGradient: "linear-gradient(135deg, #F1F8E9, #DCEDC8)"
    },
    {
        id: "prod_4",
        name: "Velvet Plum Nectar",
        flavor: "Rich Dark Plum",
        category: "Organic",
        pricePerCarton: 1500,
        unitsPerCarton: 24,
        stockCartons: 60,
        minOrderQty: 2,
        description: "Deep, rich dark plum juice crafted from orchard-ripe black plums. Rich in fibers and iron.",
        image: plumImg,
        isPopular: true,
        bgGradient: "linear-gradient(135deg, #F3E5F5, #E1BEE7)"
    },
    {
        id: "prod_5",
        name: "Tropical Mango Bliss",
        flavor: "Alphonso Mango",
        category: "Tropical",
        pricePerCarton: 1250,
        unitsPerCarton: 24,
        stockCartons: 140,
        minOrderQty: 2,
        description: "Luxurious Alphonso mango nectar. Smooth, velvety sweetness straight from sun-kissed groves.",
        image: mangoImg,
        isPopular: true,
        bgGradient: "linear-gradient(135deg, #FFF8E1, #FFECB3)"
    },
    {
        id: "prod_6",
        name: "Cold-Pressed Passion Fruit",
        flavor: "Exotic Tang",
        category: "Tropical",
        pricePerCarton: 1600,
        unitsPerCarton: 24,
        stockCartons: 40,
        minOrderQty: 3,
        description: "Pure passion fruit nectar with a tart, aromatic punch. Ideal for premium cafes and juice bars.",
        image: passionImg,
        isPopular: false,
        bgGradient: "linear-gradient(135deg, #FFFDE7, #FFF59D)"
    }
];

// ==========================================
// 🗄️ Temporary Database Arrays (Phase 2)
// ==========================================

// 1. Regular Customer / Wholesale Buyer Accounts
export const initialUsers = [
    {
        id: "usr_1",
        name: "Rahul Sharma",
        username: "customer",
        email: "customer@tropicsip.com",
        password: "user123",
        role: "user",
        company: "FreshMart Retail",
        phone: "+91 98765 43210"
    }
];

// 2. Admin Accounts (Single common admin for development as requested)
export const initialAdmins = [
    {
        id: "admin_1",
        name: "TropicSip Admin",
        username: "admin",
        email: "admin@tropicsip.com",
        password: "admin123",
        role: "admin",
        department: "Stock & Inventory Management",
        isSystem: false
    }
];

// 3. Super Admin Accounts
export const initialSuperAdmins = [
    {
        id: "super_1",
        name: "Super Administrator",
        username: "superadmin",
        email: "superadmin@tropicsip.com",
        password: "super123",
        role: "superadmin",
        department: "Executive & Admin Controls",
        isSystem: true
    }
];

// Helper to get all accounts combined for authentication lookup
export const getAllAccounts = () => {
    return [...initialSuperAdmins, ...initialAdmins, ...initialUsers];
};

// Authentication helper
export const authenticateAccount = (identifier, password) => {
    const cleanId = (identifier || "").trim().toLowerCase();
    const cleanPass = (password || "").trim();

    const all = getAllAccounts();
    return all.find(acc =>
        (acc.username.toLowerCase() === cleanId || acc.email.toLowerCase() === cleanId) &&
        acc.password === cleanPass
    ) || null;
};