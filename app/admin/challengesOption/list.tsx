import React from "react";
import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  SelectField,
  TextField,
} from "react-admin";
const ChallengesOptionList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="text" />
        <BooleanField source="correct" />
        <ReferenceField source="challengeId" reference="challenges" />
        <TextField source="imageSrc" />
        <TextField source="audioSrc" />
      </Datagrid>
    </List>
  );
};

export default ChallengesOptionList;
