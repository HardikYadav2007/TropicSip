// TropicSip - Customers Store (Phase 2 Demo)
// Stores customer profiles registered on the platform

export const initialCustomers = [
    {
        id: "cust_1",
        name: "Rahul Sharma",
        username: "customer",
        email: "customer@tropicsip.com",
        phone: "+91 98765 43210",
        company: "FreshMart Retail & Grocers",
        address: "Shop 12, APMC Fruit Market, Sector 19, Vashi, Navi Mumbai",
        city: "Navi Mumbai",
        state: "Maharashtra",
        pincode: "400703",
        joinDate: "15/10/2026",
        role: "user"
    },
    {
        id: "cust_2",
        name: "Priya Nair",
        username: "priyanair",
        email: "priya@greenorganic.in",
        phone: "+91 98234 56789",
        company: "Green Leaf Organics",
        address: "74 Brigade Road, Near Metro Station, Bangalore",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560025",
        joinDate: "22/10/2026",
        role: "user"
    }
];

// Exactly 2 Demo Farmer Sourcing Applications for Phase 2
export const initialDemoApplications = [
    {
        id: "SUB-1729864200000",
        contractNumber: "TS-729401",
        submittedAt: "2026-10-18T10:30:00.000Z",
        farmerName: "Rahul Sharma",
        email: "customer@tropicsip.com",
        phone: "+91 98765 43210",
        address: "Plot 45, Orange Orchard Valley, Kalmeshwar Road",
        city: "Nagpur",
        state: "Maharashtra",
        pincode: "440001",
        country: "India",
        quantity: 1200,
        fruits: ["Oranges"],
        status: "Approved",
        adminNotes: "Farm audit completed. Quality grade: A+. Doorstep pickup transport scheduled for Friday."
    },
    {
        id: "SUB-1729869900000",
        contractNumber: "TS-382910",
        submittedAt: "2026-10-23T14:20:00.000Z",
        farmerName: "Priya Nair",
        email: "priya@greenorganic.in",
        phone: "+91 98234 56789",
        address: "Farmhouse #12, Nilgiri Hills Agro Valley",
        city: "Ooty",
        state: "Tamil Nadu",
        pincode: "643001",
        country: "India",
        quantity: 850,
        fruits: ["Apples", "Pomegranate"],
        status: "Under Inspection",
        adminNotes: "Agronomist assigned for soil & fruit Brix testing. Awaiting laboratory report."
    }
];

const CUSTOMERS_KEY = "tropicsip_customers_v2";
const LEGACY_CUSTOMERS_KEY = "customers";
const SUBMISSIONS_KEY = "tropicsip_farmer_submissions_v2";

// Retrieve customers list from localStorage or initialize with 2 seed customers
export const getCustomers = () => {
    try {
        const saved = localStorage.getItem(CUSTOMERS_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                // Return only customer details (no nested orders/applications in Phase 2)
                return parsed.map(c => ({
                    id: c.id,
                    name: c.name,
                    username: c.username,
                    email: c.email,
                    phone: c.phone || "",
                    company: c.company || "Wholesale Partner",
                    address: c.address || "",
                    city: c.city || "",
                    state: c.state || "",
                    pincode: c.pincode || "",
                    joinDate: c.joinDate || "Recent",
                    role: c.role || "user"
                }));
            }
        }
    } catch (e) {
        console.error("Error reading customers from localStorage:", e);
    }
    // Seed default 2 customers
    saveCustomers(initialCustomers);
    return initialCustomers;
};

// Save customers array to localStorage
export const saveCustomers = (customersList) => {
    try {
        const cleanList = customersList.map(c => ({
            id: c.id,
            name: c.name,
            username: c.username,
            email: c.email,
            phone: c.phone || "",
            company: c.company || "Wholesale Partner",
            address: c.address || "",
            city: c.city || "",
            state: c.state || "",
            pincode: c.pincode || "",
            joinDate: c.joinDate || new Date().toLocaleDateString(),
            role: c.role || "user"
        }));
        localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(cleanList));
        localStorage.setItem(LEGACY_CUSTOMERS_KEY, JSON.stringify(cleanList));
    } catch (e) {
        console.error("Error saving customers to localStorage:", e);
    }
};

// Find customer by ID, username, or email
export const findCustomer = (identifier) => {
    if (!identifier) return null;
    const clean = String(identifier).trim().toLowerCase();
    const list = getCustomers();
    return list.find(c => 
        (c.id && String(c.id).toLowerCase() === clean) ||
        (c.username && c.username.toLowerCase() === clean) ||
        (c.email && c.email.toLowerCase() === clean)
    ) || null;
};

// Register customer when a new user signs up or logs in
export const registerOrUpdateCustomer = (userData) => {
    if (!userData) return null;
    const list = getCustomers();
    const cleanEmail = (userData.email || "").trim().toLowerCase();
    const cleanUsername = (userData.username || "").trim().toLowerCase();

    const existingIndex = list.findIndex(c => 
        (cleanEmail && c.email?.toLowerCase() === cleanEmail) ||
        (cleanUsername && c.username?.toLowerCase() === cleanUsername)
    );

    if (existingIndex >= 0) {
        // Update details if needed
        const updated = {
            ...list[existingIndex],
            name: userData.name || list[existingIndex].name,
            phone: userData.phone || list[existingIndex].phone,
            company: userData.company || list[existingIndex].company,
            address: userData.address || list[existingIndex].address
        };
        list[existingIndex] = updated;
        saveCustomers(list);
        return updated;
    } else {
        // Create new customer record with only details
        const newCustomer = {
            id: userData.id || `cust_${Date.now()}`,
            name: userData.name || userData.username || "TropicSip Customer",
            username: userData.username || (userData.email ? userData.email.split("@")[0] : `user_${Date.now()}`),
            email: userData.email || "",
            phone: userData.phone || "",
            company: userData.company || "Wholesale Partner",
            address: userData.address || "",
            city: userData.city || "",
            state: userData.state || "",
            pincode: userData.pincode || "",
            joinDate: new Date().toLocaleDateString(),
            role: "user"
        };
        const updatedList = [newCustomer, ...list];
        saveCustomers(updatedList);
        return newCustomer;
    }
};

// Get the 2 demo farmer applications (plus any new submission from this session)
export const getFarmerApplications = () => {
    try {
        const saved = localStorage.getItem(SUBMISSIONS_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.error("Error loading farmer applications:", e);
    }
    // Default to the 2 demo applications
    try {
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(initialDemoApplications));
    } catch (e) {}
    return initialDemoApplications;
};

// Save applications
export const saveFarmerApplications = (apps) => {
    try {
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(apps));
    } catch (e) {
        console.error("Error saving farmer applications:", e);
    }
};

// Add application from SellerForm
export const addCustomerApplication = (identifier, applicationData) => {
    const list = getFarmerApplications();
    const newApp = {
        id: applicationData.id || `SUB-${Date.now()}`,
        contractNumber: applicationData.contractNumber,
        submittedAt: applicationData.submittedAt || new Date().toISOString(),
        farmerName: applicationData.farmerName,
        email: applicationData.email,
        phone: applicationData.phone,
        address: applicationData.address,
        city: applicationData.city,
        state: applicationData.state,
        pincode: applicationData.pincode,
        country: applicationData.country || "India",
        quantity: applicationData.quantity,
        fruits: applicationData.fruits || ["Mixed Fruits"],
        status: applicationData.status || "Pending Review",
        adminNotes: applicationData.adminNotes || "Application submitted. Awaiting document verification."
    };
    const updated = [newApp, ...list];
    saveFarmerApplications(updated);
    return newApp;
};

// Applications for tracking
export const getCustomerApplications = (customerIdentifier) => {
    const apps = getFarmerApplications();
    if (!customerIdentifier) return apps;
    const clean = String(customerIdentifier).trim().toLowerCase();
    return apps.filter(a => 
        a.email?.toLowerCase() === clean || 
        a.contractNumber?.toLowerCase() === clean ||
        (a.phone && a.phone.replace(/\D/g, '') === clean.replace(/\D/g, ''))
    );
};

// Search applications by query
export const findApplicationByQuery = (query) => {
    if (!query) return [];
    const cleanQuery = String(query).trim().toLowerCase();
    const cleanDigits = cleanQuery.replace(/\D/g, '');
    const apps = getFarmerApplications();

    return apps.filter(app => {
        const contractMatch = app.contractNumber && app.contractNumber.toLowerCase().includes(cleanQuery);
        const emailMatch = app.email && app.email.toLowerCase().includes(cleanQuery);
        const nameMatch = app.farmerName && app.farmerName.toLowerCase().includes(cleanQuery);
        const phoneMatch = cleanDigits && app.phone && app.phone.replace(/\D/g, '').includes(cleanDigits);
        return contractMatch || emailMatch || nameMatch || phoneMatch;
    });
};

// Update status in admin demo
export const updateApplicationStatus = (contractNumber, newStatus, adminNotes) => {
    const apps = getFarmerApplications();
    const cleanContract = (contractNumber || "").trim().toUpperCase();
    const idx = apps.findIndex(a => a.contractNumber?.toUpperCase() === cleanContract);
    if (idx >= 0) {
        apps[idx].status = newStatus;
        if (adminNotes !== undefined) {
            apps[idx].adminNotes = adminNotes;
        }
        saveFarmerApplications(apps);
        return true;
    }
    return false;
};

// Add order placeholder (for cart demo)
export const addCustomerOrder = (identifier, orderData) => {
    try {
        const existingAllOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
        existingAllOrders.unshift(orderData);
        localStorage.setItem("allOrders", JSON.stringify(existingAllOrders));
    } catch (e) {}
    return orderData;
};
