export const scrollHandler = (button) => {
  const targetBlock = button.classList.contains('button_dark')
    ? document.querySelector('.main__activity')
    : document.querySelector('.main__members')

  const scrollOptions = {
    behavior: 'smooth',
    block: 'start',
  }

  targetBlock.scrollIntoView(scrollOptions)
}
