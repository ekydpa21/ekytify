import { ReplyIcon, SwitchHorizontalIcon, VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline"
import { RewindIcon, FastForwardIcon, PlayIcon, PauseIcon, VolumeUpIcon } from "@heroicons/react/solid"
import { debounce } from "lodash"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import useSongInfo from "../hooks/useSongInfo"
import useSpotify from "../hooks/useSpotify"

const Player = () => {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((track) => {
        setCurrentTrackId(track?.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then((playbackState) => {
          setIsPlaying(playbackState?.body?.is_playing)
        })
      })
    }
  }

  const playPauseHandler = () => {
    spotifyApi.getMyCurrentPlaybackState().then((playbackState) => {
      if (playbackState?.body?.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  const reduceVolumeHandler = () => {
    setVolume(volume > 10 ? volume - 10 : volume - volume)
  }
  const raiseVolumeHandler = () => {
    setVolume(volume <= 90 ? volume + 10 : volume + (100 - volume))
  }

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume)
    }, 100),
    []
  )

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackId, spotifyApi, session])

  useEffect(() => {
    if (volume >= 0 && volume <= 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  return (
    <div className="w-full grid grid-cols-3 text-xs md:text-base text-white justify-center items-center py-5 px-4 md:px-10 bg-gradient-to-b from-[#202020] to-[#121212]">
      {/* Left Side */}
      <div className="flex items-center space-x-0 md:space-x-4">
        <img className="hidden md:inline w-12 h-12" src={songInfo?.album?.images?.[0]?.url} alt="" />
        <div className="overflow-hidden max-w-[90%] md:max-w-[100%]">
          <h3 className="whitespace-nowrap truncate">{songInfo?.name}</h3>
          <h3 className="whitespace-nowrap truncate text-sm text-gray-400">{songInfo?.artists?.[0]?.name}</h3>
        </div>
      </div>

      {/* Center */}
      <div className="flex justify-center items-center space-x-4">
        <SwitchHorizontalIcon className="player-button" />
        <RewindIcon className="player-button" />
        {isPlaying ? <PauseIcon className="player-button w-10 h-10" onClick={playPauseHandler} /> : <PlayIcon className="player-button w-10 h-10" onClick={playPauseHandler} />}
        <FastForwardIcon className="player-button" />
        <ReplyIcon className="player-button" />
      </div>

      {/* Right Side */}
      <div className="flex justify-end space-x-2 md:space-x-4">
        <VolumeDownIcon className="player-button  w-5 h-5" onClick={reduceVolumeHandler} />
        <input className="w-12 md:w-28" value={volume} type="range" min={0} max={100} onChange={(e) => setVolume(+e.target.value)} />
        <VolumeUpIcon className="player-button  w-5 h-5" onClick={raiseVolumeHandler} />
      </div>
    </div>
  )
}

export default Player
