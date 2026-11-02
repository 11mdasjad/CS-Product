declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
declare namespace Cloudflare {
  interface Env {
    RESEND_API_KEY?: string;
    RESEND_FROM_EMAIL?: string;
    CMS_PASSWORD?: string;
  }
}
