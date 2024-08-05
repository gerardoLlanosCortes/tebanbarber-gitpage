import { ClipLoader } from "react-spinners";

export default function ActionLoader() {
  return (
    <div className="loader-spinner-overlay">
      <div className="loader-spinner">
        <ClipLoader color="#324b4c" />
      </div>
    </div>
  );
}
