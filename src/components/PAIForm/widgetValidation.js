import {createValidator, required} from 'utils/validation';

export const colors = ['Blue', 'Fuchsia', 'Green', 'Orange', 'Red', 'Taupe'];

const widgetValidation = createValidator({
  title: [required],
  target: [required],
});
export default widgetValidation;
