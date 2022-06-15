import { getProviders, getSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"

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

export async function getServerSideProps(context: any) {
  const providers = await getProviders()
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: { providers },
  }
}
