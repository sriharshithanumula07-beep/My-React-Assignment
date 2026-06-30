import { useState } from 'react'
import StudentForm from './components/StudentFrom.jsx'
import StudentList from './components/StudentList.jsx'
import StatsBar from './components/StatsBar.jsx'

// App: the single source of truth for the student list. State lives here
// and flows DOWN to children as props (StudentForm, StudentList, StatsBar);
// events flow UP via callback props (onAddStudent, onDelete).
function App() {
  const [students, setStudents] = useState([
    { id: crypto.randomUUID(), rollNumber: '101', name: 'Ananya Rao', marks: 92 },
    { id: crypto.randomUUID(), rollNumber: '102', name: 'Kabir Mehta', marks: 76 },
    { id: crypto.randomUUID(), rollNumber: '103', name: 'Sara Iyer', marks: 58 },
  ])
  const [toast, setToast] = useState(null)

  const handleAddStudent = (student) => {
    setStudents((prev) => [...prev, student])
    setToast(`${student.name} added to the register.`)
    window.clearTimeout(handleAddStudent._t)
    handleAddStudent._t = window.setTimeout(() => setToast(null), 2500)
  }

  const handleDelete = (id) => {
    const removed = students.find((s) => s.id === id)
    setStudents((prev) => prev.filter((s) => s.id !== id))
    if (removed) {
      setToast(`${removed.name} removed.`)
      window.clearTimeout(handleAddStudent._t)
      handleAddStudent._t = window.setTimeout(() => setToast(null), 2500)
    }
  }

  return (
    <div className="page">
      <header className="masthead">
        <p className="masthead__eyebrow">Student Management System</p>
        <h1 className="masthead__title">The Class Register</h1>
        <p className="masthead__sub">
          Enroll students, track their marks, and keep the roll call tidy — all in one place.
        </p>
      </header>

      <main className="layout">
        <section className="panel panel--form">
          <h2 className="panel__title">New Entry</h2>
          <StudentForm
            onAddStudent={handleAddStudent}
            existingRollNumbers={students.map((s) => s.rollNumber)}
          />
        </section>

        <section className="panel panel--list">
          <div className="panel__header">
            <h2 className="panel__title">Enrolled Students</h2>
            <StatsBar students={students} />
          </div>
          <StudentList students={students} onDelete={handleDelete} />
        </section>
      </main>

      {toast && <div className="toast">{toast}</div>}

      <footer className="footer">
        Built with React · useState · props · conditional rendering · form validation
      </footer>
    </div>
  )
}

export default App
