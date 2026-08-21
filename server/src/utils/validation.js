const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeEmail = (value) => String(value || "").trim().toLowerCase();
const isValidEmail = (value) => {
    const email = normalizeEmail(value);
    return email.length <= 254 && EMAIL_PATTERN.test(email);
};
const cleanText = (value, maxLength) => String(value || "").trim().slice(0, maxLength);
const isValidHttpUrl = (value) => {
    try {
        const url = new URL(String(value));
        return ["http:", "https:"].includes(url.protocol);
    } catch (error) {
        return false;
    }
};
const isNonNegativeInteger = (value) => Number.isInteger(Number(value)) && Number(value) >= 0;

module.exports = { normalizeEmail, isValidEmail, cleanText, isValidHttpUrl, isNonNegativeInteger };
