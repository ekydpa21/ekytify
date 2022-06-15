import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import useSpotify from "../hooks/useSpotify"
import { timeFormatter } from "../lib/timeFormatter"

function Song({ order, track }: any) {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = async () => {
    if (spotifyApi.getAccessToken()) {
      await spotifyApi.play({ uris: [track.track.uri] })
      setCurrentTrackId(track.track.id)
      setIsPlaying(true)
    }
  }

  return (
    <div className="grid grid-cols-2 text-gray-400 py-2 px-5 hover:bg-[#b3b3b3]/10 hover:text-white rounded-lg cursor-pointer" onClick={playSong}>
      <div className="flex items-center space-x-4">
        <p className="text-lg">{order}</p>
        <img className="w-10 h-10" src={`${track?.track?.album?.images?.[0]?.url}`} alt="Album's Cover" />
        <div>
          <p className="w-36 lg:w-96 truncate overflow-hidden text-white">{track.track.name}</p>
          <p className="w-36 lg:w-96 truncate overflow-hidden">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline w-40">{track?.track?.album?.name}</p>
        <p className="">{timeFormatter(track?.track?.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
