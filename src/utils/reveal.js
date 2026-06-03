export function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
  )

  document.querySelectorAll('.fade-in, .fade-up, .blur-reveal, .stagger').forEach((el) => {
    io.observe(el)
  })
}
