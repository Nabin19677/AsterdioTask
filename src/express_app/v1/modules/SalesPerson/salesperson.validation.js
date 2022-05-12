import { check } from "express-validator";
import { catchValidationErrors } from "../../../../utils/validation.js";

export default (validatorName) => {
  let validationChain = [];
  switch (validatorName) {
    default:
      return [];
  }
  return [...validationChain, catchValidationErrors];
};
