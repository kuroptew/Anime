const categoriesData = () => {
  const preloader = document.querySelector('.preloder')
  const renderGanreList = (ganres) => {
    const dropdownBlock = document.querySelector('.header__menu .dropdown')

    dropdownBlock.innerHTML = ''
    ganres.forEach(ganre => {
      dropdownBlock.insertAdjacentHTML('beforeend', `
      <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
      `)

    })
  }

  const renderAnimeList = (arr, ganres) => {
    const wrapper = document.querySelector('.product-page .col-lg-8')

    ganres.forEach((ganre) => {
      const productBlock = document.createElement('div')
      productBlock.classList.add('mb-5')

      const listBlock = document.createElement('div')

      const list = arr.filter(item => item.tags.includes(ganre))
                      .filter((item,index,arr)=> index ===arr.findIndex(el=>el.title === item.title))

      listBlock.classList.add('row')

      productBlock.insertAdjacentHTML('beforeend', `
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-8">
            <div class="section-title">
              <h4>${ganre}</h4>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="btn__all">
              <a href="/categories.html?ganre=${ganre}" class="primary-btn">View All <span class="arrow_right"></span></a>
            </div>
          </div>
        </div>`)

      list.forEach(item => {
        const tagsBlock = document.createElement('ul')

        item.tags.forEach(tag => {
          tagsBlock.insertAdjacentHTML('beforeend', `
            <li>${tag}</li>
            `)
        })

        listBlock.insertAdjacentHTML('beforeend', `
            <div class="col-lg-4 col-md-6 col-sm-6">
              <div class="product__item">
                <div class="product__item__pic set-bg" data-setbg="${item.image.replace('http', 'https')}">
                  <div class="ep">${item.rating}/10</div>
                    <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                  </div>
                  <div class="product__item__text">
                    ${tagsBlock.outerHTML}
                    <h5><a href="/anime-details.html?itemId=${item.id}">${item.title}</a></h5>
                  </div>
                </div>
              </div>
          `)
      })

      productBlock.append(listBlock)
      wrapper.append(productBlock)

      wrapper.querySelectorAll('.set-bg').forEach(el => el.style.backgroundImage = `url(${el.dataset.setbg})`)
    })
    setTimeout(() => preloader.classList.remove('active'), 500)
  }

  const renderTopAnime = (arr) => {
    const wrapper = document.querySelector('.filter__gallery')

    arr.forEach(item => {
      wrapper.insertAdjacentHTML('beforeend', `
        <div class="product__sidebar__view__item set-bg mix" data-setbg="${item.image.replace('http', 'https')}">
          <div class="ep">${item.rating}</div>
          <div class="view"><i class="fa fa-eye"></i>${item.views}</div>
          <h5><a href="/anime-details.html?itemId=${item.id}">${item.title}</a></h5>
        </div>
      `)
    });

    wrapper.querySelectorAll('.set-bg').forEach(el => el.style.backgroundImage = `url(${el.dataset.setbg})`)
  }

  fetch('https://anime-db-f29d9-default-rtdb.firebaseio.com/anime.json')
    .then(response => response.json())
    .then((data) => {
      const ganres = new Set()
      const ganreParams = new URLSearchParams(window.location.search).get('ganre')

      data.forEach((item) => {
        ganres.add(item.ganre)
      })

      renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5))
      if (ganreParams) {
        renderAnimeList(data, [ganreParams])
      } else {
        renderAnimeList(data, ganres)
      }

      renderGanreList(ganres)
    })
}

categoriesData()