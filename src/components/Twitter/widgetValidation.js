import {createValidator, required} from 'utils/validation';

const widgetValidation = createValidator({
  twitterName: [required],
});
export default widgetValidation;
