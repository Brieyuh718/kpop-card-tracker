<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../Apps.jsx'
import '../index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
=======
import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const members = ["Bang Chan", "Lee Know", "Changbin", "Hyunjin", "Han", "Felix", "Seungmin", "I.N"];

const comebacks = [
  {
    id: "this-that",
    title: "THIS & THAT",
    subtitle: "10th Mini Album",
    versions: ["THIS", "THAT", "&", "TRUCK", "LP", "FANS"],
  },
];

const fileNames = {
  "Bang Chan": "Bangchan",
  "Lee Know": "Leeknow",
  Changbin: "Changbin",
  Hyunjin: "Hyunjin",
  Han: "Han",
  Felix: "Felix",
  Seungmin: "Seungmin",
  "I.N": "IN",
};

const albumCards = (version, folder) =>
  members.map((member) => ({
    id: `${version.toLowerCase()}-album-${fileNames[member]}`,
    comeback: "this-that",
    version,
    category: "album photocards",
    type: "Album PC",
    member,
    image: `/cards/${folder}/${fileNames[member]}.jpg`,
  }));

const idMembersThis = ["Changbin", "Lee Know", "Han", "Felix", "Seungmin"];
const idMembersThat = [...members];

const idCards = (version, folder, availableMembers) =>
  availableMembers.map((member) => ({
    id: `${version.toLowerCase()}-id-${fileNames[member]}`,
    comeback: "this-that",
    version,
    category: "ID cards",
    type: "ID Card",
    member,
    image: `/cards/${folder}/${fileNames[member]}-ID.jpg`,
    landscape: true,
  }));

const pobCards = members.map((member) => ({
  id: `and-pob-${fileNames[member]}`,
  comeback: "this-that",
  version: "&",
  category: "POB photocards",
  type: "POB",
  member,
  image: `/cards/&/${fileNames[member].toUpperCase()}-POB.jpg`,
}));

const cards = [
  ...albumCards("THIS", "This"),
  ...idCards("THIS", "This", idMembersThis),
  ...albumCards("THAT", "That"),
  ...idCards("THAT", "That", idMembersThat),
  ...albumCards("&", "&"),
  ...pobCards,
  ...members.map((member) => ({
    id: `lp-${fileNames[member]}`,
    comeback: "this-that",
    version: "LP",
    category: "LP photocards",
    type: "LP",
    member,
    image: `/cards/LP/${fileNames[member]}.jpg`,
  })),
  ...members.map((member) => ({
    id: `fans-${fileNames[member]}`,
    comeback: "this-that",
    version: "FANS",
    category: "FANS photocards",
    type: "FANS",
    member,
    image: `/cards/Fans/${fileNames[member]}.jpg`,
  })),
];

function App() {
  const [comeback, setComeback] = useState("this-that");
  const [version, setVersion] = useState("THIS");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [owned, setOwned] = useState(() => JSON.parse(localStorage.getItem("ownedCards") || "[]"));

  useEffect(() => localStorage.setItem("ownedCards", JSON.stringify(owned)), [owned]);

  const currentCards = useMemo(
    () => cards.filter((card) => card.comeback === comeback && card.version === version),
    [comeback, version]
  );

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return currentCards.filter((card) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "owned" ? owned.includes(card.id) : !owned.includes(card.id));
      const matchesSearch = !query || `${card.member} ${card.type} ${card.category}`.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [currentCards, filter, search, owned]);

  const count = cards.filter((card) => card.comeback === comeback && owned.includes(card.id)).length;
  const total = cards.filter((card) => card.comeback === comeback).length;
  const percent = total ? Math.round((count / total) * 100) : 0;

  const toggle = (id) =>
    setOwned((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );

  const activeComeback = comebacks.find((item) => item.id === comeback);

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
          <div className="section-heading">
            <div><p className="eyebrow">group</p><h2>Stray Kids</h2></div>
            <span>2026</span>
          </div>

          <div className="comeback-grid">
            {comebacks.map((item) => (
              <button
                key={item.id}
                className={comeback === item.id ? "comeback active" : "comeback"}
                onClick={() => {
                  setComeback(item.id);
                  setVersion(item.versions[0]);
                  setFilter("all");
                  setSearch("");
                }}
              >
                <span className="cover">{item.title}</span>
                <b>{item.title}</b>
                <small>{item.subtitle}</small>
              </button>
            ))}
            <button className="comeback disabled" disabled>
              <span className="cover placeholder">+</span>
              <b>coming soon</b>
              <small>another comeback</small>
            </button>
          </div>
        </section>

        <section className="collection">
          <div className="section-heading">
            <div><p className="eyebrow">stray kids • 2026</p><h2>{activeComeback.title}</h2></div>
            <span>album collection</span>
          </div>

          <div className="version-tabs">
            {activeComeback.versions.map((item) => (
              <button key={item} className={version === item ? "active" : ""} onClick={() => { setVersion(item); setFilter("all"); setSearch(""); }}>
                {item}<small>VER.</small>
              </button>
            ))}
          </div>

          <div className="tools">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search member or card type..." />
            <div>{["all", "owned", "missing"].map((item) => (
              <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}</button>
            ))}</div>
          </div>

          {visible.length === 0 ? (
            <div className="empty"><span>♡</span><h3>No cards found</h3><p>Try another search or filter.</p></div>
          ) : (
            [...new Set(visible.map((card) => card.category))].map((category) => {
              const categoryCards = visible.filter((card) => card.category === category);
              return (
                <div className="category" key={category}>
                  <h3>{category} <span>{categoryCards.length}</span></h3>
                  <div className="grid">
                    {categoryCards.map((card) => {
                      const isOwned = owned.includes(card.id);
                      return (
                        <button className={`card ${isOwned ? "owned" : "missing"}`} key={card.id} onClick={() => toggle(card.id)}>
                          <div className={`image ${card.landscape ? "landscape" : ""}`}>
                            <img
                              src={card.image}
                              alt={`${card.member} ${card.version} ${card.type}`}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                e.currentTarget.parentElement.classList.add("image-missing");
                              }}
                            />
                          </div>
                          <div className="info">
                            <h4>{card.member}</h4>
                            <p>{card.version} Ver. • {card.type}</p>
                            <strong>{isOwned ? "♥ owned" : "♡ missing"}</strong>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>
      <footer>© 2026 • k-pop card tracker ♡</footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
>>>>>>> 1af340eb5d6e39fef50e970053324cb80fe2b4c9
