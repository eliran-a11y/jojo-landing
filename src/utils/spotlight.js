export const spotlightHandlers = {
  onMouseMove(e) {
    const el = e.currentTarget
    const { left, top } = el.getBoundingClientRect()
    el.style.setProperty('--sx', `${e.clientX - left}px`)
    el.style.setProperty('--sy', `${e.clientY - top}px`)
  },
}
