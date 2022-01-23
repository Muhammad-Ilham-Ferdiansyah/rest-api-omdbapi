function searchMovie() {
    $('#movie-list').html('');

    $.ajax ({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '48a3eebc',
            's': $('#search-input').val()
        },
        success: function(result) {
            if (result.Response == "True") {
                let movies = result.Search;

                $.each(movies, function(i,data){
                    $('#movie-list').append(`
                    <div class="col-md-4">
                    <div class="card mb-3">
                        <img src=" ` + data.Poster + ` " class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">` + data.Title + `</h5>
                            <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
                            <a href="#" class="card-link details" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` + data.imdbID + `">Details</a>
                            </div>
                        </div>
                    </div>
                    `);
                });

                $('#search-input').val('');

            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>
                `);
            }
        }
    });
}

$('#search-button').on('click', function (){
   searchMovie();
});

$('#search-input').on('keyup', function(e) {
    if (e.keyCode === 13) {
        searchMovie();
    }
})

$('#movie-list').on('click', '.details', function() {
    // console.log($(this).data('id'));

    $.ajax ({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '48a3eebc',
            'i': $(this).data('id')
        },
        success: function(movie){
            if (movie.Response == "True"){

                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                            <img src=" ` + movie.Poster + `" class="img-fluid">
                        </div>

                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>` + movie.Title + `</h3></li>
                                <li class="list-group-item"><strong>Released</strong> : `+ movie.Released + `</li>
                                <li class="list-group-item"><strong>Genre</strong> : `+ movie.Genre + `</li>
                                <li class="list-group-item"><strong>Director</strong> : `+ movie.Director + `</li>
                                <li class="list-group-item"><strong>Actors</strong> : `+ movie.Actors + `</li>
                                <li class="list-group-item"><strong>Plot</strong> : `+ movie.Plot + `</li>
                            </ul>
                        </div>
                    </div>
                </div>
                `);

            } else {
                console.log("error");
            }
        }
    })
})