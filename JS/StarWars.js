/**
 * Created by user on 26.11.2016.
 */
var obj = {};
var index = 1;//hero index
var previous = document.getElementById('previous');
var next = document.getElementById('next');
next.addEventListener('click', incIndex);
previous.addEventListener('click', decIndex);
getInfo(index);
function incIndex() {

    if (index === 88) {
        alert("Sorry, no next hero");
    }
    else {
        setShadow();
        clearDom('listOfActor');
        index++;
        getInfo(index);
    }

}
function decIndex() {

    if (index === 1) {
        alert("Sorry, no previous hero");
    }
    else {
        setShadow();
        clearDom('listOfActor');
        index--;
        getInfo(index);
    }
}
//Add info about hero in list
function addPersonalInfo(obj) {
    var counter = 0; //only 8 values
    var list = document.getElementById('listOfActor');
    var beautiProperty; //just decoration
    var arrayOfValue = new Array(8);
    for (val in obj) {
        beautiProperty = val.toString();
        beautiProperty = beautiProperty.charAt(0).toUpperCase() + beautiProperty.substr(1);
        beautiProperty = beautiProperty.replace('_', ' ');
        arrayOfValue[counter] = document.createElement('li');
        arrayOfValue[counter].innerHTML = beautiProperty + ':' + ' ' + obj[val];
        list.appendChild(arrayOfValue[counter]);
        counter++;
        if (counter >= 8) {
            break;
        }
    }
    getFilm(obj.films);

}
//Main info
function getInfo(index) {
    fetch('http://swapi.co/api/people/' + index + '/')
        .then(function (response) {
            console.log(response.status);
            return response.json();
        })
        .then(function (user) {
            obj = user;
            addPersonalInfo(obj);
        })
        .catch(function(error){
            alert("Sorry, we can't get info about hero");
            throw new Error("Sorry, we can't get info about hero")
        })


}
//delete <li> in <ul id="listId"> listId - string
function clearDom(listId) {
    var lis = document.querySelectorAll('#' + listId + ' li');
    for (var i = 0; li = lis[i]; i++) {
        li.parentNode.removeChild(li);
    }
}
//Hide table at load time
function setShadow() {
    var mainShadow = document.getElementById('mainTable');
    mainShadow.setAttribute('style', 'visibility:hidden');
    setTimeout(function () {
        mainShadow.setAttribute('style', 'visibility:visible');
    }, 1500);
}
//Get the list of films
function getFilm(arrayOfFilms) {
    clearDom('listOfFilms');
    var film = new Array(arrayOfFilms.length);
    var filmDetail = new Array(arrayOfFilms.length);
    var list = document.getElementById('listOfFilms');
    for (var i = 0; i < arrayOfFilms.length; i++) {
        fetch(arrayOfFilms[i].toLocaleString())
            .then(function (response) {
                console.log(response.status);
                return response.json();
            })
            .then(function (films) {
                add(films);
            })
    }

    function add(films){
        film[i] = films;
        filmDetail[i] = document.createElement('li');
        filmDetail[i].innerHTML = "Episode " + film[i].episode_id + film[i].title;
        list.appendChild(filmDetail[i]);
    }
}