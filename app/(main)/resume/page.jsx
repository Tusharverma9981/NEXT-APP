'use client'
import { useState } from 'react'

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    skills: '',
    projects: '',
    experience: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const downloadPDF = async () => {
    const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById('resume-preview')
    html2pdf().from(element).save(`${formData.name || 'resume'}.pdf`)
  }

  return (
    <div className="flex flex-col md:flex-row p-8 gap-8">
      {/* Form Section */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold">Fill Your Details</h2>
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label className="capitalize block font-semibold">{field}</label>
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={field === 'projects' || field === 'experience' ? 3 : 1}
            />
          </div>
        ))}
        <button
          onClick={downloadPDF}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download as PDF
        </button>
      </div>

      {/* Resume Preview Section */}
      <div
        id="resume-preview"
        className="w-full md:w-1/2 p-6 border rounded shadow bg-white"
      >
        <h1 className="text-3xl font-bold text-center">{formData.name}</h1>
        <p className="text-center">{formData.email} | {formData.phone}</p>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <p>{formData.education}</p>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <p>{formData.skills}</p>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">Projects</h2>
          <p>{formData.projects}</p>
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold">Experience</h2>
          <p>{formData.experience}</p>
        </section>
      </div>
    </div>
  )
}
