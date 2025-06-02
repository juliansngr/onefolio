import AppIcon from "@/components/ui/AppIcon";

export default function TextAndIcons({ text, iconData, indexValue }) {
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

  const icons = iconData.map((icon, i) => (
    <AppIcon
      key={icon.alt}
      href={icon.link}
      src={icon.image}
      alt={icon.alt}
      tooltip={icon.description}
      className={`${
        activeTransformClasses[i % activeTransformClasses.length]
      } ${baseClasses}`}
    />
  ));
  return (
    <span className="flex flex-col sm:items-center sm:flex-row gap-2 mb-8">
      <h2 className="text-xl sm:text-2xl font-light">{text && text}</h2>

      <span className="flex items-center gap-2 group/animation">
        {icons}
        {/* <AppIcon
          href="https://spotify.juliansngr.dev/"
          src="/images/reactify-icon.webp"
          alt="me"
          tooltip="reactify | music streaming app"
          className="sm:translate-x-3 sm:rotate-12 group-hover/animation:translate-x-0 group-hover/animation:rotate-0 transition-all duration-300 hover:scale-110"
        />
        <AppIcon
          href="https://app.mon-ey.com"
          src="/images/mon-ey-icon.webp"
          alt="mon-ey-icon"
          tooltip="mon-ey | intelligent finance tracker"
          className="sm:-translate-x-3 sm:-rotate-12 group-hover/animation:translate-x-0 group-hover/animation:rotate-0 transition-all duration-300 hover:scale-110"
        />
        <AppIcon
          href="https://leihweise.juliansngr.dev/"
          src="/images/leihweise-icon.webp"
          alt="leihweise-icon"
          tooltip="leihweise | rentable equipment marketplace"
          className="sm:-translate-x-9 sm:rotate-12 group-hover/animation:translate-x-0 group-hover/animation:rotate-0 transition-all duration-300 hover:scale-110"
        /> */}
      </span>
    </span>
  );
}
