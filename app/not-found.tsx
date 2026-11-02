import Link from "@/components/site/link";
export default function NotFound() {
  return (
    <section className="empty-state not-found">
      <span className="eyebrow">404 / A DIFFERENT DIRECTION</span>
      <h1>
        Let’s get you
        <br />
        <em>back on track.</em>
      </h1>
      <p>The page you are looking for could not be found.</p>
      <Link href="/" className="button">
        Return to the homepage ↗
      </Link>
    </section>
  );
}
