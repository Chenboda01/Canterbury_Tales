import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.CommentRelay({ relayPort: 3333 }),
    Component.ConditionalRender({
      component: Component.Quiz(),
      condition: (page) => page.fileData.slug === "Quiz-Test"
    }),
    Component.ConditionalRender({
      component: Component.Chatbot({}),
      condition: (page) => page.fileData.slug === "Chatbot"
    })
  ],
  footer: Component.Footer({
    links: {
      Repository: "https://github.com/Chenboda01/Canterbury_Tales",
      Wiki: "https://github.com/Chenboda01/Canterbury_Tales/tree/new-feature/wiki",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      sortFn: (a, b) => {
        const slugA = a.slugSegment
        const slugB = b.slugSegment

        const PROJECT_PAGES = [
          "Project-Overview", "Story-Outline", "Characters-and-Roles",
          "Source-Notes", "Schema", "Log", "Scene-Index",
        ]
        const CHARACTER_PAGES = [
          "Chaucer", "Chanticleer", "Pertelote", "Fox",
          "Widow", "Daughters", "Hens", "Farm-Animals",
        ]
        const OPERATIONS_PAGES = [
          "Chatbot", "Quiz-Test", "prompt-template",
          "scene-summary-checklist", "Lessons-Learned",
        ]

        const aCat = slugA === "0-Introduction" ? 0 :
          slugA === "Home" ? 1 :
          PROJECT_PAGES.includes(slugA) ? 2 :
          slugA.startsWith("Scene-") ? 3 :
          CHARACTER_PAGES.includes(slugA) ? 4 :
          OPERATIONS_PAGES.includes(slugA) ? 5 :
          6
        const bCat = slugB === "0-Introduction" ? 0 :
          slugB === "Home" ? 1 :
          PROJECT_PAGES.includes(slugB) ? 2 :
          slugB.startsWith("Scene-") ? 3 :
          CHARACTER_PAGES.includes(slugB) ? 4 :
          OPERATIONS_PAGES.includes(slugB) ? 5 :
          6
        if (aCat !== bCat) return aCat - bCat

        if (aCat === 3) {
          const aNum = parseInt(slugA.replace("Scene-", ""), 10)
          const bNum = parseInt(slugB.replace("Scene-", ""), 10)
          return aNum - bNum
        }

        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      sortFn: (a, b) => {
        const slugA = a.slugSegment
        const slugB = b.slugSegment

        const PROJECT_PAGES = [
          "Project-Overview", "Story-Outline", "Characters-and-Roles",
          "Source-Notes", "Schema", "Log", "Scene-Index",
        ]
        const CHARACTER_PAGES = [
          "Chaucer", "Chanticleer", "Pertelote", "Fox",
          "Widow", "Daughters", "Hens", "Farm-Animals",
        ]
        const OPERATIONS_PAGES = [
          "Chatbot", "Quiz-Test", "prompt-template",
          "scene-summary-checklist", "Lessons-Learned",
        ]

        const aCat = slugA === "0-Introduction" ? 0 :
          slugA === "Home" ? 1 :
          PROJECT_PAGES.includes(slugA) ? 2 :
          slugA.startsWith("Scene-") ? 3 :
          CHARACTER_PAGES.includes(slugA) ? 4 :
          OPERATIONS_PAGES.includes(slugA) ? 5 :
          6
        const bCat = slugB === "0-Introduction" ? 0 :
          slugB === "Home" ? 1 :
          PROJECT_PAGES.includes(slugB) ? 2 :
          slugB.startsWith("Scene-") ? 3 :
          CHARACTER_PAGES.includes(slugB) ? 4 :
          OPERATIONS_PAGES.includes(slugB) ? 5 :
          6
        if (aCat !== bCat) return aCat - bCat

        if (aCat === 3) {
          const aNum = parseInt(slugA.replace("Scene-", ""), 10)
          const bNum = parseInt(slugB.replace("Scene-", ""), 10)
          return aNum - bNum
        }

        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      },
    }),
  ],
  right: [],
}
