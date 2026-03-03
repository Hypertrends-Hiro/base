import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationCardType = "action" | "schedule" | "event";

export interface NotificationCardData {
  type: NotificationCardType;
  label: string;
  title: string;
  action: string;
}

const typeStyles: Record<NotificationCardType, string> = {
  action: "text-foreground",
  schedule: "text-foreground",
  event: "text-foreground",
};

const typeBg: Record<NotificationCardType, string> = {
  action: "bg-[#FF816B]",
  schedule: "bg-[#F5F1F0]",
  event: "bg-[#F5C451]",
};

const labelOpacity: Record<NotificationCardType, string> = {
  action: "text-foreground/70",
  schedule: "text-foreground/70",
  event: "text-foreground/70",
};

interface NotificationCardProps {
  card: NotificationCardData;
}

function NotificationCard({ card }: NotificationCardProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col justify-between rounded-2xl p-5",
        typeBg[card.type]
      )}
      style={{ width: 279, height: 167 }}
    >
      <div>
        <p className={cn("text-xs font-medium", labelOpacity[card.type])}>
          {card.label}
        </p>
        <h4 className={cn("mt-1 font-heading text-xl font-medium leading-snug", typeStyles[card.type])}>
          {card.title}
        </h4>
      </div>
      <a
        href="#"
        className={cn(
          "inline-flex items-center gap-0.5 text-sm font-medium",
          typeStyles[card.type]
        )}
      >
        {card.action}
        <ChevronRight className="h-4 w-4" />
      </a>
    </div>
  );
}

interface NotificationCarouselProps {
  cards: NotificationCardData[];
}

export function NotificationCarousel({ cards }: NotificationCarouselProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {cards.map((card, i) => (
        <NotificationCard key={i} card={card} />
      ))}
    </div>
  );
}
