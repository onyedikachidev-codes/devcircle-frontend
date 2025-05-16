import { Event, Skill } from "@/common/constants";

const recommendEvents = ({
  currentUser,
  events,
}: {
  currentUser: any;
  // attendedEvents: Event[],
  events: Event[];
}): Event[] => {
  const { profile: userProfile } = currentUser;
  const today = new Date();

  return events
    .filter((event) => new Date(event.event_end_date as any) > today)
    .map((event) => {
      let score = 0;

      const daysUntilEvent =
        (new Date(event.event_start_date as any).getTime() - today.getTime()) /
        (1000 * 3600 * 24);
      score += Math.max(0, 10 - daysUntilEvent);

      const skillMatches = userProfile.skills.some((skill: Skill) =>
        event.description?.includes(skill.title)
      );
      if (skillMatches) score += 5;

      if (event.location === userProfile.location) {
        score += 3;
      } else if (!event.location) {
        score += 2;
      }

      // const similarEvent = attendedEvents.some(
      //   (attended) =>
      //     attended.title === event.title ||
      //     attended.description.includes(event.description)
      // );
      // if (similarEvent) score += 4;

      //  Mark event as will attend
      // const popularityScore = Math.min(event.attendees?.length || 0, 100) / 10;
      // score += popularityScore;

      return { event, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((result) => result.event);
};

export default recommendEvents;
