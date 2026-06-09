import type { Project } from "@/lib/projects";
import { IMG } from "@/lib/images";
import { MediaPlate } from "@/components/ui/media-plate";

/**
 * Shared project plate for project cards + case study heroes.
 *
 * Previously an abstract SVG; now a photographic plate routed through
 * MediaPlate so every project surface gets the same brand grade and
 * blueprint corner marks. The `project.art.imageKey` field selects the
 * actual photo from lib/images.ts.
 */
export function ProjectArt({
  project,
  priority = false,
  sizes,
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  const image = IMG[project.art.imageKey];
  return (
    <MediaPlate
      image={image}
      grade="default"
      corners
      priority={priority}
      sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
      className="h-full w-full"
    />
  );
}
