/** Node/Vercel environment. The Sites build replaces this module with its binding adapter. */
export const env: {
  DB?: D1Database;
  CMS_PASSWORD?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
} = {
  get CMS_PASSWORD() {
    return process.env.CMS_PASSWORD;
  },
  get RESEND_API_KEY() {
    return process.env.RESEND_API_KEY;
  },
  get RESEND_FROM_EMAIL() {
    return process.env.RESEND_FROM_EMAIL;
  },
};
