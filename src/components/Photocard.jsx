export default function Photocard({ card, onToggle }) {
  return (
    <article className="photocard-wrap">
      <div className="photocard" style={{ '--card-color': card.color, '--card-accent': card.accent }}>
        <div className="card-topline">
          <span>{card.artist}</span>
          <span>{card.year}</span>
        </div>
        <div className="portrait" aria-hidden="true">
          <span className="portrait-ring" />
          <strong>{card.initials}</strong>
          <span className="portrait-star">✦</span>
        </div>
        <div className="card-name">
          <span>{card.member}</span>
          <small>{card.version}</small>
        </div>
      </div>
      <div className="card-caption">
        <div>
          <h3>{card.member}</h3>
          <p>{card.album}</p>
        </div>
        <button
          className={card.owned ? 'owned' : ''}
          onClick={() => onToggle(card.id)}
          type="button"
          aria-label={`${card.owned ? 'Remove' : 'Add'} ${card.member} ${card.album} card ${card.owned ? 'from' : 'to'} collection`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3Z" />
          </svg>
        </button>
      </div>
    </article>
  )
}
