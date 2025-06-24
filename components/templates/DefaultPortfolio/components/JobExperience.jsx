import JobCard from "@/components/ui/JobCard";

export default function JobExperience({ data, indexValue }) {
  const jobCards = data.jobData.map((job, i) => {
    return <JobCard key={i} job={job} />;
  });
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl sm:text-2xl font-medium">{data.title}</h2>
      {jobCards}
    </div>
  );
}
