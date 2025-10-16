import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from '../lib/api'

type ChatMessage = { sender: string, text: string, timestamp: string }

export default function Chat() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [text, setText] = useState('')
  const clientRef = useRef<any | null>(null)

  useEffect(() => {
    let client: any
    async function start() {
      const SockJS = (await import('sockjs-client')).default
      const Stomp = (await import('stompjs')).default
      const socket = new SockJS(`${API_BASE_URL}/ws/chat`)
      client = Stomp.over(socket)
      clientRef.current = client
      client.connect({}, () => {
        client.subscribe(`/topic/chat/${sessionId}`, (msg: any) => {
          const body = JSON.parse(msg.body)
          setMessages(prev => [...prev, body])
        })
      })
    }
    start()
    return () => { if (client) client.disconnect(() => {}) }
  }, [sessionId])

  function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!clientRef.current || !text.trim()) return
    clientRef.current.send(`/app/chat/${sessionId}`, {}, text)
    setText('')
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Chat Session</h1>
      <div className="bg-white rounded shadow p-4 h-96 overflow-y-auto space-y-2">
        {messages.map((m, idx) => (
          <div key={idx} className="text-sm"><span className="font-semibold">{m.sender}:</span> {m.text}</div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input className="flex-1 border p-2 rounded" value={text} onChange={e => setText(e.target.value)} placeholder="Type your message" />
        <button className="bg-blue-600 text-white px-4 rounded">Send</button>
      </form>
    </div>
  )
}



