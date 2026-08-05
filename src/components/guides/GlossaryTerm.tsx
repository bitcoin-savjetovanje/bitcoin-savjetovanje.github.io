import {
  type CSSProperties,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import { createPortal } from "react-dom"

import type { GlossaryTerm } from "@/content/glossary"

type TooltipPlacement = "center" | "start" | "end"
type TooltipSide = "top" | "bottom"

type TooltipPosition = {
  left: number
  top: number
}

const subscribeToClient = () => () => undefined

export function InlineGlossaryTerm({
  children,
  term,
}: {
  children: string
  term: GlossaryTerm
}) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const mounted = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false
  )
  const [placement, setPlacement] = useState<TooltipPlacement>("center")
  const [side, setSide] = useState<TooltipSide>("top")
  const [position, setPosition] = useState<TooltipPosition>({ left: 0, top: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const termRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const tooltipId = useId()
  const visible = open || hovered || focused

  const updateTooltipPlacement = useCallback(() => {
    const trigger = buttonRef.current

    if (!trigger) {
      return
    }

    const rect = trigger.getBoundingClientRect()
    const safePadding = window.innerWidth < 768 ? 16 : 24
    const gap = 10
    const viewportWidth = document.documentElement.clientWidth
    const viewportHeight = document.documentElement.clientHeight
    const tooltipWidth =
      tooltipRef.current?.offsetWidth ??
      Math.min(320, viewportWidth - safePadding * 2)
    const tooltipHeight = tooltipRef.current?.offsetHeight ?? 140
    const triggerCenter = rect.left + rect.width / 2
    const minimumLeft = safePadding
    const maximumLeft = Math.max(
      minimumLeft,
      viewportWidth - safePadding - tooltipWidth
    )
    const centeredLeft = triggerCenter - tooltipWidth / 2
    const left = Math.min(Math.max(centeredLeft, minimumLeft), maximumLeft)
    let nextPlacement: TooltipPlacement = "center"

    if (left <= minimumLeft) {
      nextPlacement = "start"
    } else if (left >= maximumLeft) {
      nextPlacement = "end"
    }

    const aboveTop = rect.top - gap - tooltipHeight
    const belowTop = rect.bottom + gap
    const minimumTop = safePadding
    const maximumTop = Math.max(
      minimumTop,
      viewportHeight - safePadding - tooltipHeight
    )
    const hasRoomAbove = aboveTop >= minimumTop
    const hasRoomBelow = belowTop <= maximumTop
    const nextSide: TooltipSide =
      hasRoomAbove || !hasRoomBelow ? "top" : "bottom"
    const requestedTop = nextSide === "top" ? aboveTop : belowTop
    const top = Math.min(Math.max(requestedTop, minimumTop), maximumTop)

    setPlacement(nextPlacement)
    setSide(nextSide)
    setPosition({ left, top })
  }, [])

  useEffect(() => {
    if (!visible) {
      return
    }

    const frame = window.requestAnimationFrame(updateTooltipPlacement)

    window.addEventListener("resize", updateTooltipPlacement)
    window.addEventListener("scroll", updateTooltipPlacement, true)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", updateTooltipPlacement)
      window.removeEventListener("scroll", updateTooltipPlacement, true)
    }
  }, [updateTooltipPlacement, visible])

  useEffect(() => {
    if (!open) {
      return
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!termRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeydown)
    document.addEventListener("pointerdown", handlePointerDown)

    return () => {
      document.removeEventListener("keydown", handleKeydown)
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [open])

  return (
    <span
      ref={termRef}
      className="glossary-term-wrap"
      data-open={open ? "true" : undefined}
      data-placement={placement}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        className="glossary-term"
        aria-label={`Objasni pojam: ${term.title}`}
        aria-describedby={tooltipId}
        aria-expanded={open}
        onClick={() => {
          updateTooltipPlacement()
          setOpen((current) => !current)
        }}
        onBlur={() => setFocused(false)}
        onFocus={() => {
          setFocused(true)
          updateTooltipPlacement()
        }}
        onMouseEnter={() => {
          setHovered(true)
          updateTooltipPlacement()
        }}
      >
        {children}
      </button>
      {mounted
        ? createPortal(
            <span
              ref={tooltipRef}
              id={tooltipId}
              role="tooltip"
              className="glossary-term__tooltip"
              data-placement={placement}
              data-side={side}
              data-visible={visible ? "true" : undefined}
              style={
                {
                  "--glossary-tooltip-left": `${position.left}px`,
                  "--glossary-tooltip-top": `${position.top}px`,
                } as CSSProperties
              }
            >
              <span className="glossary-term__title">{term.title}</span>
              <span className="glossary-term__description">
                {term.description}
              </span>
            </span>,
            document.body
          )
        : null}
    </span>
  )
}
