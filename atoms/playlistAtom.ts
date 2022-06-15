import { atom } from "recoil"

export const playlistState = atom({
  key: "playlistState",
  default: null as any,
})

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "" as string,
})
