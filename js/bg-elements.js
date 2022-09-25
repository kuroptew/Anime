const bgElements = () => {
  const elements = document.querySelectorAll('.set-bg')

  elements.forEach(el=>el.style.backgroundImage = `url(${el.dataset.setbg})`)
}

bgElements()