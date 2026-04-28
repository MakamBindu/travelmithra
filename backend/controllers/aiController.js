const axios = require('axios');

const aiController = {
  getChatResponse: async (req, res) => {
    try {
      const { message } = req.body;
      const API_KEY = process.env.GEMINI_API_KEY;

      // Real AI Integration Placeholder
      if (API_KEY) {
        try {
          // This would be the actual call to Gemini/OpenAI
          // const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, { ... });
          // return res.json({ reply: response.data.candidates[0].content.parts[0].text });
        } catch (apiError) {
          console.error('External AI API Error:', apiError);
        }
      }

      // Production-Grade Smart Fallback
      const lowerMsg = message.toLowerCase();
      let reply = "I'm your TravelMithra assistant! 🌍 How can I help you plan your journey today?";

      const rules = [
        { keys: ['book', 'hire', 'reserve', 'select', 'find', 'choose'], reply: "To find and select a guide, visit the 'Explore' page and switch to the 'Local Guides' tab. You can view their languages, pricing, and expertise before clicking 'Book Now' to select them for your trip!" },
        { keys: ['pay', 'cost', 'price', 'money'], reply: "We support secure payments! You can pay a 20% advance or the full amount via our secure gateway. Check 'My Bookings' for status." },
        { keys: ['hello', 'hi', 'hey'], reply: "Hello! I'm your TravelMithra AI. I can help you find guides, plan itineraries, or answer questions about destinations. What's on your mind?" },
        { keys: ['explore', 'place', 'city', 'recommend'], reply: "Check our 'Explore' page for curated attractions, hotels, and restaurants in cities like Paris and Tokyo!" },
        { keys: ['cancel', 'refund'], reply: "Cancellations are managed in your Dashboard. For refunds, contact our support at support@travelmithra.com." },
        { keys: ['become', 'join', 'register', 'work'], reply: "Want to become a guide? Sign up as a 'Guide', complete your profile, and start earning once our admin team approves your application!" },
        { keys: ['guide'], reply: "We have hundreds of verified local student guides ready to show you around! You can find them on the 'Explore' page under 'Local Guides', or apply to become one by signing up." }
      ];

      const match = rules.find(r => r.keys.some(k => lowerMsg.includes(k)));
      if (match) reply = match.reply;

      res.json({ reply });
    } catch (error) {
      console.error('AI Controller Error:', error);
      res.status(500).json({ message: 'Error generating AI response' });
    }
  }
};

module.exports = aiController;
