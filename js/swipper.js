export default class Swiper {
  constructor(containerSelector, options) {
    this.container = document.querySelector(containerSelector)
    this.position = 0
    this.currentIndex = 0
    this.wrapper = this.container.querySelector('.swiper__wrapper')
    this.slides = this.container.querySelectorAll('.swiper__slide')
    this.nextBtn = this.container.querySelector('.swiper__button-next')
    this.prevBtn = this.container.querySelector('.swiper__button-prev')
    this.pagination = this.container.querySelector('.swiper__pagination')

    const defaultOptions = {
      isLooped: false,
      autoPlayInterval: null,
      typePagination: 'dot',
      toShow: 1,
      toScroll: 1,
    }

    this.options = { ...defaultOptions, ...options }
    this.slidesToShow = this.options.toShow
    this.slidesToScroll = this.options.toScroll
    this.slideWidth = this.container.offsetWidth / this.slidesToShow
    this.movePosition = this.slidesToScroll * this.slideWidth
    this.slidesCount = this.slides.length
    this.isLooped = this.options.isLooped
    this.typePagination = this.options.typePagination
    this.autoPlayInterval = this.options.autoPlayInterval
  }

  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      this.next()
    }, this.autoPlayInterval)
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayTimer)
    this.autoPlayTimer = null
  }

  setPosition() {
    this.wrapper.style.transform = `translateX(${this.position}px)`
  }

  setPagination() {
    if (this.typePagination === 'dot') {
      for (let i = 0; i < this.slidesCount; i++) {
        const paginationElem = document.createElement('span')
        paginationElem.classList.add('pagination__item')
        if (i === 0) {
          paginationElem.classList.add('pagination__item_active')
        }
        this.pagination.appendChild(paginationElem)
      }
    } else if (this.typePagination === 'num') {
      const paginationElem = document.createElement('span')
      paginationElem.classList.add('pagination__counter')
      paginationElem.textContent = `${this.currentIndex + 1}/${this.slidesCount}`
      this.pagination.appendChild(paginationElem)
    }
  }

  updatePagination() {
    if (this.typePagination === 'dot') {
      const activePaginationItem = this.pagination.querySelector('.pagination__item_active')
      activePaginationItem.classList.remove('pagination__item_active')
      this.pagination.children[this.currentIndex].classList.add('pagination__item_active')
    } else if (this.typePagination === 'num') {
      const paginationElem = this.pagination.querySelector('.pagination__counter')
      console.log(paginationElem.textContent)
      paginationElem.textContent = `${this.currentIndex + 1}/${this.slidesCount}`
    }
  }

  checkBtns() {
    const totalWidth = -(this.slidesCount - this.slidesToShow) * this.slideWidth
    this.nextBtn.disabled = this.position <= totalWidth
    this.prevBtn.disabled = this.position === 0
  }

  init() {
    this.slides.forEach((slide) => {
      slide.style.minWidth = `${this.slideWidth}px`
    })

    this.nextBtn.addEventListener('click', this.next.bind(this))
    this.prevBtn.addEventListener('click', this.prev.bind(this))

    this.setPagination()

    if (this.autoPlayInterval) this.startAutoPlay()
    if (!this.isLooped) this.checkBtns()
  }

  next() {
    if (this.currentIndex === this.slidesCount - 1 && this.isLooped) {
      this.currentIndex = 0
      this.position = 0
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.slidesCount
      const slidesLeft =
        this.slidesCount -
        (Math.abs(this.position) + this.slidesToShow * this.slideWidth) / this.slideWidth
      this.position -=
        slidesLeft <= this.movePosition ? this.movePosition : slidesLeft * this.slideWidth
    }

    this.setPosition()
    if (!this.isLooped) this.checkBtns()
    this.updatePagination()
  }

  prev() {
    if (this.currentIndex === 0 && this.isLooped) {
      this.currentIndex = this.slidesCount - 1
      this.position = -(this.slidesCount - this.slidesToShow) * this.slideWidth
    } else {
      this.currentIndex = (this.currentIndex - 1 + this.slidesCount) % this.slidesCount
      this.position += this.movePosition
    }
    if (!this.isLooped) this.checkBtns()

    this.setPosition()
    this.updatePagination()
  }
}
