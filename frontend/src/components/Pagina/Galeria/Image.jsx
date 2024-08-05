import Reveal from "../../../utils/Reveal";

export default function Image({ aspect, src }) {
  return (
    <Reveal>
      <img className={`w-full aspect-${aspect} mb-6 object-cover`} src={src} />
    </Reveal>
  );
}
