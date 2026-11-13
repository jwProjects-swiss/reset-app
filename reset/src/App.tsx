import { useState } from 'react'
import { ChallengeFlow } from './components/ChallengeFlow'
import { TabBar, type Tab } from './components/TabBar'
import { pickChallenge } from './lib/picker'
import { useStore } from './lib/store'
import { Home } from './screens/Home'
import { Settings } from './screens/Settings'
import { Stats } from './screens/Stats'
import type { ActiveChallenge } from './types'

export default function App() {
  const { state } = useStore()
  const [tab, setTab] = useState<Tab>('home')
  const [challenge, setChallenge] = useState<ActiveChallenge | null>(null)

  return (
    <div className="mx-auto flex h-full max-w-md flex-col">
      <main className="min-h-0 flex-1">
        {tab === 'home' && <Home onReset={() => setChallenge(pickChallenge(state))} />}
        {tab === 'stats' && <Stats />}
        {tab === 'settings' && <Settings />}
      </main>

      <TabBar tab={tab} onChange={setTab} />

      {challenge && <ChallengeFlow first={challenge} onClose={() => setChallenge(null)} />}
    </div>
  )
}
