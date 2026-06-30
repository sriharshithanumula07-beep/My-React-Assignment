import StudentCard from './StudentCard.jsx'

// StudentList: takes the array of students plus the delete handler and
// is responsible only for layout/iteration + the empty-state message.
// This is the conditional-rendering piece: register vs. empty page.
function StudentList({ students, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__mark">—</span>
        <p>No students enrolled yet.</p>
        <p className="empty-state__sub">Add the first record using the form on the left.</p>
      </div>
    )
  }

  return (
    <ul className="record-list">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default StudentList
