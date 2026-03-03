import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-foreground py-16 text-center">
      <Link
        to="/"
        className="font-heading text-3xl font-semibold tracking-tight text-background"
      >
        KWILT<span className="text-xs align-super">™</span>
      </Link>
      <p className="mt-2 text-xs text-background/60">
        Collect data. Research it. Insights sent to you.
      </p>
    </footer>
  );
}
