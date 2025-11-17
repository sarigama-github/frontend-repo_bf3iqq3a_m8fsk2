import KinshipBuilder from './components/KinshipBuilder'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_10%_10%,rgba(56,189,248,.15),transparent_40%),radial-gradient(800px_circle_at_90%_20%,rgba(59,130,246,.12),transparent_40%)] pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Kinship Finder</h1>
          <p className="text-slate-300 mt-2">Build a path through your family tree and instantly learn what that person is to you.</p>
        </header>

        <KinshipBuilder />

        <footer className="mt-16 text-slate-400 text-sm">
          Examples to try: Mother → Mother → Mother → Daughter → Daughter → Daughter. Or Brother → Wife → Brother.
        </footer>
      </div>
    </div>
  )
}

export default App
