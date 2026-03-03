import { Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVoiceInput } from "@/hooks/useVoiceInput";

interface VoiceMicButtonProps {
  /** Called with the recognised transcript text */
  onResult: (text: string) => void;
  className?: string;
}

/**
 * VoiceMicButton
 * Drop-in mic button for any assessment textarea.
 * Shows nothing if the browser doesn't support Web Speech API.
 */
export function VoiceMicButton({ onResult, className }: VoiceMicButtonProps) {
  const { listening, toggle, isSupported } = useVoiceInput(onResult);

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      title={listening ? "Stop recording" : "Speak your answer"}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors shrink-0",
        listening
          ? "bg-primary text-primary-foreground animate-pulse"
          : "bg-muted/60 text-foreground/50 hover:bg-muted hover:text-foreground",
        className
      )}
    >
      {listening ? (
        <MicOff className="h-3.5 w-3.5" />
      ) : (
        <Mic className="h-3.5 w-3.5" />
      )}
      {listening ? "Stop" : "Voice"}
    </button>
  );
}
