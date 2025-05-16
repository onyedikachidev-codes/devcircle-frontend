import { Skill, Job } from "@/common/constants";

const recommendJobs = ({
  currentUser,
  jobs,
}: {
  currentUser: any;
  jobs: Job[];
}): Job[] => {
  const { profile: userProfile } = currentUser;
  const today = new Date();

  return jobs
    ?.map((job) => {
      let score = 0;

      const daysUntilJobDeadline =
        (new Date(job.deadline as string).getTime() - today.getTime()) /
        (1000 * 3600 * 24);
      score += Math.max(0, 10 - daysUntilJobDeadline);

      const skillMatches = job.description
        ?.split(" ")
        .filter((word) =>
          userProfile.skills?.map((skill: Skill) => skill.title).includes(word)
        ).length;
      score += skillMatches * 5;

      if (job.location === userProfile.location) {
        score += 3;
      }

      const recentUpdate =
        (new Date(job.updated_at).getTime() - Date.now()) / (1000 * 3600 * 24);
      if (recentUpdate < 30) {
        score += 2;
      }

      const popularityScore = Math.min(job.views as number, 50) / 5;
      score += popularityScore;

      return { job, score };
    })
    .sort((a, b) => b.score - a.score)
    ?.map((result) => result.job);
};

export default recommendJobs;
