import { ChevronDownIcon } from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { shuffle } from "lodash"
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistState, playlistIdState } from "../atoms/playlistAtom"
import useSpotify from "../hooks/useSpotify"
import Songs from "./Songs"

const backgroundColors = ["from-red-500", "from-blue-500", "from-green-500", "from-indigo-500", "from-yellow-500", "from-purple-500", "from-pink-500"]

function Content() {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [background, setBackground] = useState<string | undefined>()
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const color = shuffle(backgroundColors).pop()
    setBackground(color)
  }, [playlistId])

  useEffect(() => {
    playlistId.length > 0 &&
      spotifyApi
        .getPlaylist(playlistId)
        .then((playlist) => {
          setPlaylist(playlist.body)
        })
        .catch((error) => {
          console.log(error, "<=== this is error")
        })
  }, [spotifyApi, playlistId])

  const openModalHandler = () => {
    setOpenModal(!openModal)
  }

  return (
    <div className={`flex-grow text-white h-screen overflow-y-auto scrollbar-hide`}>
      <div className={`bg-gradient-to-b ${background} via-black to-black`}>
        <header className="absolute top-4 right-8">
          <div className="flex items-center space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full bg-black py-1 pl-1 pr-2" onClick={openModalHandler}>
            <img className="w-8 h-8 rounded-full" src={`${session?.user?.image}`} alt="User Avatar" />
            <h5 className="font-bold truncate overflow-hidden max-w-[8rem]">{session?.user?.name}</h5>
            <ChevronDownIcon className="w-5 h-5" />
          </div>
          {openModal && (
            <div className="absolute bottom-[-2.2rem] opacity-90 hover:opacity-80 cursor-pointer rounded-md bg-black py-1 w-[100%] flex items-center justify-center" onClick={() => signOut()}>
              <h1>Log Out</h1>
            </div>
          )}
        </header>

        <section className={`pt-20 p-10`}>
          <div className="flex items-end flex-wrap space-x-7 ">
            <img className="w-52 h-52 shadow-2xl" src={playlist?.images?.[0]?.url} alt="" />
            <div className="flex flex-col space-y-4">
              <h1 className="text-2xl md:text-5xl xl:text-8xl font-bold">{playlist?.name}</h1>
              <div className="flex space-x-2 items-center">
                <img className="w-6 h-6 rounded-full" src={`${session?.user?.image}`} alt="User Avatar" />
                <h2>{playlist?.owner?.display_name}</h2>
                <div>▪</div>
                <h2>{playlist?.tracks?.total} songs</h2>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-zinc-900 bg-opacity-50 pt-8">
          <Songs />
        </div>
      </div>
    </div>
  )
}

export default Content
