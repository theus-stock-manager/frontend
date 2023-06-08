import * as T from "./types";

export default function StaffCard({
  icon: Icon,
  label,
  onAction,
}: T.IStaffCardProps) {
  return (
    <div
      className="border border-white w-48 h-60 rounded-lg flex flex-col justify-center items-center gap-8 cursor-pointer max-sm:h-40 max-sm:gap-4"
      onClick={onAction}
    >
      <Icon className="text-[35pt]" />
      <h3 className="text-3xl">{label}</h3>
    </div>
  );
}
