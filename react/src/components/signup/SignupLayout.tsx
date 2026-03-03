import { Link } from "react-router-dom";
import kwiltLogoDark from "@/assets/kwilt-logo-dark.png";

interface SignupLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export function SignupLayout({ leftContent, rightContent }: SignupLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel — Linen */}
      <div className="md:w-[42%] bg-card flex flex-col px-10 py-10 md:min-h-screen">
        <Link to="/" className="mb-12">
          <img src={kwiltLogoDark} alt="KWILT" className="h-7 w-auto" />
        </Link>
        <div>
          {leftContent}
        </div>
      </div>

      {/* Right Panel — Mist */}
      <div className="flex-1 bg-background flex flex-col px-8 py-10 md:px-16 md:overflow-y-auto">
        {/* Spacer matching logo height + margin to align titles */}
        <div className="hidden md:block h-[76px] shrink-0" />
        {rightContent}
      </div>
    </div>
  );
}
