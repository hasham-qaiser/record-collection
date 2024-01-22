"use client";
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";
import DiscogRecord from "../../../models/DiscogRecord";
import { fetchAppleMusicId } from "../../../utils/fetchAppleMusicId";

import { Badge } from "./badge";

const { Root, Trigger, Content } = HoverCardPrimitive;

interface HoverCardContentProps {
  className?: string;
  align?: "center" | "start" | "end";
  sideOffset?: number;
  album: DiscogRecord;
}

const HoverCardContent: React.FC<HoverCardContentProps> = ({
  className,
  align = "center",
  sideOffset = 4,
  album,
}) => {
  const { basic_information } = album;
  const { title, artists, genres, year } = basic_information;

  const [appleMusicId, setAppleMusicId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const generateAppleMusicIframeUrl = async () => {
      try {
        const searchTerm = `${title.toLowerCase()} ${artists[0].name.toLowerCase()}`;
        const id = await fetchAppleMusicId(searchTerm);
        setAppleMusicId(id);
      } catch (error) {
        console.error("Error generating Apple Music iframe URL:", error);
        setAppleMusicId(null);
      }
    };

    generateAppleMusicIframeUrl();
  }, [title, artists]);

  return (
    <Content
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
    >
      <h2 className="font-bold text-primary">
        {title} - {artists[0].name}
      </h2>
      <div className="space-x-2 space-y-2">
        {genres.map((genre, index) => (
          <Badge key={index}>{genre}</Badge>
        ))}
      </div>
      <h2 className="font-normal italic text-[#f7ab0a]">{year}</h2>
      <div>
        {appleMusicId && (
          <iframe
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            height="150"
            style={{
              width: "100%",
              overflow: "hidden",
              background: "transparent",
              borderRadius: "15px",
            }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            src={`https://embed.music.apple.com/us/album/${appleMusicId}`}
          ></iframe>
        )}
      </div>
    </Content>
  );
};

export { Root as HoverCard, Trigger as HoverCardTrigger, HoverCardContent };
