import { SyncLoader } from "react-spinners";

export default function MainLoader() {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <SyncLoader color="#324b4c" />
      </div>
    </div>
  );
}
