// Operator details come from environment variables. Nothing is invented: unset values stay visible placeholders.
export const OPERATOR_NAME = process.env.NEXT_PUBLIC_OPERATOR_NAME || "";
export const OPERATOR_ADDRESS = process.env.NEXT_PUBLIC_OPERATOR_ADDRESS || "";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION || "";
export const operatorConfigured = Boolean(OPERATOR_NAME && CONTACT_EMAIL);
