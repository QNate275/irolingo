import {
  Create,
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";
const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="question" validate={[required()]} label="Question" />
        <SelectInput
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELCT",
            },
            {
              id: "ASSIST",
              name: "ASSIST",
            },
          ]}
          validate={[required()]}
        />
        <ReferenceInput source="lessonId" reference="lessons" />
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  );
};

export default ChallengeEdit;
