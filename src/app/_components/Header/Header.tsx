import Link from "next/link"

function Header() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 flex justify-center bg-slate-900">
      <Link href={"/"}>
        <p className="cursor-pointer py-6 text-4xl font-black text-slate-100 shadow-lg">
          Pokedex
        </p>
      </Link>
    </div>
  )
}

export default Header
