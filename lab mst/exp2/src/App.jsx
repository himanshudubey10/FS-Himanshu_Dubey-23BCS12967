import React, { useState } from 'react';
import './App.css'; 

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: ''
  });

  const [submissions, setSubmissions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.course) {
      setSubmissions(prev => [...prev, formData]);
      setFormData({ name: '', email: '', course: '' });
    }
  };

  return (
    <div className="form-container">
      <h2>Course Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {submissions.length > 0 && (
        <div className="submissions">
          <h3>Submissions</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
