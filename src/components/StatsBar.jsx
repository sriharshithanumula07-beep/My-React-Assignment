// StatsBar: small derived-data component. Receives the students array and
// computes simple class statistics from it. Demonstrates that props can be
// plain data and a component can derive its own view from it.
function StatsBar({ students }) {
  const count = students.length
  const average = count
    ? (students.reduce((sum, s) => sum + s.marks, 0) / count).toFixed(1)
    : '0.0'
  const topper = count
    ? students.reduce((top, s) => (s.marks > top.marks ? s : top), students[0])
    : null

  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat__value">{count}</span>
        <span className="stat__label">Enrolled</span>
      </div>
      <div className="stat">
        <span className="stat__value">{average}</span>
        <span className="stat__label">Class Average</span>
      </div>
      <div className="stat">
        <span className="stat__value">{topper ? topper.name.split(' ')[0] : '—'}</span>
        <span className="stat__label">Topper</span>
      </div>
    </div>
  )
}

export default StatsBar
