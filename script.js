// capturing input field and search button
const searchBtn = document.getElementById("searchBtn");
const inputField = document.getElementById("inputField");

// adding event event listener
searchBtn.addEventListener("click" , () => {

    // fetching data from the api

    fetch(`https://api.lyrics.ovh/suggest/${inputField.value}`)
    .then(res => res.json())
    .then(data => {

    // looping all the info from api to use in UI

    for(let i = 0; i < 10; i++){
        const name = data.data[i].artist.name;
        const title = data.data[i].title;
        const picture = data.data[i].album.cover;
        document.getElementsByClassName("lyrics-name")[i].innerText = title;
        document.getElementsByClassName("writer")[i].innerText = name;
        document.getElementsByClassName("single-result")[i].style.display = "block";
        document.getElementsByClassName('image')[i].src = picture; 
    }
    inputField.value = "";

    // looping to get the lyrics info, add event and getting lyrics from api

    for(let i = 0; i < 10; i++){
    document.getElementsByClassName('getLyrics')[i].addEventListener('click', function () {
        const name = data.data[i].artist.name;
        const title = data.data[i].title;
        fetch(`https://api.lyrics.ovh/v1/${name}/${title}`)
        .then(res => res.json())
        .then (data => {
            
            document.getElementsByClassName('lyric')[0].innerText = data.lyrics;
            console.log(data.lyrics)  
            document.getElementsByClassName('text-success')[0].innerText = title;
            

            if (data.lyrics == undefined) {
                document.getElementsByClassName('lyric')[0].innerHTML = `Sorry, no lyrics found, search another one...`;
                for (let i = 0; i < 10; i++) {
                    document.getElementsByClassName('single-result')[i].style.display = "none";
                }
            } 
             else{  
             for (let i = 0; i < 10; i++) {
                document.getElementsByClassName('single-result')[i].style.display = "none";  
                document.getElementsByClassName('search-bar')[0].style.display = "none";   
                }      
            }  
            }
        )
    }
    )}
    })
})
