import { atom } from "recoil"

export const playlistState = atom({
  key: "playlistState",
  default: null as any,
})

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "3fB6iIXFJUvMJdm04LjsRs" as string,
})
