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
        stockCartons: 15, // Low stock demo!
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

// Default System user ans roles --- No Need till phase 2 ---
// export const initialUsers =[
//     {
//         id: "usr_1",
//         name: "name1",
//         email: "[EMAIL_ADDRESS]",
//         password: "[PASSWORD]",
//         role: "admin",
//         department: "Stock & inventory Management",
//         isSystem: false
//     },
//     {id:"usr_2",name:"name2",email:"[EMAIL_ADDRESS]",password:"[PASSWORD]",role:"admin",department:"Wholesale Order Processing",isSystem:false},
//     {id:"usr_3",name:"name3",email:"[EMAIL_ADDRESS]",password:"[PASSWORD]",role:"admin",department:"Direct Sales & Customer Service",isSystem:false},
//     {id:"usr_4",name:"name4",email:"[EMAIL_ADDRESS]",password:"[PASSWORD]",role:"super_admin",department:"Executive & Admin Controls",isSystem:true},
// ];