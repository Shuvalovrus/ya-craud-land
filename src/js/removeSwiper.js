export const removeSwiperElements = (swiper) => {
  if (window.innerWidth > 768 && swiper) {
    const slides = Array.from(swiper.querySelectorAll('.swiper__slide'))
    const controls = swiper.querySelector('.swiper__controls')
    const wrapper = swiper.querySelector('.swiper__wrapper')

    const moveChild = (child, parent) => parent.parentNode.insertBefore(child, parent)

    if (controls) controls.remove()

    slides.forEach((slide) => {
      Array.from(slide.children).forEach((child) => moveChild(child, slide))
      slide.remove()
    })

    Array.from(wrapper.children).forEach((child) => moveChild(child, wrapper))
    wrapper.remove()
  }
}
