# TravelMithra

TravelMithra is a student-focused platform that connects local students with travelers looking for authentic and personalized experiences. Many travelers rely on generic online information, which often lacks local insights, while students who know their city well don’t have a proper platform to use their knowledge and earn.

Our solution bridges this gap by allowing students to register as local guides and share details about places, hotels, and restaurants in their city. Travelers can explore different locations, view guide profiles, check their languages, availability, and pricing, and book them easily based on their needs.

The platform also ensures trust through an admin approval system for guides and provides features like booking management, chat, and notifications for smooth interaction. Even with a simple prototype using mock data and simulated payments, the system demonstrates a complete flow from discovery to booking.

Overall, TravelMithra creates a win-win ecosystem where students gain flexible earning opportunities, and travelers enjoy more meaningful, local, and guided experiences.

## Features

- **Local Guide Profiles:** Students can register as guides, showcase their knowledge, and set their availability, pricing, and languages.
- **Discover & Book:** Travelers can search for destinations, apply filters, explore guide profiles, and securely book personalized tours.
- **Admin Approval System:** A dedicated dashboard for administrators to review and approve guide applications, ensuring trust and quality.
- **Real-Time Interaction:** Integrated chat UI and notifications for smooth, direct communication between travelers and guides.
- **AI Assistant Widget:** A global AI assistant to help users navigate the platform and get instant support.
- **Booking Management:** Comprehensive tools for both travelers and guides to manage their upcoming schedules and past trips.

## Tech Stack

- **Frontend:** React.js (Vite), CSS
- **Backend:** Node.js, Express.js
- **Data:** MongoDB (using Mongoose, with data seeding for prototyping)

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- MongoDB (local or Atlas URI)

### Installation & Running Locally

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travelmithra
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file and add your MongoDB connection string if necessary
   npm start
   ```

3. **Frontend Setup**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

The frontend will typically run on `http://localhost:5173` and the backend on the port configured in your environment.
