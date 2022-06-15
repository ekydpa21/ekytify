import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon } from "@heroicons/react/outline"
import { HeartIcon } from "@heroicons/react/solid"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState } from "../atoms/playlistAtom"
import { currentTrackIdState } from "../atoms/songAtom"
import useSpotify from "../hooks/useSpotify"

const Sidebar = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [playlists, setPlaylists] = useState<any[]>([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const currentTrackId = useRecoilValue(currentTrackIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((userPlaylists) => {
        setPlaylists(userPlaylists.body.items)
        setPlaylistId(userPlaylists.body.items[0].id)
      })
    }
  }, [session, spotifyApi])

  const playlistIdHandler = (id: any) => {
    setPlaylistId(id)
  }

  return (
    <div className={`text-gray-500 p-5 ${currentTrackId ? "pb-24" : "pb-4"} hidden md:inline text-sm border-r border-gray-900 overflow-y-auto h-screen scrollbar-hide min-w-[10rem] sm:max-w-[12rem] lg:max-w-[15rem]`}>
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists */}
        {playlists &&
          playlists?.map((playlist: any, index: number) => (
            <p key={`${playlist.name}-${index}`} className={`cursor-pointer hover:text-white font-bold ${playlist.id === playlistId && "text-white"}`} onClick={() => playlistIdHandler(playlist.id)}>
              {playlist.name}
            </p>
          ))}
      </div>
    </div>
  )
}

export default Sidebar
