import AppIcon from "@/components/ui/AppIcon";

export default function TextAndIcons({ data, indexValue }) {
  const baseClasses =
    "group-hover/animation:translate-x-0 group-hover/animation:rotate-0 transition-all duration-300 hover:scale-110";
  const transformClasses = [
    [
      "sm:translate-x-3 sm:rotate-12",
      "sm:-translate-x-3 sm:-rotate-12",
      "sm:-translate-x-9 sm:rotate-12",
    ],
    [
      "sm:translate-x-3 sm:-rotate-12",
      "sm:-translate-x-3 sm:rotate-12",
      "sm:-translate-x-9 sm:-rotate-12",
    ],
  ];
  const activeTransformClasses = transformClasses[indexValue % 2];

  const icons = data.iconData.map((icon, i) => (
    <AppIcon
      key={icon.link}
      href={icon.link}
      src={data.files[i]}
      alt={icon.link}
      tooltip={icon.tooltip}
      className={`${baseClasses} ${
        activeTransformClasses[i % activeTransformClasses.length]
      }`}
    />
  ));
  return (
    <span className="flex flex-col sm:items-center sm:flex-row gap-2 mb-8">
      <h2 className="text-xl sm:text-2xl font-light">
        {data.description && data.description}
      </h2>

      <span className="flex items-center gap-2 group/animation">{icons}</span>
    </span>
  );
}
