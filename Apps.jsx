import { useMemo, useState } from 'react'
import { cards as initialCards } from './data/cards.js'
import CardGrid from './src/components/CardGrid.jsx'
import Filters from './src/components/Filters.jsx'
import ProgressBar from './src/components/ProgressBar.jsx'
import './App.css'

export default function App() {
  const [cards, setCards] = useState(initialCards)
  const [activeFilter, setActiveFilter] = useState('All cards')
  const [query, setQuery] = useState('')

  const visibleCards = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return cards.filter((card) => {
      const matchesFilter =
        activeFilter === 'All cards' ||
        (activeFilter === 'Collected' && card.owned) ||
        (activeFilter === 'Wishlist' && !card.owned)
      const matchesQuery = [card.artist, card.member, card.album]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)

      return matchesFilter && matchesQuery
    })
  }, [activeFilter, cards, query])

  const ownedCount = cards.filter((card) => card.owned).length

  const toggleOwned = (id) => {
    setCards((currentCards) =>
      currentCards.map((card) => (card.id === id ? { ...card, owned: !card.owned } : card)),
    )
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Bias Binder home">
          <span>BB</span>
          <b>Bias Binder</b>
        </a>
        <p>Collection no. 04 / 2026</p>
        <button className="profile-button" type="button" aria-label="Open collector profile">
          BY
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker">
          <span>Personal archive</span>
          <i />
          <span>Girl group collection</span>
        </div>
        <h1>
          Cards worth
          <em>keeping close.</em>
        </h1>
        <p className="hero-intro">
          A quiet corner for every pull, trade, and card still waiting to find its way home.
        </p>
        <div className="hero-stamp" aria-hidden="true">
          <span>ARCHIVE</span>
          <b>06</b>
          <span>CARDS</span>
        </div>
      </section>

      <section className="collection-section">
        <div className="collection-heading">
          <div>
            <span className="eyebrow">The collection</span>
            <h2>Current binder</h2>
          </div>
          <ProgressBar owned={ownedCount} total={cards.length} />
        </div>

        <Filters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          query={query}
          setQuery={setQuery}
        />
        <CardGrid cards={visibleCards} onToggle={toggleOwned} />
      </section>

      <footer>
        <p>Made for collectors, traders, and lucky pulls.</p>
        <span>Bias Binder / 2026</span>
      </footer>
    </main>
  )
}
