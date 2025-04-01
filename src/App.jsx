import V from './button'

export default function App() {
  return (
    <>
      <main className="h-vh supports-(height:100dvh):h-dvh flex flex-col items-center justify-center p-8">
        <header className="text-balance text-center w-full max-w-3xl">
          <h1 className="text-4xl tracking-tighter max-lg:font-medium sm:text-5xl lg:text-6xl xl:text-8xl">
            Welcome to AnyApp!
          </h1>

          <p className="text-neutral-800 dark:text-neutral-200 mt-4.5 text-md">
            Get started by editing{' '}
            <small className="font-mono bg-neutral-500/10 radius-sm px-1 py-2px text-neutral-950 font-medium dark:text-neutral-50">
              src/App.jsx
            </small>
          </p>
        </header>

        <section className="flex gap-1 items-center mt-6.5">
          <a href="https://github.com/nousantx/anyframe-vite-react-template" className="btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              {/* Icon from Iconoir by Luca Burgio - https://github.com/iconoir-icons/iconoir/blob/main/LICENSE */}
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" />
                <path d="M14.333 19v-1.863c.025-.31-.018-.62-.126-.913a2.2 2.2 0 0 0-.5-.781c2.093-.227 4.293-1 4.293-4.544a3.48 3.48 0 0 0-1-2.434a3.2 3.2 0 0 0-.06-2.448s-.787-.227-2.607.961a9.15 9.15 0 0 0-4.666 0c-1.82-1.188-2.607-.96-2.607-.96A3.2 3.2 0 0 0 7 8.464a3.48 3.48 0 0 0-1 2.453c0 3.519 2.2 4.291 4.293 4.544a2.2 2.2 0 0 0-.496.773a2.1 2.1 0 0 0-.13.902V19" />
                <path d="M9.667 17.702c-2 .631-3.667 0-4.667-1.948" />
              </g>
            </svg>
          </a>
          <V />
          <a href="https://github.com/anyframe-org/css" className="btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              {/* Icon from Iconoir by Luca Burgio - https://github.com/iconoir-icons/iconoir/blob/main/LICENSE */}
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
                <path d="M5 19.5V5a2 2 0 0 1 2-2h11.4a.6.6 0 0 1 .6.6V21M9 7h6m-8.5 8H19M6.5 18H19M6.5 21H19" />
                <path
                  stroke-linejoin="round"
                  d="M6.5 18c-1 0-1.5-.672-1.5-1.5S5.5 15 6.5 15m0 6c-1 0-1.5-.672-1.5-1.5S5.5 18 6.5 18"
                />
              </g>
            </svg>
          </a>
        </section>
      </main>
      <footer className="p-8 text-center border-y border-neutral-500/30 mb-8 text-xs">
        &copy; {new Date().getFullYear()} AnyOne
      </footer>
    </>
  )
}
