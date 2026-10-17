const { body, param, checkExact, validationResult } = require("express-validator");

// Send validation errors before running the controller.
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Request validation failed.",
      errors: errors.array().map((error) => ({
        field: error.path || "body",
        message: error.msg,
      })),
    });
  }

  next();
};

const validateRegister = [
  body("name").isString().withMessage("Name must be text.").bail()
    .trim().notEmpty().withMessage("Name is required."),
  body("email").isString().withMessage("Email must be text.").bail()
    .trim().isEmail().withMessage("Enter a valid email address."),
  body("password").isString().withMessage("Password must be text.").bail()
    .notEmpty().withMessage("Password is required.")
    .isByteLength({ max: 72 }).withMessage("Password must not exceed 72 bytes."),
  handleValidationErrors,
];

const validateSignin = [
  body("email").isString().withMessage("Email must be text.").bail()
    .trim().isEmail().withMessage("Enter a valid email address."),
  body("password").isString().withMessage("Password must be text.").bail()
    .notEmpty().withMessage("Password is required."),
  handleValidationErrors,
];

const validateProductId = [
  param("id").isMongoId().withMessage("Enter a valid product ID."),
  handleValidationErrors,
];

// Updates only validate the fields provided by the client.
const validateProduct = (isUpdate = false) => {
  const textFields = ["name", "image", "brand", "category", "description"];
  const rules = [];

  for (const field of textFields) {
    const rule = body(field);
    if (isUpdate) rule.optional();
    rules.push(rule.isString().withMessage(`${field} must be text.`).bail()
      .trim().notEmpty().withMessage(`${field} is required.`));
  }

  const priceRule = body("price");
  if (isUpdate) priceRule.optional();
  rules.push(priceRule.isFloat({ min: 0 }).withMessage("Price must be zero or greater."));

  rules.push(
    body("countInStock").optional().isInt({ min: 0 })
      .withMessage("Stock must be a whole number of zero or greater."),
    body("numReviews").optional().isInt({ min: 0 })
      .withMessage("Reviews must be a whole number of zero or greater."),
    body("rating").optional().isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5."),
  );

  // Reject unknown fields, including MongoDB update operators.
  rules.push(checkExact([], {
    locations: ["body"],
    message: "Only known product fields are allowed.",
  }));

  if (isUpdate) {
    rules.push(body().custom((value) => {
      return value !== null && typeof value === "object"
        && !Array.isArray(value) && Object.keys(value).length > 0;
    }).withMessage("Provide at least one product field."));
  }

  rules.push(handleValidationErrors);
  return rules;
};

module.exports = { validateRegister, validateSignin, validateProductId, validateProduct };
