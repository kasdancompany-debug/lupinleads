"use client";

import Image from "next/image";
import { SlideIn } from "@/components/motion/SlideIn";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionShell } from "@/components/motion/SectionShell";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { GrowthPattern } from "@/components/ui/GrowthPattern";
import { BookCallButton } from "@/components/marketing/BookCallButton";
import { FOUNDER_LED_SECTION, CTAS } from "@/lib/constants";
import { scrollToBook } from "@/lib/marketing";

function StackIcon() {
  return (
    <svg
      className="w-4 h-4 text-forest-glow shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FounderMedia() {
  const { founder } = FOUNDER_LED_SECTION;
  const hasPhoto = Boolean(founder.photoSrc);
  const hasVideo = Boolean(founder.videoUrl);

  function handleMediaClick() {
    if (hasVideo && founder.videoUrl) {
      window.open(founder.videoUrl, "_blank", "noopener,noreferrer");
      return;
    }
    scrollToBook();
  }

  return (
    <div className="founder-media-shell mx-auto w-full max-w-md lg:max-w-none">
      <button
        type="button"
        onClick={handleMediaClick}
        className="founder-media-frame group relative block w-full aspect-[4/5] sm:aspect-[5/6] rounded-2xl overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-glow/60 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-black"
        aria-label={
          hasVideo
            ? `Play intro video with ${founder.name}`
            : hasPhoto
              ? `Photo of ${founder.name}, ${founder.role}`
              : `${founder.name}, ${founder.role} — book a strategy call`
        }
      >
        <GrowthPattern tone="dark" intensity="whisper" placement="corners" className="opacity-40" />

        {hasPhoto && founder.photoSrc ? (
          <Image
            src={founder.photoSrc}
            alt={`${founder.name}, founder of Lupin Leads`}
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            priority={false}
          />
        ) : (
          <div
            className="absolute inset-0 founder-media-placeholder flex flex-col items-center justify-center"
            aria-hidden={hasPhoto}
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-forest-mid/35 bg-forest-mid/15 flex items-center justify-center mb-5 shadow-lg shadow-forest-black/30">
              <span className="font-display text-4xl sm:text-5xl font-semibold text-forest-glow tracking-tight">
                {founder.name.charAt(0)}
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-silver-dim">
              Founder photo
            </p>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-forest-black/90 via-forest-black/20 to-transparent pointer-events-none" />

        {(hasVideo || !hasPhoto) && (
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="founder-media-play flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-white/25 bg-forest-black/55 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-foreground ml-0.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
              </svg>
            </span>
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 pointer-events-none">
          <p className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
            {founder.name}
          </p>
          <p className="text-sm text-silver-muted mt-0.5">{founder.role}</p>
          {!hasPhoto && (
            <p className="text-[11px] text-silver-dim mt-3 uppercase tracking-[0.16em]">
              {hasVideo ? "Watch intro" : "Tap to book a call"}
            </p>
          )}
        </div>
      </button>
    </div>
  );
}

export function FounderLedSection() {
  const { eyebrow, title, highlight, description, paragraphs, stack } = FOUNDER_LED_SECTION;

  return (
    <SectionShell id="founder-led" variant="emerald">
      <GrowthPattern tone="dark" intensity="whisper" placement="right" className="opacity-30" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
        <SlideIn direction="left" className="lg:col-span-5 xl:col-span-5 order-1">
          <FounderMedia />
        </SlideIn>

        <div className="lg:col-span-7 xl:col-span-7 order-2">
          <FadeIn>
            <SectionIntro
              eyebrow={eyebrow}
              title={title}
              highlight={highlight}
              description={description}
              variant="display"
              className="!mb-6"
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="editorial-prose max-w-none mb-8 lg:mb-10">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.16}>
            <div className="founder-stack-panel rounded-xl border border-forest-mid/20 bg-charcoal/40 p-5 sm:p-6 mb-8 lg:mb-10">
            <p className="text-[11px] uppercase tracking-[0.16em] text-forest-glow font-medium mb-4">
              One stack, one operator
            </p>
              <ul className="space-y-3.5 m-0 p-0 list-none">
                {stack.map((item) => (
                  <li key={item.title} className="flex gap-3 items-start">
                    <span className="mt-0.5">
                      <StackIcon />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground leading-snug">{item.title}</p>
                      <p className="text-sm text-silver-muted leading-relaxed mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.22}>
            <BookCallButton size="lg" emphasis>
              {CTAS.primary}
            </BookCallButton>
          </FadeIn>
        </div>
      </div>
    </SectionShell>
  );
}
