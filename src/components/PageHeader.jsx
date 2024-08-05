import Reveal from "../utils/Reveal";

export default function PageHeader({
  bgImage = "bg-agenda-hero-img-web",
  Title,
}) {
  return (
    <header
      className={`flex flex-col justify-center items-center gap-1 ${bgImage} text-agenda-font-white w-full bg-no-repeat bg-center bg-cover relative h-[200px] lg:h-[300px]`}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="w-mobile lg:w-dekstop mx-auto relative z-10 ">
        <Reveal className={"w-full mx-auto text-center justify-center"}>
          <h1
            className="font-bold uppercase"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {Title}
          </h1>
        </Reveal>
      </div>
    </header>
  );
}
