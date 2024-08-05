export default function Resena({ resena }) {
  return (
    <article className="flex flex-col bg-agenda-primary opacity-95 rounded text-white p-6 gap-4 text-start">
      <div className="flex justify-between">
        <span className="text-2xl opacity-40 ">0{resena.id}</span>
        <span className="text-2xl opacity-40 ">5&#9733;</span>
      </div>
      <p className="text-pretty ">"{resena.contenido}"</p>
      <div className="flex flex-col gap-2">
        <div className="w-full border-t-2 border-agenda-font-white opacity-40"></div>
        <div className="flex flex-col ">
          <span className="italic font-semibold">{resena.nombre}</span>
          <span className="text-sm opacity-40 italic">en Google</span>
        </div>
      </div>
    </article>
  );
}
