"use client";

import { useEffect, useRef } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";

const SENSITIVITY = 0.8;

export default function MouseScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevX = useRef<number | null>(null);
  const targetTime = useRef(0);
  const seeking = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onSeeked = () => {
      seeking.current = false;
      // If target has drifted while we were seeking, seek again
      if (Math.abs(video.currentTime - targetTime.current) > 0.01) {
        seeking.current = true;
        video.currentTime = targetTime.current;
      }
    };

    const onMove = (e: MouseEvent) => {
      if (!video.duration) return;
      const currentX = e.clientX;
      if (prevX.current === null) {
        prevX.current = currentX;
        return;
      }
      const delta = currentX - prevX.current;
      prevX.current = currentX;

      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTime.current = Math.min(
        video.duration,
        Math.max(0, targetTime.current + offset)
      );

      if (!seeking.current) {
        seeking.current = true;
        video.currentTime = targetTime.current;
      }
    };

    video.addEventListener("seeked", onSeeked);
    window.addEventListener("mousemove", onMove);

    return () => {
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "70% center",
        pointerEvents: "none",
      }}
    />
  );
}
