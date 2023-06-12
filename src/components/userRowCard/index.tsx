import { IconType } from "react-icons";
import { RiUserSettingsFill, RiAdminFill, RiUserFill } from "react-icons/ri";
import * as T from "./types";

export default function UserRowCard({
  user: { name, company, isAdm, isStaff, createdAt },
  toggleEditModal,
}: T.ICompanyRowCardProps) {
  const formatDate = () => {
    var partes = createdAt.toString().split(" ");

    var data = partes[0].split("-");
    var ano = parseInt(data[0]);
    var mes = parseInt(data[1]);
    var dia = parseInt(data[2]);

    var dateObject = new Date(ano, mes - 1, dia);

    var date =
      ("0" + dateObject.getDate()).slice(-2) +
      "/" +
      ("0" + (dateObject.getMonth() + 1)).slice(-2) +
      "/" +
      dateObject.getFullYear();

    return date;
  };

  const type: "staff" | "adm" | "regular" = isStaff
    ? "staff"
    : isAdm
    ? "adm"
    : "regular";

  const TypeIcon: IconType = isStaff
    ? RiUserSettingsFill
    : isAdm
    ? RiAdminFill
    : RiUserFill;

  const createdDate = `criado em ${formatDate()}`;

  return (
    <div
      className="flex items-center justify-between w-full gap-2 px-4 py-2 cursor-pointer min-h-[4rem] max-md:px-2 rounded-2xl bg-zinc-700"
      onClick={toggleEditModal}
    >
      <div className="h-full max-lg:min-w-[25%] w-[15%] max-sm:h-3/4 flex justify-center items-center text-center">
        <h3
          className="max-md:text-[10pt] text-base w-full overflow-hidden text-ellipsis"
          title={name}
        >
          {name}
        </h3>
      </div>

      <div className="px-2 flex flex-col justify-center items-center min-w-[40%] h-full border-x border-zinc-500 overflow-hidden text-center">
        <h3
          className="text-[10pt] w-full overflow-hidden whitespace-nowrap text-ellipsis"
          title={company.name}
        >
          {company.name}
        </h3>
        <TypeIcon
          title={`Usuário ${type}`}
          className={`${
            isStaff ? "text-primary" : isAdm ? "text-secondary" : "text-white"
          }`}
        />
      </div>

      <span className="leading-4 max-lg:text-[7pt] text-center text-sm min-w-[30%] h-full flex items-center justify-center">
        {createdDate}
      </span>
    </div>
  );
}
