"use client";
import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import CourseList from "./course/list";
import CoureseCreate from "./course/create";
import CourseEdit from "./course/edit";
import UnitList from "./unit/list";
import UnitCreate from "./unit/create";
import UnitEdit from "./unit/edit";
import LessonList from "./lesson/list";
import LessonCreate from "./lesson/create";
import LessonEdit from "./lesson/edit";
import ChallengeList from "./challenge/list";
import ChallengeCreate from "./challenge/create";
import ChallengeEdit from "./challenge/edit";
import ChallengesOptionList from "./challengesOption/list";
import ChallengesOptionCreate from "./challengesOption/create";
import ChallengesOptionEdit from "./challengesOption/edit";

const dataProvider = simpleRestProvider("/api");
const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        recordRepresentation="title"
        list={CourseList}
        create={CoureseCreate}
        edit={CourseEdit}
      />
      <Resource
        name="units"
        recordRepresentation="title"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
      />
      <Resource
        name="lessons"
        recordRepresentation="title"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
      />
      <Resource
        name="challenges"
        recordRepresentation="question"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
      />
      <Resource
        name="challengesOptions"
        recordRepresentation="text"
        list={ChallengesOptionList}
        create={ChallengesOptionCreate}
        edit={ChallengesOptionEdit}
        options={{ label: "Challenges Options" }}
      />
    </Admin>
  );
};

export default App;
