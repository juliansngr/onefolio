import Image from "next/image";
import Link from "next/link";

export default function AppIcon({ href, src, alt, tooltip, className }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="group/icon relative flex items-center justify-center"
    >
      <div className="hidden group-hover/icon:block absolute -translate-y-12 text-center font-light text-sm bg-neutral-900 text-neutral-100 rounded-full px-2 py-0.5 text-nowrap">
        {tooltip}
      </div>
      <Image
        src={src}
        alt={alt}
        width={50}
        height={50}
        className={`rounded-xl ${className}`}
      />
    </Link>
  );
}
