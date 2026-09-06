import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const members = ["Bang Chan", "Lee Know", "Changbin", "Hyunjin", "Han", "Felix", "Seungmin", "I.N"];
const versions = ["THIS", "THAT", "&", "TRUCK", "LP", "FANS"];

const makeCards = () => {
  const cards = [];
  ["THIS", "THAT"].forEach((version) => {
    const slug = version.toLowerCase();
    members.forEach((member) => {
      const file = member === "Bang Chan" ? "BANGCHAN" : member === "Lee Know" ? "LEEKNOW" : member.toUpperCase().replace("I.N", "IN");
      cards.push({ id: `${slug}-album-${file}`, comeback: "this-that", album: "THIS & THAT", version, type: "Album PC", member, image: `/cards/${slug}/${file}.jpg` });
    });
  });
  return cards;
};

const cards = makeCards();

function App() {
  const [comeback, setComeback] = useState("this-that");
  const [version, setVersion] = useState("THIS");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [owned, setOwned] = useState(() => JSON.parse(localStorage.getItem("ownedCards") || "[]"));

  useEffect(() => localStorage.setItem("ownedCards", JSON.stringify(owned)), [owned]);

  const visible = useMemo(() => cards.filter((card) => {
    const matchesComeback = card.comeback === comeback;
    const matchesVersion = card.version === version;
    const matchesFilter = filter === "all" || (filter === "owned" ? owned.includes(card.id) : !owned.includes(card.id));
    const matchesSearch = `${card.member} ${card.type}`.toLowerCase().includes(search.toLowerCase());
    return matchesComeback && matchesVersion && matchesFilter && matchesSearch;
  }), [comeback, version, filter, search, owned]);

  const total = cards.length;
  const count = owned.filter((id) => cards.some((card) => card.id === id)).length;
  const percent = total ? Math.round((count / total) * 100) : 0;

  const toggle = (id) => setOwned((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">♡ my little collection ♡</p>
        <h1>k-pop card tracker</h1>
        <p>keep track of what you own, what you're missing, and every comeback in your binder.</p>
      </header>

      <section className="dashboard">
        <div className="stat"><strong>{count}</strong><span>owned</span></div>
        <div className="stat"><strong>{total - count}</strong><span>missing</span></div>
        <div className="stat wide"><strong>{percent}%</strong><span>collection complete</span><div className="progress"><i style={{ width: `${percent}%` }} /></div></div>
      </section>

      <main>
        <section className="comebacks">
          <div className="section-heading"><div><p className="eyebrow">group</p><h2>Stray Kids</h2></div><span>2026</span></div>
          <div className="comeback-grid">
            <button className={comeback === "this-that" ? "comeback active" : "comeback"} onClick={() => { setComeback("this-that"); setVersion("THIS"); }}>
              <span className="cover">THIS &amp; THAT</span><b>THIS &amp; THAT</b><small>10th Mini Album</small>
            </button>
            <button className="comeback disabled" disabled><span className="cover placeholder">+</span><b>coming soon</b><small>another comeback</small></button>
          </div>
        </section>

        <section className="collection">
          <div className="section-heading"><div><p className="eyebrow">stray kids • 2026</p><h2>THIS &amp; THAT</h2></div><span>album collection</span></div>
          <div className="version-tabs">{versions.map((item) => <button key={item} className={version === item ? "active" : ""} onClick={() => setVersion(item)}>{item}<small>VER.</small></button>)}</div>

          {version === "&" || version === "TRUCK" || version === "LP" || version === "FANS" ? (
            <div className="empty"><span>♡</span><h3>{version} Ver.</h3><p>Your {version} Ver. cards will live here.</p></div>
          ) : (
            <>
              <div className="tools"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search member..." /><div>{["all", "owned", "missing"].map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
              <div className="category"><h3>album photocards <span>{visible.length}</span></h3><div className="grid">{visible.map((card) => {
                const isOwned = owned.includes(card.id);
                return <button className={`card ${isOwned ? "owned" : "missing"}`} key={card.id} onClick={() => toggle(card.id)}>
                  <div className="image"><img src={card.image} alt={`${card.member} ${card.version} photocard`} onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("image-missing"); }} /><span>♡</span></div>
                  <div className="info"><h4>{card.member}</h4><p>{card.version} Ver. • {card.type}</p><strong>{isOwned ? "♥ owned" : "♡ missing"}</strong></div>
                </button>;
              })}</div></div>
            </>
          )}
        </section>
      </main>
      <footer>© 2026 • k-pop card tracker ♡</footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
