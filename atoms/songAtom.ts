import { atom } from "recoil"

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: null as any,
})

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false as boolean,
})
