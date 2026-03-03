import { useState, useRef } from "react";

/**
 * useVoiceInput
 * Lightweight wrapper around the Web Speech API for dictation into text fields.
 * Falls back silently on browsers that don't support it.
 *
 * @param onResult  Called with the transcribed string when speech ends.
 */
export function useVoiceInput(onResult: (text: string) => void) {
  const [listening, setListening] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const isSupported =
    typeof window !== "undefined" &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!(((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition));

  const toggle = () => {
    if (!isSupported) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rec: any = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      const transcript = Array.from(e.results as Iterable<{ 0: { transcript: string } }>)
        .map((r) => r[0].transcript)
        .join(" ");
      onResult(transcript);
    };

    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start();
    recognitionRef.current = rec;
    setListening(true);
  };

  return { listening, toggle, isSupported };
}
