"use client";

import { useState } from "react";
import ServiceVideoCard from "./ServiceVideoCard";

export interface VideoCardItem {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  services: string[];
}

interface Props {
  items: VideoCardItem[];
  className?: string;
}

/**
 * Renders a group of ServiceVideoCards where only one video can play at a time.
 * When a new card is activated, the previously playing card automatically pauses.
 */
export default function VideoCardGroup({ items, className }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className={className}>
      {items.map((item) => (
        <ServiceVideoCard
          key={item.id}
          {...item}
          isActive={activeId === item.id}
          onActivate={() => setActiveId(item.id)}
        />
      ))}
    </div>
  );
}
