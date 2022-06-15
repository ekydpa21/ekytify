import type { NextPage } from "next"
import { getSession } from "next-auth/react"
import { useRecoilValue } from "recoil"
import { currentTrackIdState } from "../atoms/songAtom"
import Content from "../components/Content"
import Player from "../components/Player"
import Sidebar from "../components/Sidebar"

const Home: NextPage = () => {
  const currentTrackId = useRecoilValue(currentTrackIdState)

  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Content />
      </main>

      {currentTrackId && (
        <div className="sticky bottom-0">
          <Player />
        </div>
      )}
    </div>
  )
}

export default Home

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
