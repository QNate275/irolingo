import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  List,
  SimpleForm,
  TextField,
  TextInput,
  required,
} from "react-admin";
const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="Id" />
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
      </SimpleForm>
    </Edit>
  );
};

export default CourseEdit;
