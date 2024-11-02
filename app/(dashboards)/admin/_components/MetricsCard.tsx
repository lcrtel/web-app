import { HiArrowRight } from "react-icons/hi";

const MetricsCard = ({
  count,
  label,
}: {
  count: number | undefined;
  label: string;
}) => {
  return (
    <div className="space-y-2 rounded-xl border bg-slate-50 p-4 transition-all duration-300 ease-in hover:shadow-lg active:scale-[95%] md:p-5">
      <h3 className="flex items-center justify-between text-sm font-medium tracking-tight text-gray-400">
        {label} <HiArrowRight className="" />
      </h3>
      <p className="text-3xl font-bold tracking-tight">{count}</p>
    </div>
  );
};

export default MetricsCard;
