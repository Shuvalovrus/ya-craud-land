import Swiper from './js/swipper.js'
import { removeSwiperElements } from './js/removeSwiper.js'
import { scrollHandler } from './js/scroll.js'

window.addEventListener('load', () => {
  const previewButtons = document.querySelectorAll('.preview__button')
  const mobileSwiper = document.querySelector('.swiper_mobile')

  let membersSwiperOptions = {
    isLooped: true,
    autoPlayInterval: 4000,
    typePagination: 'num',
  }
  if (window.matchMedia('(min-width: 768px)').matches) membersSwiperOptions.toShow = 3

  const stagesSwiper = new Swiper('.stages__swiper', false)
  const membersSwiper = new Swiper('.members__swiper', membersSwiperOptions)

  stagesSwiper.init()
  membersSwiper.init()

  removeSwiperElements(mobileSwiper)

  previewButtons.forEach((button) => {
    button.addEventListener('click', (event) => scrollHandler(button))
  })
})
