let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getMovie = () => {
  let movieName = movieNameRef.value;
  let api = ` https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class ="msg"> Merci de renseigner un film </h3>`;
  } else {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.Response == "True") {
          result.innerHTML = `
                    <div class="info">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="assets/star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join(
                                  "</div><div>"
                                )}</div>
                            </div>
                            <div class="content">
                                <h3>Résumé :</h3>
                                <p>${data.Plot}</p>
                                <h3 class="cast">Cast :</h3>
                                <p>${data.Actors}</p>
                            </div>
                        </div>
                        <img src=${data.Poster} class="poster"
                    </div>
                `;
        } else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Erreur</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
movieNameRef.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    event.preventDefault();
    document.querySelector("div").submit();
  }
});
