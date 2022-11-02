import { helpers } from "@vuelidate/validators";

export const isPhone = helpers.regex(
  /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/
);