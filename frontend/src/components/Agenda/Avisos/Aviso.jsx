import editIcon from "../../../assets/img/icons/pencil-outline.svg";
import deleteTrashIcon from "../../../assets/img/icons/delete__trash.svg";
import Switch from "react-switch";

export default function Aviso({
  aviso,
  handleStatusChange,
  handleDeleteModal,
  handleEditModal,
}) {
  return (
    <div className="flex justify-between gap-2 mt-4 p-6 rounded-lg border border-agenda-primary border-opacity-40 text-agenda-primary w-full">
      <div className="flex-1 min-w-0">
        <span className="text-xl font-semibold break-words">
          {aviso.titulo}
        </span>
        <p className="text-sm text-gray-600 break-words">{aviso.contenido}</p>

        <p className="text-sm break-words">
          Estado:{" "}
          <span
            className={` ${aviso.isActivo ? "text-green-600" : "text-red-600"}`}
          >
            {aviso.isActivo ? "Activo" : "Inactivo"}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-3 pt-2 items-center">
        <Switch
          onChange={() => handleStatusChange(aviso._id)}
          checked={aviso.isActivo}
          onColor="#324b4c"
          height={18}
          width={36}
        />
        <a onClick={() => handleEditModal(aviso)}>
          <img src={editIcon} width={"25px"} alt="edit icon" />
        </a>
        <a onClick={() => handleDeleteModal(aviso)}>
          <img src={deleteTrashIcon} width={"25px"} alt="delete icon" />
        </a>
      </div>
    </div>
  );
}
