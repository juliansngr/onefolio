import Image from "next/image";

export default function ProfileHeader({ data }) {
  return (
    <div className="flex flex-col">
      <span className="flex items-center gap-4">
        <h2 className="text-2xl sm:text-4xl font-light">
          Hi, my name is <span className="font-bold">{data.name}</span>
        </h2>
        <Image
          src={data.files[0]}
          alt="me"
          width={60}
          height={60}
          className="rounded-full object-cover object-center w-[80px] h-[80px]"
        />
      </span>

      <span className="text-md sm:text-lg font-light">
        <p className="whitespace-pre-line">{data.description}</p>
      </span>
    </div>
  );
}
