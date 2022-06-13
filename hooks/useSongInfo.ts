import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { currentTrackIdState } from "../atoms/songAtom"
import useSpotify from "./useSpotify"

const useSongInfo = () => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState<any>()

  useEffect(() => {
    const fetchSongInfo = async (id: string) => {
      if (id?.length > 0) {
        const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${id}`, { headers: { Authorization: `Bearer ${spotifyApi.getAccessToken()}` } }).then((res) => res.json())
        setSongInfo(trackInfo)
      }
    }

    fetchSongInfo(currentTrackId)
  }, [currentTrackId, spotifyApi])

  return songInfo
}

export default useSongInfo
