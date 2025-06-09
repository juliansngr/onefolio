export default function ProfileHeader({ data }) {
  return (
    <>
      {/* Me Section */}
      <span className="flex items-center gap-2">
        <h2 className="text-2xl sm:text-4xl font-light">
          Hi, my name is <span className="font-bold">{data.name}</span>
        </h2>
        {/* <Image
              src={data.avatar}
              alt="me"
              width={60}
              height={60}
              className="rounded-full"
            /> */}
      </span>
      {/* Description */}
      <span className="text-md sm:text-lg font-light">
        <p className="mb-8">{data.description}</p>
      </span>
    </>
  );
}
