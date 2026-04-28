import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import './HelpContact.css';

const faqs = [
  {
    question: "How do I book a guide?",
    answer: "To book a guide, you must first log in as a Customer. Then, navigate to the 'Explore City' page, search for your destination, and browse the available local guides. Click 'View Profile' on a guide you like, and then click 'Book Now'. You can choose your date, time, and party size before proceeding to payment."
  },
  {
    question: "How do payments work?",
    answer: "TravelMithra offers a flexible payment system. When you book a guide, you can choose to pay a 20% advance to secure the booking, or pay the full amount upfront. The remaining balance can be settled directly or through the platform later."
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking through your Customer Dashboard under 'My Bookings'. Cancellation policies vary based on how close you are to the booking date. Please contact support for specific refund inquiries."
  },
  {
    question: "How do I become a guide?",
    answer: "During signup, select 'Guide' as your role. You will need to provide your details, experience, and an hourly rate. Your account will be placed in a 'Pending' state until an Admin reviews and approves your application. Once approved, you will appear in the search results for your city."
  },
  {
    question: "How can I chat with my guide?",
    answer: "Once a guide accepts your booking request, a 'Chat' button will appear next to the booking in your Dashboard. Click it to open a real-time messaging interface where you can discuss meetup details and plans."
  }
];

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="help-contact-container animate-fade-in">
        <div className="help-header glass-panel">
          <h1>How can we help you?</h1>
          <div className="search-bar" style={{ maxWidth: '600px', margin: '2rem auto 0' }}>
            <input 
              type="text" 
              placeholder="Search for articles, questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn-primary">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="faq-section">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-blue)' }}>
            Frequently Asked Questions
          </h2>
          
          <div className="faq-list">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faq-item glass-panel ${openIndex === index ? 'open' : ''}`}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="faq-question">
                    <h3>{faq.question}</h3>
                    {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  {openIndex === index && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>No results found for your search.</p>
            )}
          </div>
        </div>
    </div>
  );
};

export default HelpPage;
