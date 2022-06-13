import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import Song from "./Song"

function Songs() {
  const playlist = useRecoilValue(playlistState)

  return <div className="flex flex-col px-8 pb-24 text-white space-y-1">{playlist && playlist?.tracks?.items?.map((item: any, index: number) => <Song key={item?.track?.id} track={item} order={index + 1} />)}</div>
}

export default Songs
