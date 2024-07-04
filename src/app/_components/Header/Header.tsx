import Link from "next/link"

function Header() {
  return (
    <div className="flex justify-center bg-slate-900">
      <Link href={"/"}>
        <p className="cursor-pointer py-6 text-4xl font-black text-slate-100">
          Pokedex
        </p>
      </Link>
    </div>
  )
}

export default Header
