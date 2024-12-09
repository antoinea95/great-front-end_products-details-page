import { Header } from "./components/Header/Header"

function App() {

  return (
    <main className="max-w-[1280px] w-screen h-screen max-h-dvh m-auto grid grid-cols-4 gap-x-4 sm:grid-cols-6 sm:gap-x-8 lg:grid-cols-12 py-8 px-4 sm:px-8">
      <Header />
    </main>
  )
}

export default App
