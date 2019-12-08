

let request = (url, callback) => {
    fetch(url).then( (res) => {
        res.json().then((data) => {
            callback(data);
        });
    });
}

let requestMovie = (movieName, callback) => {
    request('https://www.omdbapi.com/?apikey=bbfde27a&t=' + movieName, callback);
}

let render = (data, callback = function () {}) => {
    let div = document.createElement('div');
    div.innerHTML += '<h1>' + data.Title + '</h1>';
    div.innerHTML += '<p>' + data.Plot + '</p>'
    let posterImg = document.createElement('img');
    posterImg.src = data.Poster;
    div.appendChild(posterImg);
    document.body.appendChild(div);
    callback();
}

let asyncSeries = (tasks) => {
    if (tasks.length) {
        let task = tasks.shift();
        let cb = () => {
            asyncSeries(tasks);
        };
        task(cb);
    }
}

asyncSeries([
    (cb) => {
        let movieList = ['Titanic', 'The Dark Knight', 'Mulan']
        for(let i of movieList) {
            requestMovie(i, (data) => {
                render(data);
                cb();
            });
            }
        }
]);