"use client";
import { challenges, challengesOptions } from "@/db/schema";
import { headers } from "next/headers";
import { useState } from "react";
import Header from "./header";

type Props = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengesOptions: (typeof challengesOptions.$inferSelect)[];
  })[];
  userSubsription: any; //TODO: replace
};

const Quiz = ({
  initialHearts,
  initialLessonId,
  initialPercentage,
  initialLessonChallenges,
  userSubsription,
}: Props) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubsription?.isActive}
      />
    </>
  );
};

export default Quiz;
