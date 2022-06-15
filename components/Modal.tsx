import { XIcon } from "@heroicons/react/outline"
import React from "react"

function Modal({ title, message, closeButton }: { title: string; message: string; closeButton: () => void }) {
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold text-black">{title}</h3>

            <button onClick={() => closeButton()}>
              <XIcon className="w-5 h-5 text-black" />
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-slate-500 text-lg leading-relaxed">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
