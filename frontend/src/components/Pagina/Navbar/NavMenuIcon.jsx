export default function NavMenuIcon({ open }) {
  return (
    <div>
      <button className="relative group">
        <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all duration-200 ">
          <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
            <div
              className={`bg-agenda-primary h-[2px] w-7 transform transition-all duration-300 origin-left ${
                open ? "translate-x-10 opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`bg-agenda-primary h-[2px] w-7 rounded transform transition-all duration-300 ${
                open
                  ? "translate-x-10 opacity-0 delay-75"
                  : "opacity-100 delay-75"
              }`}
            ></div>
            <div
              className={`bg-agenda-primary h-[2px] w-7 transform transition-all duration-300 origin-left ${
                open
                  ? "translate-x-10 opacity-0 delay-150"
                  : "opacity-100 delay-150"
              }`}
            ></div>

            <div
              className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 ${
                open ? "translate-x-0" : "-translate-x-10"
              } flex w-0 ${open ? "w-12" : "w-0"}`}
            >
              <div
                className={`absolute bg-agenda-primary h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 ${
                  open ? "rotate-45" : "rotate-0"
                }`}
              ></div>
              <div
                className={`absolute bg-agenda-primary h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 ${
                  open ? "-rotate-45" : "rotate-0"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
