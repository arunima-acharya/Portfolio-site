"use client";

interface FolderProps {
  color?: string;
  size?: number;
}

export default function Folder({ color = "#c8c8c8", size = 1 }: FolderProps) {
  const w = 64 * size;
  const h = 52 * size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 64 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Back panel */}
      <rect x="0" y="10" width="64" height="42" rx="6" fill={color} opacity="0.35" />
      {/* Tab */}
      <rect x="0" y="5" width="26" height="10" rx="4" fill={color} opacity="0.55" />
      {/* Front panel */}
      <rect x="0" y="14" width="64" height="38" rx="6" fill={color} opacity="0.9" />
      {/* Shine */}
      <rect x="8" y="20" width="32" height="3" rx="1.5" fill="white" opacity="0.15" />
    </svg>
  );
}
