import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      //db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengesOptions),
      //db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "Spanish", imageSrc: "/es.svg" },
        { title: "Italian", imageSrc: "/it.svg" },
        { title: "Japanese", imageSrc: "/jp.svg" },
      ])
      .returning();

    // For each course, insert units

    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        if (course.title === "Spanish") {
          for (const lesson of lessons) {
            const challenges = await db
              .insert(schema.challenges)
              .values([
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the girl"?',
                  order: 1,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the robot"?',
                  order: 2,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the boy"?',
                  order: 3,
                },
                {
                  lessonId: lesson.id,
                  type: "ASSIST",
                  question: '"the boy"',
                  order: 4,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the girl"?',
                  order: 5,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the robot"?',
                  order: 6,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the zombie"?',
                  order: 7,
                },
                {
                  lessonId: lesson.id,
                  type: "ASSIST",
                  question: '"the zombie"',
                  order: 8,
                },
              ])
              .returning();

            // For each challenge, insert challenge options
            for (const challenge of challenges) {
              if (challenge.order === 1) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el robot",
                    imageSrc: "/robot.svg",
                    audioSrc: "/es/es_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el zombie",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/es/es_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "la nina",
                    imageSrc: "/girl.svg",
                    audioSrc: "/es/es_girl.mp3",
                  },
                ]);
              }

              if (challenge.order === 2) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "el robot",
                    imageSrc: "/robot.svg",
                    audioSrc: "/es/es_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el chico",
                    imageSrc: "/boy.svg",
                    audioSrc: "/es/es_boy.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el zombie",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/es/es_zombie.mp3",
                  },
                ]);
              }

              if (challenge.order === 3) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la nina",
                    imageSrc: "/girl.svg",
                    audioSrc: "/es/es_girl.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el zombie",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/es/es_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "el chico",
                    imageSrc: "/boy.svg",
                    audioSrc: "/es/es_boy.mp3",
                  },
                ]);
              }

              if (challenge.order === 4) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el robot",
                    audioSrc: "/es/es_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "el chico",
                    audioSrc: "/es/es_boy.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el zombie",
                    audioSrc: "/es/es_zombie.mp3",
                  },
                ]);
              }

              if (challenge.order === 5) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el chico",
                    imageSrc: "/boy.svg",
                    audioSrc: "/es/es_boy.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el zombie",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/es/es_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "la nina",
                    imageSrc: "/girl.svg",
                    audioSrc: "/es/es_girl.mp3",
                  },
                ]);
              }

              if (challenge.order === 6) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "el robot",
                    imageSrc: "/robot.svg",
                    audioSrc: "/es/es_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el zombie",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/es/es_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el chico",
                    imageSrc: "/boy.svg",
                    audioSrc: "/es/es_boy.mp3",
                  },
                ]);
              }

              if (challenge.order === 7) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la nina",
                    imageSrc: "/girl.svg",
                    audioSrc: "/es/es_girl.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "el zombie",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/es/es_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el robot",
                    imageSrc: "/robot.svg",
                    audioSrc: "/es/es_robot.mp3",
                  },
                ]);
              }

              if (challenge.order === 8) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "la nina",
                    audioSrc: "/es/es_girl.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "el zombie",
                    audioSrc: "/es/es_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "el chico",
                    audioSrc: "/es/es_boy.mp3",
                  },
                ]);
              }
            }
          }
        }
        if (course.title === "Italian") {
          for (const lesson of lessons) {
            const challenges = await db
              .insert(schema.challenges)
              .values([
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the girl"?',
                  order: 1,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the robot"?',
                  order: 2,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the boy"?',
                  order: 3,
                },
                {
                  lessonId: lesson.id,
                  type: "ASSIST",
                  question: '"the boy"',
                  order: 4,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the girl"?',
                  order: 5,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the robot"?',
                  order: 6,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the zombie"?',
                  order: 7,
                },
                {
                  lessonId: lesson.id,
                  type: "ASSIST",
                  question: '"the zombie"',
                  order: 8,
                },
              ])
              .returning();

            // For each challenge, insert challenge options
            for (const challenge of challenges) {
              if (challenge.order === 1) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "robot",
                    imageSrc: "/robot.svg",
                    audioSrc: "/it/it_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "zombi",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/it/it_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "ragazzo",
                    imageSrc: "/girl.svg",
                    audioSrc: "/it/it_girl.mp3",
                  },
                ]);
              }

              if (challenge.order === 2) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "robot",
                    imageSrc: "/robot.svg",
                    audioSrc: "/it/it_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ragazza",
                    imageSrc: "/boy.svg",
                    audioSrc: "/it/it_boy.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "zombi",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/it/it_zombie.mp3",
                  },
                ]);
              }

              if (challenge.order === 3) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ragazzo",
                    imageSrc: "/girl.svg",
                    audioSrc: "/it/it_girl.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "zombi",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/it/it_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "ragazza",
                    imageSrc: "/boy.svg",
                    audioSrc: "/it/it_boy.mp3",
                  },
                ]);
              }

              if (challenge.order === 4) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "robot",
                    audioSrc: "/it/it_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "ragazza",
                    audioSrc: "/it/it_boy.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "zombi",
                    audioSrc: "/it/it_zombie.mp3",
                  },
                ]);
              }

              if (challenge.order === 5) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ragazza",
                    imageSrc: "/boy.svg",
                    audioSrc: "/it/it_boy.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "zombi",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/it/it_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "ragazzo",
                    imageSrc: "/girl.svg",
                    audioSrc: "/it/it_girl.mp3",
                  },
                ]);
              }

              if (challenge.order === 6) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "robot",
                    imageSrc: "/robot.svg",
                    audioSrc: "/it/it_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "zombi",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/it/it_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ragazza",
                    imageSrc: "/boy.svg",
                    audioSrc: "/it/it_boy.mp3",
                  },
                ]);
              }

              if (challenge.order === 7) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ragazzo",
                    imageSrc: "/girl.svg",
                    audioSrc: "/it/it_girl.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "zombi",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/it/it_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "robot",
                    imageSrc: "/robot.svg",
                    audioSrc: "/it/it_robot.mp3",
                  },
                ]);
              }

              if (challenge.order === 8) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ragazzo",
                    audioSrc: "/it/it_girl.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "zombi",
                    audioSrc: "/it/it_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ragazza",
                    audioSrc: "/it/it_boy.mp3",
                  },
                ]);
              }
            }
          }
        }
        if (course.title === "Japanese") {
          for (const lesson of lessons) {
            const challenges = await db
              .insert(schema.challenges)
              .values([
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the girl"?',
                  order: 1,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the robot"?',
                  order: 2,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the boy"?',
                  order: 3,
                },
                {
                  lessonId: lesson.id,
                  type: "ASSIST",
                  question: '"the boy"',
                  order: 4,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the girl"?',
                  order: 5,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the robot"?',
                  order: 6,
                },
                {
                  lessonId: lesson.id,
                  type: "SELECT",
                  question: 'Which one of these is "the zombie"?',
                  order: 7,
                },
                {
                  lessonId: lesson.id,
                  type: "ASSIST",
                  question: '"the zombie"',
                  order: 8,
                },
              ])
              .returning();

            // For each challenge, insert challenge options
            for (const challenge of challenges) {
              if (challenge.order === 1) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ロボット",
                    imageSrc: "/robot.svg",
                    audioSrc: "/jp/jp_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ゾンビ",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/jp/jp_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "おんなのこ",
                    imageSrc: "/girl.svg",
                    audioSrc: "/jp/jp_girl.mp3",
                  },
                ]);
              }

              if (challenge.order === 2) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "ロボット",
                    imageSrc: "/robot.svg",
                    audioSrc: "/jp/jp_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "おとこのこ",
                    imageSrc: "/boy.svg",
                    audioSrc: "/jp/jp_boy.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ゾンビ",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/jp/jp_zombie.mp3",
                  },
                ]);
              }

              if (challenge.order === 3) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "おんなのこ",
                    imageSrc: "/girl.svg",
                    audioSrc: "/jp/jp_girl.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ゾンビ",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/jp/jp_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "おとこのこ",
                    imageSrc: "/boy.svg",
                    audioSrc: "/jp/jp_boy.mp3",
                  },
                ]);
              }

              if (challenge.order === 4) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ロボット",
                    audioSrc: "/jp/jp_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "おとこのこ",
                    audioSrc: "/jp/jp_boy.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ゾンビ",
                    audioSrc: "/jp/jp_zombie.mp3",
                  },
                ]);
              }

              if (challenge.order === 5) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "おとこのこ",
                    imageSrc: "/boy.svg",
                    audioSrc: "/jp/jp_boy.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ゾンビ",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/jp/jp_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "おんなのこ",
                    imageSrc: "/girl.svg",
                    audioSrc: "/jp/jp_girl.mp3",
                  },
                ]);
              }

              if (challenge.order === 6) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "ロボット",
                    imageSrc: "/robot.svg",
                    audioSrc: "/jp/jp_robot.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ゾンビ",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/jp/jp_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "おとこのこ",
                    imageSrc: "/boy.svg",
                    audioSrc: "/jp/jp_boy.mp3",
                  },
                ]);
              }

              if (challenge.order === 7) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "おんなのこ",
                    imageSrc: "/girl.svg",
                    audioSrc: "/jp/jp_girl.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "ゾンビ",
                    imageSrc: "/zombie.svg",
                    audioSrc: "/jp/jp_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "ロボット",
                    imageSrc: "/robot.svg",
                    audioSrc: "/jp/jp_robot.mp3",
                  },
                ]);
              }

              if (challenge.order === 8) {
                await db.insert(schema.challengesOptions).values([
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "おんなのこ",
                    audioSrc: "/jp/jp_girl.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: true,
                    text: "ゾンビ",
                    audioSrc: "/jp/jp_zombie.mp3",
                  },
                  {
                    challengeId: challenge.id,
                    correct: false,
                    text: "おとこのこ",
                    audioSrc: "/jp/jp_boy.mp3",
                  },
                ]);
              }
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
