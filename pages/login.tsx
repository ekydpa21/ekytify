import { getProviders, signIn } from "next-auth/react"

function login({ providers }: any) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#121212]">
      <img className="w-56 mb-5" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="Spotify Logo" />

      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button className="bg-[#18D860] text-white p-4 rounded-full" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}
