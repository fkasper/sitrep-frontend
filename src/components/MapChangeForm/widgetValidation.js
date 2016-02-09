import {createValidator, required} from 'utils/validation';

export const colors = ['Blue', 'Fuchsia', 'Green', 'Orange', 'Red', 'Taupe'];

const widgetValidation = createValidator({
  mapLocation: [required],
});
export default widgetValidation;
