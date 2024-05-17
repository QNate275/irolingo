import {
  BooleanInput,
  Create,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";
const ChallengesOptionCreate = () => {
  return (
    <Create>
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
    </Create>
  );
};

export default ChallengesOptionCreate;
