import React, { useState, useEffect } from "react";
import cards from "./cardsData";

function App() {
  // Load saved cards if they exist
  const [owned, setOwned] = useState(() => {
    const saved = localStorage.getItem("ownedCards");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever 'owned' changes
  useEffect(() => {
    localStorage.setItem("ownedCards", JSON.stringify(owned));
  }, [owned]);

  const toggleCard = (id) => {
    setOwned((prev) =>
      prev.includes(id) ? prev.filter((card) => card !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>K-pop Photocard Tracker</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {cards.map((card) => (
          <div key={card.id} style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
            <img src={card.image} alt={card.member} width="120" />
            <p>{card.member} ({card.version})</p>
            <button onClick={() => toggleCard(card.id)}>
              {owned.includes(card.id) ? "✅ Owned" : "❌ Missing"}
            </button>
          </div>
        ))}
      </div>

      <h2>Missing Cards</h2>
      <ul>
        {cards
          .filter((card) => !owned.includes(card.id))
          .map((card) => (
            <li key={card.id}>{card.member} ({card.album} – {card.version})</li>
          ))}
      </ul>
    </div>
  );
}

export default App;
