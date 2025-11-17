import React, { useMemo, useState } from 'react'
import StickFigure from './StickFigure'

const TOKENS = [
  { key: 'mother', label: 'Mother', gender: 'female' },
  { key: 'father', label: 'Father', gender: 'male' },
  { key: 'parent', label: 'Parent', gender: 'neutral' },
  { key: 'brother', label: 'Brother', gender: 'male' },
  { key: 'sister', label: 'Sister', gender: 'female' },
  { key: 'sibling', label: 'Sibling', gender: 'neutral' },
  { key: 'wife', label: 'Wife', gender: 'female' },
  { key: 'husband', label: 'Husband', gender: 'male' },
  { key: 'spouse', label: 'Spouse', gender: 'neutral' },
  { key: 'son', label: 'Son', gender: 'male' },
  { key: 'daughter', label: 'Daughter', gender: 'female' },
  { key: 'child', label: 'Child', gender: 'neutral' },
]

export default function KinshipBuilder() {
  const [steps, setSteps] = useState([])
  const [result, setResult] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const addStep = (key) => setSteps((s) => [...s, key])
  const removeStep = (idx) => setSteps((s) => s.filter((_, i) => i !== idx))
  const reset = () => { setSteps([]); setResult(null) }

  const compute = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/relationship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steps }),
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setResult({ label: 'Error contacting server', explanation: e.message })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        {TOKENS.map(t => (
          <button key={t.key} onClick={() => addStep(t.key)} className="px-3 py-1.5 rounded-full bg-sky-600/20 text-sky-200 hover:bg-sky-600/30 border border-sky-500/30 text-sm">
            {t.label}
          </button>
        ))}
        <button onClick={reset} className="px-3 py-1.5 rounded-full bg-rose-600/20 text-rose-200 hover:bg-rose-600/30 border border-rose-500/30 text-sm">Clear</button>
        <button onClick={compute} className="px-3 py-1.5 rounded-full bg-emerald-600/20 text-emerald-200 hover:bg-emerald-600/30 border border-emerald-500/30 text-sm">What are they to me?</button>
      </div>

      <div className="bg-slate-800/50 border border-sky-500/10 rounded-xl p-4">
        <div className="text-sky-200 text-sm mb-2">Path you selected:</div>
        {steps.length === 0 ? (
          <div className="text-sky-300/70 text-sm">Start by choosing a relation step (e.g., Mother → Mother → Daughter ...)</div>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-300/80">Me</span>
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <span className="text-slate-400">→</span>
                <span className="inline-flex items-center gap-1 bg-slate-900/60 border border-slate-700/60 px-2 py-1 rounded text-xs text-slate-200">
                  {s}
                  <button onClick={() => removeStep(i)} className="text-slate-400 hover:text-rose-400">✕</button>
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {result && (
        <div className="bg-slate-900/60 border border-sky-500/10 rounded-xl p-4">
          <div className="text-2xl font-semibold text-white">{result.label}</div>
          <div className="text-slate-300 mt-1 text-sm">{result.explanation}</div>
        </div>
      )}

      {/* Simple illustrative row of figures: Me, path, target */}
      <div className="bg-slate-800/30 border border-slate-700/40 rounded-xl p-4">
        <div className="text-sky-200 text-sm mb-3">Illustration</div>
        <div className="flex items-center gap-4 overflow-x-auto">
          <StickFigure label="Me" />
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <span className="text-slate-400">→</span>
              <StickFigure label={s} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )}
