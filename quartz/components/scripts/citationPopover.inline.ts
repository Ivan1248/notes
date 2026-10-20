import { computePosition, flip, inline, shift } from "@floating-ui/dom"

// Shows the bibliography entry a citation links to in a popover styled like Quartz's page popovers.
// The popover stays open while hovered (`.popover:hover`), so links in the entry can be clicked.

let popover: HTMLDivElement | null = null

function getPopover(): HTMLDivElement {
  if (popover?.isConnected) return popover
  popover = document.createElement("div")
  popover.classList.add("popover", "citation-popover")
  const inner = document.createElement("div")
  inner.classList.add("popover-inner")
  popover.appendChild(inner)
  document.body.appendChild(popover)
  return popover
}

async function mouseEnterHandler(
  this: HTMLAnchorElement,
  { clientX, clientY }: { clientX: number; clientY: number },
) {
  const id = decodeURIComponent(this.hash.slice(1))
  const entry = document.getElementById(id)
  if (!entry) return

  const popoverElement = getPopover()
  const inner = popoverElement.firstElementChild as HTMLElement
  const content = entry.cloneNode(true) as HTMLElement
  content.removeAttribute("id")
  inner.replaceChildren(content)

  const { x, y } = await computePosition(this, popoverElement, {
    strategy: "fixed",
    middleware: [inline({ x: clientX, y: clientY }), shift(), flip()],
  })
  Object.assign(popoverElement.style, {
    transform: `translate(${x.toFixed()}px, ${y.toFixed()}px)`,
  })
  popoverElement.classList.add("active-popover")
}

function mouseLeaveHandler() {
  popover?.classList.remove("active-popover")
}

document.addEventListener("nav", () => {
  const links = [...document.querySelectorAll('a[href^="#bib-"]')] as HTMLAnchorElement[]
  for (const link of links) {
    link.addEventListener("mouseenter", mouseEnterHandler)
    link.addEventListener("mouseleave", mouseLeaveHandler)
    window.addCleanup(() => {
      link.removeEventListener("mouseenter", mouseEnterHandler)
      link.removeEventListener("mouseleave", mouseLeaveHandler)
    })
  }
  window.addCleanup(() => popover?.remove())
})
