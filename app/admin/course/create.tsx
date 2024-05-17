import React from "react";
import {
  Create,
  Datagrid,
  List,
  SimpleForm,
  TextField,
  TextInput,
  required,
} from "react-admin";
const CoureseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
      </SimpleForm>
    </Create>
  );
};

export default CoureseCreate;
