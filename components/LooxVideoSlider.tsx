"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { LOOX_VIDEOS, type LooxVideo } from "@/lib/reviews/loox-media";
import { LOOX_STATS } from "@/lib/reviews/reviews";

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function VideoCard({ video }: { video: LooxVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      await el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <article className="group relative min-w-[220px] max-w-[220px] snap-start overflow-hidden rounded-2xl bg-ink text-white sm:min-w-[260px] sm:max-w-[260px]">
      <button
        type="button"
        onClick={toggle}
        className="relative block aspect-[9/16] w-full overflow-hidden"
        aria-label={`${playing ? "Pause" : "Play"} review from ${video.reviewer}`}
      >
        {!playing ? (
          <Image
            src={video.poster}
            alt={video.altText}
            fill
            className="object-cover"
            sizes="260px"
          />
        ) : null}
        <video
          ref={ref}
          src={video.preview}
          poster={video.poster}
          playsInline
          className={`absolute inset-0 h-full w-full object-cover ${playing ? "opacity-100" : "opacity-0"}`}
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        <span className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <span>
            <span className="block text-sm font-semibold">{video.reviewer}</span>
            <span className="text-xs text-white/70">Verified · Loox</span>
          </span>
          <span className="rounded-full bg-yellow px-2 py-1 text-[11px] font-semibold text-ink">
            {playing ? "Pause" : `▶ ${formatDuration(video.videoDuration)}`}
          </span>
        </span>
      </button>
    </article>
  );
}

export function LooxVideoSlider() {
  return (
    <section id="loox-videos" className="scroll-mt-20 bg-ink py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-yellow">
          Loox video reviews · {LOOX_STATS.count} verified
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          Watch real photographers use the mat
        </h2>
        <p className="mt-3 max-w-2xl text-white/65">
          Verified Loox video reviews from the Fail Up Inc. store — same widget
          feed powering the product page.
        </p>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LOOX_VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        <p className="mt-2 text-xs text-white/40">Powered by Loox</p>
      </div>
    </section>
  );
}
