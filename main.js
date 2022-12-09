// плейлист (массив)
var playList = [
    "Beautiful Life.mp3",
    "Claude Darzotti - Le chant des solitaries.mp3",
    "Dalida - Besame mucho.mp3",
]

var playList1 = playList.slice(0);
var currentAudio = 0;
var audio = document.getElementById("audio");
var musicName = document.getElementById("name");
var playBtn = document.getElementById("play");
var nextBtn = document.getElementById("forward");
var previousBtn = document.getElementById("backward");
var repeat = document.getElementById("repeat");
var shuffle = document.getElementById("shuffle");
var lableC = document.querySelector(".play");
var progress = document.querySelector(".progress");
var progressConteiner = document.querySelector(".progress__container");
var volume_slider = document.querySelector(".volume_slider");


// назначает изначальную песню из плейлиста
audio.src = "audio/" + playList1[currentAudio];

// отображает название песни
musicName.innerText = playList1[currentAudio];

// назначаем онклик на кнопки "Play(Pause), Next, Previous, Shuffle" соответствующие функции
playBtn.onclick = play;
nextBtn.onclick = next;
previousBtn.onclick = previous;
shuffle.onclick = sorting;

// функция сортировки массива с песнями (если отжимаем чек-бокс назад, то снова порядок становится по алфавиту как было в начале)
function sorting() {
    if (shuffle.checked) {
        playList1.sort(() => Math.random() - 0.5);
    } else {
        playList1 = playList.slice(0);
    }
}

// функция запуска аудио
function play() {
    playBtn.title = "Pause";
    playBtn.onclick = pause;
    audio.play();
    random_bg_color()
}

// функция паузы аудио
function pause() {
    playBtn.title = "Play";
    playBtn.onclick = play;
    audio.pause();
}

// функция "Вперед" = onclick по кнопке "Forward" (вперед)
function next() {
    currentAudio++;
    if (currentAudio >= playList1.length) {
        if (repeat.checked) {
            currentAudio = 0;
        } else {
            currentAudio = playList1.length - 1;
        }
    }
    changeAtributAudio();
}

// функция "Назад" = onclick по кнопке "Backward" (назад)
function previous() {
    currentAudio--;
    if (currentAudio < 0) {
        if (repeat.checked) {
            currentAudio = playList1.length - 1;
        } else {
            currentAudio = 0;
        }
    }
    changeAtributAudio();
}

// изменяет отображаемое аудио и прочее к нему
function changeAtributAudio() {
    playBtn.checked = true;
    playBtn.title = "Pause";
    audio.src = "audio/" + playList1[currentAudio];
    musicName.innerText = playList1[currentAudio];
    playBtn.onclick = pause;
    audio.play();
    random_bg_color()
}

// запускает следующую песню при окончании текущей
audio.addEventListener("ended", next);

// заполняет прогрессБар по мере проигрывания песни (с 0 до 100%)
function progressBar(event) {
    var dur = event.srcElement.duration;
    var cur = event.srcElement.currentTime;
    var percent = (cur / dur) * 100;
    progress.style.width = percent + "%";
}
audio.addEventListener("timeupdate", progressBar);

// перемотка песни при нажатии на прогрессБар
function changeProgressBar(event) {
    var width = 329;  // ширина прогрессБара
    var clickX = event.offsetX;
    var duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
progressConteiner.addEventListener("click", changeProgressBar);

// изменяет громкость музыки (аудио)
function setVolume() {
    audio.volume = volume_slider.value / 100;
}

// функция рандомного заднего фона с градиентом.    // задача с ** (двумя звёздочками) :)))   
function random_bg_color() {
    var hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
    var a;

    function randomHex(a) {
        for (i = 0; i < 6; i++) {
            var x = Math.round(Math.random() * 14);
            var y = hex[x];
            a += y;  // это тоже самое что и "a = a + y"
        }
        return a;
    }
    var Color1 = randomHex("#");
    var Color2 = randomHex("#");
    var gradient = "linear-gradient(to right, " + Color1 + ", " + Color2 + ")";
    document.body.style.background = gradient;
}

