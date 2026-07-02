import { MdMenu, MdSearch, MdKey, MdToggleOff } from "react-icons/md";

function Header() {
  return (
    <nav className="sticky top-0 z-50 px-10 py-4 shadow-md bg-[#F871D1]">
      <div className="flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-4">
          <button className="text-white hover:scale-110 transition">
            <MdMenu size={32} />
          </button>

          <h1 className="text-white text-2xl font-semibold whitespace-nowrap">
            Reko
          </h1>
        </div>

        {/* right */}
        <div className="flex items-center gap-4">
          {/* search */}
          <div className="relative w-60">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white z-20 pointer-events-none" />

            <input
              type="text"
              placeholder="Search dramas..."
              className="
                w-full
                rounded-full
                border-2
                border-white/50
                bg-white/20
                py-1
                pl-10
                pr-4
                text-sm
                text-white
                placeholder-white/80
                outline-none
                backdrop-blur-sm
              "
            />
          </div>

          {/* theme */}
          <button className="text-white hover:scale-110 transition">
            <MdToggleOff size={36} />
          </button>

          {/* admin */}
          <button className="text-white hover:scale-110 transition">
            <MdKey size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
