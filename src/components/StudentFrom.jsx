import { useState } from 'react'

// StudentForm: a controlled form that collects Roll Number, Name and Marks.
// It owns its own input state, validates on change AND on submit, then
// hands a clean student object up to the parent via the onAddStudent prop.
function StudentForm({ onAddStudent, existingRollNumbers }) {
  const [rollNumber, setRollNumber] = useState('')
  const [name, setName] = useState('')
  const [marks, setMarks] = useState('')
  const [errors, setErrors] = useState({})

  // --- Input handlers with "live" filtering -------------------------------
  // Roll Number: digits only, nothing else can even be typed in.
  const handleRollNumberChange = (e) => {
    const onlyDigits = e.target.value.replace(/[^0-9]/g, '')
    setRollNumber(onlyDigits)
  }

  // Name: letters and single spaces only — numbers/symbols are blocked
  // at the keystroke level, not just flagged after submit.
  const handleNameChange = (e) => {
    const onlyLetters = e.target.value.replace(/[^A-Za-z\s]/g, '')
    setName(onlyLetters)
  }

  // Marks: digits only (whole numbers, 0-100), typed live as well.
  const handleMarksChange = (e) => {
    const onlyDigits = e.target.value.replace(/[^0-9]/g, '')
    setMarks(onlyDigits)
  }

  const validate = () => {
    const newErrors = {}

    if (!rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required.'
    } else if (existingRollNumbers.includes(rollNumber.trim())) {
      newErrors.rollNumber = 'This roll number already exists.'
    }

    if (!name.trim()) {
      newErrors.name = 'Name is required.'
    } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      newErrors.name = 'Name can only contain letters.'
    }

    if (!marks.trim()) {
      newErrors.marks = 'Marks are required.'
    } else if (Number(marks) < 0 || Number(marks) > 100) {
      newErrors.marks = 'Marks must be between 0 and 100.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) return

    onAddStudent({
      id: crypto.randomUUID(),
      rollNumber: rollNumber.trim(),
      name: name.trim(),
      marks: Number(marks),
    })

    // Reset the form for the next entry.
    setRollNumber('')
    setName('')
    setMarks('')
    setErrors({})
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit} noValidate>
      <div className="entry-form__field">
        <label htmlFor="rollNumber">Roll Number</label>
        <input
          id="rollNumber"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 24"
          value={rollNumber}
          onChange={handleRollNumberChange}
          className={errors.rollNumber ? 'has-error' : ''}
        />
        {errors.rollNumber && <span className="field-error">{errors.rollNumber}</span>}
      </div>

      <div className="entry-form__field">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Ananya Rao"
          value={name}
          onChange={handleNameChange}
          className={errors.name ? 'has-error' : ''}
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="entry-form__field">
        <label htmlFor="marks">Marks (out of 100)</label>
        <input
          id="marks"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 87"
          value={marks}
          onChange={handleMarksChange}
          className={errors.marks ? 'has-error' : ''}
        />
        {errors.marks && <span className="field-error">{errors.marks}</span>}
      </div>

      <button type="submit" className="entry-form__submit">
        + Add Student
      </button>
    </form>
  )
}

export default StudentForm
