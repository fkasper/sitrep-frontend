import {createValidator, required, email} from 'utils/validation';

export const colors = ['Blue', 'Fuchsia', 'Green', 'Orange', 'Red', 'Taupe'];

const widgetValidation = createValidator({
  name: [required],
  email: [required, email],
  rank: [required],
  unit: [required],
  encryptedPassword: [required],
});
export default widgetValidation;
