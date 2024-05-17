import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import Quiz from "./quiz";

const LessonPage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();
  const userSubsriptionData = getUserSubscription();
  const [lesson, userProgress, userSubsription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubsriptionData,
  ]);
  if (!lesson || !userProgress) {
    redirect("/learn");
  }
  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubsription}
    ></Quiz>
  );
};

export default LessonPage;
