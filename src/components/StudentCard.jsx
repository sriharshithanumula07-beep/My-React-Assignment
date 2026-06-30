// StudentCard: a "pure" presentational component. It receives a single
// student via props and renders it, plus calls onDelete (also a prop)
// when the remove control is clicked. It holds no state of its own.
function gradeFor(marks) {
  if (marks >= 90) return { label: 'A+', tone: 'grade--top' }
  if (marks >= 75) return { label: 'A', tone: 'grade--good' }
  if (marks >= 60) return { label: 'B', tone: 'grade--mid' }
  if (marks >= 40) return { label: 'C', tone: 'grade--low' }
  return { label: 'F', tone: 'grade--fail' }
}

function StudentCard({ student, onDelete }) {
  const grade = gradeFor(student.marks)

  return (
    <li className="record">
      <div className="record__roll">
        <span className="record__roll-label">Roll</span>
        <span className="record__roll-number">{student.rollNumber}</span>
      </div>

      <div className="record__body">
        <p className="record__name">{student.name}</p>
        <div className="record__meta">
          <span className="record__marks">{student.marks} / 100</span>
          <span className={`record__grade ${grade.tone}`}>{grade.label}</span>
        </div>
      </div>

      <button
        type="button"
        className="record__delete"
        onClick={() => onDelete(student.id)}
        aria-label={`Remove ${student.name}`}
        title="Remove record"
      >
        ✕
      </button>
    </li>
  )
}

export default StudentCard
