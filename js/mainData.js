const mainData = () => {
  fetch('https://anime-db-f29d9-default-rtdb.firebaseio.com/anime.json')
    .then(response => response.json())
    .then(data => console.log(data))
}

mainData()