// src/validations/registerValidation.js

// Utility: Check if string is a valid email
const isEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Utility: Check password requirements (min 8 chars, at least 1 letter, 1 number)
const isStrongPassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/.test(password);

// Utility: Calculate age from DOB (YYYY-MM-DD)
const getAge = (dob) => {
  if (!dob) return 0;
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

/**
 * Validate registration form data.
 * @param {object} data - The form data.
 * @param {object} [options] - Optional: { existingEmails: [] }
 * @returns {object} errors object (field: errorMessage)
 */
export default function validateRegister(data, options = {}) {
  const errors = {};
  // 1. Full Name
  if (!data.name?.trim()) errors.name = "Full Name is required.";
  // 2. Email
  if (!data.email?.trim()) errors.email = "Email is required.";
  else if (!isEmail(data.email)) errors.email = "Email must be a valid email address.";
  else if (options.existingEmails?.includes(data.email))
    errors.email = "This email is already registered!";
  // 3. Password
  if (!data.password) errors.password = "Password is required.";
  else if (!isStrongPassword(data.password))
    errors.password = "Password must be at least 8 characters and include a letter and number.";
  // 4. Confirm Password
  if (!data.password_confirmation)
    errors.password_confirmation = "Confirm Password is required.";
  else if (data.password !== data.password_confirmation)
    errors.password_confirmation = "Password confirmation does not match!";
  // 5. Date of Birth
  if (!data.dob) errors.dob = "Date of Birth is required.";
  else if (getAge(data.dob) < 15)
    errors.dob = "You must be at least 15 years old to register.";
  // 6. Gender
  if (!data.gender) errors.gender = "Gender is required.";
  // 7. Nationality
  if (!data.nationality?.trim()) errors.nationality = "Nationality is required.";
  // 8. Preferred Course
  if (!data.preferred_course) errors.preferred_course = "Preferred Course is required.";
  // 9. Target Country
  if (!data.target_country?.trim()) errors.target_country = "Target Country is required.";
  // 10. Target Score
  if (!data.target_score?.toString().trim()) errors.target_score = "Target Score is required.";
  // 11. Payment Method
  if (!data.payment_method) errors.payment_method = "Payment Method is required.";
  // 12. Payment Receipt (required unless Handover)
  if (
    ["Bank Payment", "Online Transfer"].includes(data.payment_method) &&
    !data.payment_receipt
  )
    errors.payment_receipt = "Payment Receipt is required.";
  // 13. Contact Number (if present in form)
  if ("contact_number" in data && !data.contact_number?.trim())
    errors.contact_number = "Contact Number is required.";

  return errors;
}
