let page =1 ;
let movieList = []


let loadMore = async () => {
    page++;
    movieList = movieList.concat(result.movies)
    render(movieList)
};

