import Image from "next/image";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * MediaPlate — the single, consistent treatment for every photographic
 * surface on the site. Images must pass through here so the brand reads
 * coherently, not like a stock board.
 *
 * Treatment (applied in CSS, not baked into the asset):
 *   1. Slight desaturation + lifted contrast
 *   2. Dark overlay graded toward the brand accent
 *   3. Blueprint corner marks (decorative, opt-out)
 *
 * Motion is owned by the parent; this component is intentionally static
 * so the consumer can wrap it in motion.div / reveal as needed.
 */
export type MediaPlateProps = {
  image: SiteImage;
  className?: string;
  imageClassName?: string;
  /** Treatment intensity. `quiet` for hero/contact, `default` for cards. */
  grade?: "quiet" | "default" | "strong";
  /** Show the four hairline corner marks (decorative, ~5px). Default true. */
  corners?: boolean;
  priority?: boolean;
  sizes?: string;
};

const GRADES: Record<NonNullable<MediaPlateProps["grade"]>, string> = {
  quiet:
    "after:bg-[linear-gradient(180deg,rgba(6,9,14,0.35),rgba(6,9,14,0.65)_60%,rgba(6,9,14,0.9))]",
  default:
    "after:bg-[linear-gradient(180deg,rgba(6,9,14,0.55),rgba(6,9,14,0.75)_55%,rgba(6,9,14,0.95))]",
  strong:
    "after:bg-[linear-gradient(180deg,rgba(6,9,14,0.7),rgba(6,9,14,0.85)_55%,rgba(6,9,14,0.97))]",
};

export function MediaPlate({
  image,
  className,
  imageClassName,
  grade = "default",
  corners = true,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: MediaPlateProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        "after:pointer-events-none after:absolute after:inset-0 after:z-10",
        GRADES[grade],
        className
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          // brand grade in CSS: desaturate, lift contrast, push toward cool
          "object-cover [filter:saturate(0.55)_contrast(1.08)_brightness(0.88)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          imageClassName
        )}
        style={{ objectPosition: image.focal ?? "center" }}
      />

      {/* Brand accent grade — a faint blue wash applied above the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] mix-blend-color"
        style={{
          background:
            "linear-gradient(135deg, rgba(106,169,216,0.18), rgba(46,82,120,0.10))",
        }}
      />

      {corners && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
          <Corner pos="top-3 left-3" sides="t l" />
          <Corner pos="top-3 right-3" sides="t r" />
          <Corner pos="bottom-3 left-3" sides="b l" />
          <Corner pos="bottom-3 right-3" sides="b r" />
        </div>
      )}
    </div>
  );
}

function Corner({ pos, sides }: { pos: string; sides: string }) {
  const has = (s: string) => sides.includes(s);
  return (
    <div className={cn("absolute h-3.5 w-3.5", pos)}>
      {has("t") && (
        <span className="absolute left-0 top-0 h-px w-full bg-[color:var(--color-accent)] opacity-60" />
      )}
      {has("b") && (
        <span className="absolute bottom-0 left-0 h-px w-full bg-[color:var(--color-accent)] opacity-60" />
      )}
      {has("l") && (
        <span className="absolute left-0 top-0 h-full w-px bg-[color:var(--color-accent)] opacity-60" />
      )}
      {has("r") && (
        <span className="absolute right-0 top-0 h-full w-px bg-[color:var(--color-accent)] opacity-60" />
      )}
    </div>
  );
}
