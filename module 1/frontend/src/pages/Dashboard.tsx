import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'

type MoodEntry = { id: string, moodValue: number, notes?: string, timestamp: string }
type Exercise = { id: string, title: string, instructions: string, difficulty: string }

export default function Dashboard() {
  const [moodValue, setMoodValue] = useState(5)
  const [notes, setNotes] = useState('')
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])

  async function load() {
    const [moodsRes, exRes] = await Promise.all([
      api.get('/api/mood'),
      api.get('/api/exercises')
    ])
    setEntries(moodsRes.data)
    setExercises(exRes.data)
  }

  useEffect(() => { load() }, [])

  async function submitMood(e: React.FormEvent) {
    e.preventDefault()
    await api.post('/api/mood', { moodValue, notes })
    setNotes('')
    load()
  }

  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Dashboard</h1>
        <button className="text-sm text-red-600" onClick={logout}>Logout</button>
      </div>

      <form onSubmit={submitMood} className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-semibold">Submit Today's Mood</h2>
        <input type="range" min={1} max={10} value={moodValue} onChange={e => setMoodValue(Number(e.target.value))} className="w-full" />
        <div className="text-sm">Mood: {moodValue}</div>
        <textarea className="w-full border p-2 rounded" placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} />
        <button className="bg-blue-600 text-white px-3 py-2 rounded">Save</button>
      </form>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Recent Mood Entries</h2>
          <ul className="space-y-2">
            {entries.slice(0, 10).map(e => (
              <li key={e.id} className="text-sm flex justify-between border-b pb-1">
                <span>{new Date(e.timestamp).toLocaleString()}</span>
                <span className="font-semibold">{e.moodValue}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Recommended Exercises</h2>
          <ul className="space-y-3">
            {exercises.map(ex => (
              <li key={ex.id} className="border p-2 rounded">
                <div className="font-semibold">{ex.title} <span className="text-xs text-gray-500">({ex.difficulty})</span></div>
                <div className="text-sm whitespace-pre-wrap">{ex.instructions}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Chat Support</h2>
        <Link to="/chat/demo" className="text-blue-600">Join Demo Chat</Link>
      </div>
    </div>
  )
}



