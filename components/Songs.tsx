import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import { currentTrackIdState } from "../atoms/songAtom"
import Song from "./Song"

function Songs() {
  const playlist = useRecoilValue(playlistState)
  const currentTrackId = useRecoilValue(currentTrackIdState)

  return (
    <div className={`flex flex-col px-8 ${currentTrackId ? "pb-24" : "pb-4"} text-white space-y-1`}>
      {playlist && playlist?.tracks?.items?.map((item: any, index: number) => <Song key={item?.track?.id} track={item} order={index + 1} />)}
    </div>
  )
}

export default Songs
