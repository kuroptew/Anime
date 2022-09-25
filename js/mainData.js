const mainData = () => {
  const renderAnimeList = (arr, ganres) => {
    console.log(arr);
    console.log(ganres)
  }

  const renderTopAnime = (arr) => {
    const wrapper = document.querySelector('.filter__gallery')

    wrapper.innerHTML = ''

    arr.forEach(item => {
      wrapper.insertAdjacentHTML('afterbegin', `
        <div class="product__sidebar__view__item set-bg mix" data-setbg="${item.image}">
          <div class="ep">${item.rating}</div>
          <div class="view"><i class="fa fa-eye"></i>${item.views}</div>
          <h5><a href="/anime-details.html">${item.title}</a></h5>
        </div>
      `)
    });

    wrapper.querySelectorAll('.set-bg').forEach(el => el.style.backgroundImage = `url(${el.dataset.setbg})`)
  }

  fetch('https://anime-db-f29d9-default-rtdb.firebaseio.com/anime.json')
    .then(response => response.json())
    .then((data) => {
      const ganres = new Set()

      data.forEach((item) => {
        ganres.add(item.ganre)
      })

      renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5))

      renderAnimeList(data, ganres)
    })
}

mainData()