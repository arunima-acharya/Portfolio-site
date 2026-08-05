"use client";

import dynamic from "next/dynamic";
import React from "react";
import type { ToolItem } from "./ImageTrail";

const ImageTrail = dynamic(() => import("@/components/ui/ImageTrail"), { ssr: false });

interface Props {
  variant: number;
  boundary?: React.RefObject<HTMLElement | null>;
  tools?: ToolItem[];
}

export default function ImageTrailWrapper({ variant, boundary, tools }: Props) {
  return <ImageTrail variant={variant} boundary={boundary} tools={tools} />;
}
