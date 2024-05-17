import {
  BooleanInput,
  Create,
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";
const ChallengesOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text" />
        <BooleanInput source="correct" label="Correct option" />
        <ReferenceInput source="challengeId" reference="challenges" />
        <TextInput
          source="imageSrc"
          validate={[required()]}
          label="Image URL"
        />
        <TextInput
          source="audioSrc"
          validate={[required()]}
          label="Audio URL"
        />
      </SimpleForm>
    </Edit>
  );
};

export default ChallengesOptionEdit;
