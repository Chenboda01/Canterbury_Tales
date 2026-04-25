import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { classNames } from "../util/lang"
import style from "./styles/pageNavigation.scss"

export default (() => {
  const PageNavigation: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const currentSlug = fileData.slug
    if (!currentSlug || currentSlug === "index") return null

    const PROJECT_PAGES = [
      "Project-Overview", "Story-Outline", "Characters-and-Roles",
      "Source-Notes", "Schema", "Log", "Scene-Index", "Short-Scenes",
    ]
    const CHARACTER_PAGES = [
      "Chaucer", "Chanticleer", "Pertelote", "Fox",
      "Widow", "Daughters", "Hens", "Farm-Animals",
    ]
    const OPERATIONS_PAGES = [
      "Chatbot", "Quiz-Test", "prompt-template",
      "scene-summary-checklist", "Lessons-Learned",
    ]

    const category = (slug: string): number => {
      if (slug === "0-Introduction") return 0
      if (slug === "Home") return 1
      if (PROJECT_PAGES.includes(slug)) return 2
      if (slug.startsWith("Scene-")) return 3
      if (CHARACTER_PAGES.includes(slug)) return 4
      if (OPERATIONS_PAGES.includes(slug)) return 5
      return 6
    }

    const sorted = allFiles
      .filter((p) => p.slug && p.slug !== "index" && !p.slug.startsWith("tags/"))
      .sort((a, b) => {
        const aCat = category(a.slug!)
        const bCat = category(b.slug!)
        if (aCat !== bCat) return aCat - bCat

        if (aCat === 3) {
          const aNum = parseInt(a.slug!.replace("Scene-", ""), 10)
          const bNum = parseInt(b.slug!.replace("Scene-", ""), 10)
          return aNum - bNum
        }

        const aTitle = a.frontmatter?.title ?? a.slug!
        const bTitle = b.frontmatter?.title ?? b.slug!
        return aTitle.localeCompare(bTitle, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      })

    const currentIdx = sorted.findIndex((p) => p.slug === currentSlug)
    if (currentIdx < 0) return null

    const prev = currentIdx > 0 ? sorted[currentIdx - 1] : null
    const next = currentIdx < sorted.length - 1 ? sorted[currentIdx + 1] : null

    if (!prev && !next) return null

    return (
      <nav class={classNames(displayClass, "page-navigation")}>
        {prev && (
          <a
            href={resolveRelative(currentSlug, prev.slug!)}
            class="page-nav-prev"
            title={prev.frontmatter?.title ?? prev.slug!}
          >
            <span class="page-nav-arrow">←</span>
            <span class="page-nav-label">{prev.frontmatter?.title ?? prev.slug!}</span>
          </a>
        )}
        {next && (
          <a
            href={resolveRelative(currentSlug, next.slug!)}
            class="page-nav-next"
            title={next.frontmatter?.title ?? next.slug!}
          >
            <span class="page-nav-label">{next.frontmatter?.title ?? next.slug!}</span>
            <span class="page-nav-arrow">→</span>
          </a>
        )}
      </nav>
    )
  }

  PageNavigation.css = style
  return PageNavigation
}) satisfies QuartzComponentConstructor
