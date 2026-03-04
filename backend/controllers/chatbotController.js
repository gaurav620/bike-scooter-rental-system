const Vehicle = require('../models/Vehicle');

// Knowledge base for the chatbot
const knowledgeBase = {
    pricing: {
        keywords: ['price', 'cost', 'rate', 'charge', 'how much', '₹', 'rupee', 'rupees', 'money', 'fee', 'tariff', 'fare'],
        response: `💰 **RideFleet Pricing:**\n\n🛵 **Hourly:** ₹29/hour\n📅 **Daily:** ₹199/day\n📆 **Monthly:** ₹2,499/month\n\n✅ No deposit required!\n✅ Complimentary helmet included!\n✅ Fully electric — zero fuel cost!\n\nWant to book a scooter now? Just go to our Vehicles page! 🚀`
    },
    booking: {
        keywords: ['book', 'rent', 'hire', 'reserve', 'how to book', 'booking', 'rental', 'how do i'],
        response: `📋 **How to Book a Scooter:**\n\n1️⃣ **Sign Up / Login** → Create your free account\n2️⃣ **Browse Vehicles** → Go to the Vehicles page\n3️⃣ **Select a Scooter** → Click "Book Now" on any available scooter\n4️⃣ **Set Date & Duration** → Choose your start time and how long you need it\n5️⃣ **Confirm Booking** → You're all set!\n6️⃣ **Pay Online** → Pay via Razorpay (UPI, Card, Netbanking)\n\n📍 Pick-up & drop-off near JIS College of Engineering, Kalyani.`
    },
    serviceArea: {
        keywords: ['area', 'location', 'where', 'zone', 'kalyani', 'jis', 'jisce', 'coverage', 'address', 'near', 'pickup', 'pick-up', 'drop', 'drop-off'],
        response: `📍 **Service Area:**\n\n🏫 Based near **JIS College of Engineering, Kalyani**\n📍 Address: Kalyani, Nadia, West Bengal — 741235\n🔵 Coverage: **5km radius** from JIS College\n\n**Covered Areas:**\n• JIS College Campus & Gate\n• Kalyani Railway Station\n• Kalyani Bus Stand\n• Kalyani Market\n• Surrounding residential areas\n\n🗺️ Check our **Live Map** to see exact scooter locations!`
    },
    payment: {
        keywords: ['pay', 'payment', 'razorpay', 'upi', 'card', 'netbanking', 'wallet', 'online', 'transaction'],
        response: `💳 **Payment Options:**\n\nWe use **Razorpay** for secure payments:\n\n• 💳 Credit/Debit Cards (Visa, Mastercard, RuPay)\n• 📱 UPI (Google Pay, PhonePe, Paytm)\n• 🏦 Net Banking\n• 💰 Wallets\n\n🔒 All transactions are **100% secure** and encrypted.\n\n**How to Pay:**\n1. Book a scooter\n2. Go to your Dashboard\n3. Click "Pay ₹X" on your booking\n4. Complete payment via Razorpay checkout`
    },
    availability: {
        keywords: ['available', 'free', 'scooter', 'bike', 'vehicle', 'which', 'show', 'list', 'find'],
        response: null, // Dynamic — will be fetched from DB
    },
    hours: {
        keywords: ['hour', 'time', 'open', 'close', 'timing', 'when', 'schedule', 'working'],
        response: `🕐 **Operating Hours:**\n\n⏰ **Available 24/7** — Book anytime!\n\nOur electric scooters are available round the clock. Simply book through the app, pick up your scooter, and ride whenever you want!\n\n📱 Online booking is always open.`
    },
    safety: {
        keywords: ['safe', 'safety', 'helmet', 'insurance', 'accident', 'rules', 'license'],
        response: `🛡️ **Safety & Rules:**\n\n✅ **Free helmet** provided with every ride\n✅ Regular maintenance checks on all scooters\n✅ GPS tracking enabled\n✅ 24/7 roadside assistance\n\n**Requirements:**\n• Valid government ID\n• Must be 18+ years old\n• Valid driving license recommended\n\n**Speed Limit:** 25 km/h (electric scooters)\n🔋 All scooters are fully electric & eco-friendly!`
    },
    contact: {
        keywords: ['contact', 'support', 'help', 'issue', 'problem', 'complaint', 'email', 'phone', 'call'],
        response: `📞 **Contact & Support:**\n\n📧 Email: ridefleet101@gmail.com\n📍 Location: Near JIS College, Kalyani, WB-741235\n\n**Need help?**\n• 🔧 Technical issues → Email us\n• 📋 Booking problems → Check your Dashboard\n• 💳 Payment issues → Contact via email\n\nWe typically respond within 1-2 hours! 💬`
    },
    greeting: {
        keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'hii', 'hola', 'namaste'],
        response: `👋 **Hello! Welcome to RideFleet!**\n\nI'm your virtual assistant. I can help you with:\n\n🛵 **Scooter Availability** — Check what's available\n💰 **Pricing** — ₹29/hour, ₹199/day\n📋 **Booking Help** — How to book a ride\n📍 **Service Area** — Where we operate\n💳 **Payments** — Payment options\n🛡️ **Safety** — Rules & guidelines\n📞 **Contact** — Get in touch\n\nJust type your question! 😊`
    },
    thanks: {
        keywords: ['thank', 'thanks', 'bye', 'goodbye', 'see you', 'take care', 'great', 'awesome', 'nice'],
        response: `😊 **You're welcome!**\n\nHappy to help! Have a great ride with RideFleet! 🛵💨\n\nIf you need anything else, just type your question. Ride safe! 🚀`
    }
};

// Find matching category from user message
const findCategory = (message) => {
    const lowerMsg = message.toLowerCase().trim();

    for (const [category, data] of Object.entries(knowledgeBase)) {
        for (const keyword of data.keywords) {
            if (lowerMsg.includes(keyword)) {
                return category;
            }
        }
    }
    return null;
};

// Get dynamic availability response
const getAvailabilityResponse = async () => {
    try {
        const available = await Vehicle.find({ status: 'available' });
        const inUse = await Vehicle.find({ status: 'in-use' });
        const total = await Vehicle.countDocuments();

        if (available.length === 0) {
            return `🛵 **Scooter Availability:**\n\nSorry, all scooters are currently in use!\n\n📊 Total fleet: ${total} vehicles\n🔴 All ${inUse.length} currently booked\n\nCheck back soon or visit the **Vehicles page** for real-time updates! 🔄`;
        }

        let vehicleList = available.map(v =>
            `• **${v.model}** (${v.type}) — 🔋 ${v.battery}% | 📍 ${v.location}`
        ).join('\n');

        return `🛵 **Scooter Availability:**\n\n🟢 **${available.length}** available right now!\n🔴 **${inUse.length}** currently in use\n📊 Total fleet: **${total}** vehicles\n\n**Available Now:**\n${vehicleList}\n\n👉 Visit the **Vehicles page** to book one! 🚀`;
    } catch (err) {
        return `🛵 We have scooters available near JIS College, Kalyani! Visit the **Vehicles page** to see what's available right now. 🚀`;
    }
};

// Default fallback response
const fallbackResponse = `🤔 I'm not sure I understand that. Here's what I can help you with:\n\n• Type **"pricing"** → See rental rates\n• Type **"book"** → Learn how to book\n• Type **"available"** → Check scooter availability\n• Type **"area"** → See our service area\n• Type **"payment"** → Payment options\n• Type **"safety"** → Safety guidelines\n• Type **"contact"** → Get support\n\nOr ask me anything about RideFleet! 😊`;

// Main chat handler
const handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim() === '') {
            return res.json({
                reply: `👋 Hi there! I'm RideFleet's assistant. How can I help you today?\n\nTry asking about **pricing**, **booking**, or **availability**! 🛵`
            });
        }

        const category = findCategory(message);

        if (!category) {
            return res.json({ reply: fallbackResponse });
        }

        // Handle dynamic availability
        if (category === 'availability') {
            const reply = await getAvailabilityResponse();
            return res.json({ reply });
        }

        // Return static response
        return res.json({ reply: knowledgeBase[category].response });
    } catch (err) {
        console.error('Chatbot error:', err);
        return res.json({
            reply: `😅 Oops! Something went wrong. Please try again or email us at ridefleet101@gmail.com for help.`
        });
    }
};

module.exports = { handleChat };
