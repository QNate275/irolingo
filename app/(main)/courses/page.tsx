import { getCourses, getUserProgress } from "@/db/queries";
import React from "react";
import { List } from "./list";
import { userProgress } from "@/db/schema";

const CoursesPage = async () => {
  const coursesData = getCourses();
  const userProgressData = getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className=" h-full max-w-[912px] p-3 mx-auto">
      <h1 className=" text-2xl font-bold text-neutral-700">Language Courses</h1>
      <List courses={courses} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
};

export default CoursesPage;
