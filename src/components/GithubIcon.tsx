import React from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ButtonIconProps {
  url: string;
  ariaLabel?: string;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  url,
  ariaLabel = "GitHub",
}) => {
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={ariaLabel}
      className="hover:button-hover-text"
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Github className="h-[1.2rem] w-[1.2rem]" />
      </a>
    </Button>
  );
};
