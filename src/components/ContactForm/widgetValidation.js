import {createValidator, required} from 'utils/validation';

export const colors = ['Blue', 'Fuchsia', 'Green', 'Orange', 'Red', 'Taupe'];

const widgetValidation = createValidator({
  subject: [required],
  message: [required],
});
export default widgetValidation;
