import Photocard from './Photocard.jsx'

export default function CardGrid({ cards, onToggle }) {
  if (!cards.length) {
    return (
      <div className="empty-state">
        <span>✦</span>
        <h2>No cards found</h2>
        <p>Try a different artist, member, or collection filter.</p>
      </div>
    )
  }

  return (
    <div className="card-grid">
      {cards.map((card, index) => (
        <div className="card-entry" style={{ '--delay': `${index * 70}ms` }} key={card.id}>
          <Photocard card={card} onToggle={onToggle} />
        </div>
      ))}
    </div>
  )
}
