var timeDisplay = document.getElementById("timeDisplay");
var imageDisplay = document.getElementById("imgCarousel");

// a and b are javascript Date objects
function dateDiffInSeconds(a, b) {
    // Discard the time and time-zone information.
    // var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    // var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.round((b - a) / 1000);
}

function updateTime() {
    var a = new Date("March 26, 1993"),
        b = new Date(),
        seconds = dateDiffInSeconds(a, b);
    //console.log(b);
    //console.log(seconds);
    var fullDiff = [
        ['Oficialiai kartu', seconds],
        ['Dienas', ((seconds / 60) / 60) / 24],
        ['Mėnesius', (((seconds / 60) / 60) / 24) * 0.0328767],
        ['Metus', ((((seconds / 60) / 60) / 24) * 0.0328767) / 12]
    ];
    for (var i = 0; i < timeDisplay.children.length; i++) {
        timeDisplay.children[i].innerHTML = fullDiff[i][0] + " " + fullDiff[i][1].toFixed(0) + " sekundes.";
    }
    //console.log('a second has passed');
}


var t = setInterval(updateTime, 1000);

var imCounter = 0;

function updatePictures() {
    for (var i = 0; i < imageDisplay.children.length; i++) {
        imageDisplay.children[i].setAttribute("data-value", "hidden");
    }
    imageDisplay.children[imCounter].setAttribute("data-value", "active");
    if (imageDisplay.children.length - imCounter == 1) {
        imCounter = 0;
    } else {
        imCounter++;
    }

}
updatePictures();
var imgT = setInterval(updatePictures, 30000);
//Audio Player Class
var AudioPlayer = function () {
    this._playlist = null;
    this._currentSongIndex = 0;
    
    this._getContainer = function () {
        if (this._$container == null) {
            this._$container = $('<div>');
            this._$container.addClass('container');
            this._$container.append(this._getAudio());
            this._$container.append(this._getList());
        }
        return this._$container;
    };

    this._getAudio = function () {
        if (this._$audio == null) {
            this._$audio = $('<audio>');
            this._$audio.attr('preload', true);
            this._$audio.attr('autoplay', true);
            this._$audio.attr('controls', '');
            this._$audio[0].src = this._playlist[this._currentSongIndex]['url'];
            this._$audio[0].addEventListener('ended', this._handleAudioEnded.bind(this));
        }
        return this._$audio;
    };

    this._getList = function () {
        if (this._$list == null) {
            this._$list = $('<ul>');
            this._$list.addClass('list');
            for (var i = 0; i < this._playlist.length; i++) {
                var currentAudioUrl = this._playlist[i],
                    $listItem = $('<li>');
                $listItem.addClass('list-item');
                $listItem.attr('audio-url', currentAudioUrl.url);
                $listItem.on('click', this._handListItemClick.bind(this));
                $listItem.text(currentAudioUrl.name + ' - ' + currentAudioUrl.duration);
                this._$list.append($listItem);
            }
            this._$list.find('li').eq(this._currentSongIndex).addClass('active');
        }
        return this._$list;
    };

    this._handListItemClick = function (e) {
        var $this = $(e.currentTarget);
        this._currentSongIndex = $this.index();
        this._playAudioFromCurrentIndex();
    };

    this._handleAudioEnded = function (e) {
        this._currentSongIndex++;
        if (this._currentSongIndex == this._playlist.length) this._currentSongIndex = 0;
        this._playAudioFromCurrentIndex();
    };

    this._playAudioFromCurrentIndex = function () {
        var $allListItems = this._getList().find('li'),
            $targetListItem = this._getList().find('li').eq(this._currentSongIndex),
            audioUrl = $targetListItem.attr('audio-url');
        $allListItems.removeClass('active');
        $targetListItem.addClass('active');
        this._getAudio()[0].src = audioUrl;
        this._getAudio()[0].load();
        this._getAudio()[0].play();
    };

    this.setPlaylist = function (playlist) {
        this._playlist = playlist;
    };

    this.getHtml = function () {
        return this._getContainer();
    };
};

//Declare playlist
var trackUrls = [{
    'name': 'Patruliai - Draugai',
    'duration': '3:42',
    'url': 'dist/music/Patruliai - Draugai.mp3'
},{
    'name': 'Robbie Williams - Somethin Stupid',
    'duration': '2:52',
    'url': 'dist/music/somethinstupid.mp3'
}, {
        'name': 'Biplan - Labas Rytas',
        'duration': '3:41',
        'url': 'dist/music/labasrytas.mp3'
    }, 
    {
        'name': 'James Blunt - You are Beautiful',
        'duration': '3:29',
        'url': 'dist/music/yourebeautiful.mp3'
    }, {
        'name': 'Chris Norman - Gypsy Queen',
        'duration': '3:26',
        'url': 'dist/music/Gypsy Queen.flac'
    },  {
        'name': 'Robin Thicke - Blurred Lines',
        'duration': '4:23',
        'url': 'dist/music/blurredlines.mp3'
    }, {
        'name': 'Modern Talking - You are my heart, you are my soul',
        'duration': '3:49',
        'url': 'dist/music/heartsoul.mp3'
    }, {
        'name': 'Gilla - Johnny',
        'duration': '3:49',
        'url': 'dist/music/johnny.mp3'
    },
    {
        'name': 'Bryan Adams - Please Forgive Me',
        'duration': '5:53',
        'url': 'dist/music/pleseforgiveme.mp3'
    },
    {
        'name': 'Kastytis Kerbedis - Melodija',
        'duration': '5:24',
        'url': 'dist/music/Kastytis Kerbedis - Melodija.mp3'
    },
    {
        'name': 'Bobby McFerrin - Dont worry be happy',
        'duration': '4:52',
        'url': 'dist/music/dontworry.mp3'
    }, 
    {
        'name': 'Laid Back - Sunshine Reggae',
        'duration': '4:17',
        'url': 'dist/music/sunshine.mp3'
    }, 
    {
        'name': 'Status Quo - In The Army Now',
        'duration': '4:35',
        'url': 'dist/music/inthearmy.mp3'
    }, 
    {
        'name': 'Afric Simone - Hafanana',
        'duration': '2:57',
        'url': 'dist/music/hafanana.mp3'
    }, 
    {
        'name': 'ABBA - Money Money Money',
        'duration': '3:06',
        'url': 'dist/music/money.mp3'
    }, 
    {
        'name': 'Robbie Williams - Road to Mandalay',
        'duration': '3:57',
        'url': 'dist/music/mandalay.mp3'
    }, 
    {
        'name': 'Sinnead O Connor - Nothing Compares 2 U',
        'duration': '4:40',
        'url': 'dist/music/nothingcompares.mp3'
    }
];
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

trackUrls = shuffle(trackUrls);
//make a new player
var audioPlayer = new AudioPlayer();
audioPlayer.setPlaylist(trackUrls);

//append the player
$('.audio-player-container').append(audioPlayer.getHtml());

function initFire() {
    var fireworkContainer = document.getElementById("fireworksContainer");
    var timeContainer = document.getElementById("timeContainer");

    fireworkContainer.style.display = "block";
    timeContainer.style.display = "none";
    'use strict'

    const PI2 = Math.PI * 2
    let random = (min, max) => Math.random() * (max - min + 1) + min | 0

    class Birthday {
        constructor() {
            this.resize()

            // create a lovely place to store the firework
            this.fireworks = []
            this.counter = 0

        }
        resize() {
            this.width = canvas.width = window.innerWidth
            let center = this.width / 2 | 0
            this.spawnA = center - center / 4 | 0
            this.spawnB = center + center / 4 | 0

            this.height = canvas.height = window.innerHeight
            this.spawnC = this.height * .1
            this.spawnD = this.height * .5

        }
        onClick(evt) {
            let x = evt.clientX || evt.touches && evt.touches[0].pageX
            let y = evt.clientY || evt.touches && evt.touches[0].pageY

            let count = random(3, 5)
            for (let i = 0; i < count; i++) this.fireworks.push(new Firework(
                random(this.spawnA, this.spawnB),
                this.height,
                x,
                y,
                random(300, 450),
                random(30, 110)))

            this.counter = -30

        }
        update() {
            ctx.globalCompositeOperation = 'hard-light'
            ctx.fillStyle = 'rgba(20,20,20,0.15)'
            ctx.fillRect(0, 0, this.width, this.height)

            ctx.globalCompositeOperation = 'lighter'
            for (let firework of this.fireworks) firework.update()

            // if enough time passed... create new new firework
            if (++this.counter === 15) {
                this.fireworks.push(new Firework(
                    random(this.spawnA, this.spawnB),
                    this.height,
                    random(0, this.width),
                    random(this.spawnC, this.spawnD),
                    random(300, 450),
                    random(30, 110)))
                this.counter = 0
            }

            // remove the dead fireworks
            if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

        }
    }

    class Firework {
        constructor(x, y, targetX, targetY, shade, offsprings) {
            this.dead = false
            this.offsprings = offsprings

            this.x = x
            this.y = y
            this.targetX = targetX
            this.targetY = targetY

            this.shade = shade
            this.history = []
        }
        update() {
            if (this.dead) return;

            let xDiff = this.targetX - this.x
            let yDiff = this.targetY - this.y
            if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
                this.x += xDiff / 20
                this.y += yDiff / 20

                this.history.push({
                    x: this.x,
                    y: this.y
                })

                if (this.history.length > 20) this.history.shift()

            } else {
                if (this.offsprings && !this.madeChilds) {

                    let babies = this.offsprings / 2;
                    for (let i = 0; i < babies; i++) {
                        let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
                        let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

                        birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))

                    }

                }
                this.madeChilds = true
                this.history.shift()
            }

            if (this.history.length === 0) this.dead = true
            else if (this.offsprings) {
                for (let i = 0; this.history.length > i; i++) {
                    let point = this.history[i]
                    ctx.beginPath()
                    ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
                    ctx.arc(point.x, point.y, 1, 0, PI2, false)
                    ctx.fill()
                }
            } else {
                ctx.beginPath()
                ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
                ctx.arc(this.x, this.y, 1, 0, PI2, false)
                ctx.fill()
            }

        }
    }

    let canvas = document.getElementById('birthday')
    let ctx = canvas.getContext('2d')

    let birthday = new Birthday
    window.onresize = () => birthday.resize()
    document.onclick = evt => birthday.onClick(evt)
    document.ontouchstart = evt => birthday.onClick(evt)

    ;
    (function update() {
        requestAnimationFrame(update)
        birthday.update()

    }())


    var seq = 0;
    var fireworkTxtContainer = document.getElementById("fireworkTxt");

    var txtSequence = [
        "Lai tvirtas žingsnis nesustoja,", "Lai darbščios rankos gėrį sėja –", "Gyvenimą tik įpusėjai.", "Sveikinimai Tėčiui su gimtadieniu nuo sūnaus :)", ""
    ];



    var timer = setInterval(function () {
        fireworkTxtContainer.innerHTML = txtSequence[seq];
        seq++;
        if (txtSequence.length - seq == 0) {
            fireworkContainer.style.display = "none";
            timeContainer.style.display = "block";
            // document.getElementById('birthday').innerHTML
            clearInterval(timer);
        }
        console.log(seq);
    }, 10000);
}