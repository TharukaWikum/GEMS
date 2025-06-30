export default function validateStudentForm(data) {
    const errors = {};

    // Full Name
    if (!data.name || !data.name.trim()) {
        errors.name = "Full name is required.";
    } else if (data.name.length < 3) {
        errors.name = "Name must be at least 3 characters.";
    } else if (!/^[A-Za-z\s.]+$/.test(data.name)) {
        errors.name = "Name can only contain letters, spaces, and periods.";
    }

    // Email
    if (!data.email || !data.email.trim()) {
        errors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
        errors.email = "Please enter a valid email address.";
    }

    // Date of Birth
    if (!data.dob) {
        errors.dob = "Date of birth is required.";
    } else {
        const dob = new Date(data.dob);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (age < 10 || age > 100) {
            errors.dob = "Age must be between 10 and 100 years.";
        }
    }

    // Gender
    if (!data.gender) {
        errors.gender = "Gender is required.";
    } else if (!["male", "female"].includes(data.gender.toLowerCase())) {
        errors.gender = "Invalid gender selected.";
    }

    // Nationality
    if (!data.nationality || !data.nationality.trim()) {
        errors.nationality = "Nationality is required.";
    } else if (!/^[A-Za-z\s]+$/.test(data.nationality)) {
        errors.nationality = "Nationality can only contain letters and spaces.";
    }

    // Preferred Course
    if (!data.preferred_course) {
        errors.preferred_course = "Preferred course selection is required.";
    } else if (!["IELTS Academic", "IELTS General"].includes(data.preferred_course)) {
        errors.preferred_course = "Invalid course selected.";
    }

    // Payment Method
    if (!data.payment_method) {
        errors.payment_method = "Payment method is required.";
    } else if (!["Bank Payment", "Online Transfer", "Handover"].includes(data.payment_method)) {
        errors.payment_method = "Invalid payment method selected.";
    }

    // Payment Receipt
    if (!data.payment_receipt) {
        errors.payment_receipt = "Payment receipt must be uploaded.";
    } else if (
        data.payment_receipt instanceof File &&
        !["image/png", "image/jpeg", "application/pdf"].includes(data.payment_receipt.type)
    ) {
        errors.payment_receipt = "Allowed file types: PDF, JPG, PNG.";
    } else if (
        data.payment_receipt instanceof File &&
        data.payment_receipt.size > 2 * 1024 * 1024
    ) {
        errors.payment_receipt = "File size should not exceed 2MB.";
    }

    return errors;
}
