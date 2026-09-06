export default function ProgressBar({ owned, total }) {
  const percentage = total ? Math.round((owned / total) * 100) : 0

  return (
    <section className="progress-card" aria-label="Collection progress">
      <div className="progress-copy">
        <span className="eyebrow">Binder progress</span>
        <strong>{percentage}%</strong>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={percentage}
      >
        <span style={{ transform: `scaleX(${percentage / 100})` }} />
      </div>
      <p>
        <b>{owned}</b> collected <i /> {total - owned} still searching
      </p>
    </section>
  )
}
