let all_music = [{
        name: "Harley Bird - Home",
        artist: "Arijit Singh",
        img: "music-1",
        src: "music-1"
    },
    {
        name: "Ikson Anywhere – Ikson",
        artist: "Audio Library",
        img: "music-2",
        src: "music-2"
    },
    {
        name: "Beauz & Jvna - Crazy",
        artist: "Beauz & Jvna",
        img: "music-3",
        src: "music-3"
    },
    {
        name: "Hardwind - Want Me",
        artist: "Mike Archangelo",
        img: "music-4",
        src: "music-4"
    },
    {
        name: "Jim - Sun Goes Down",
        artist: "Neha Kakkar",
        img: "music-5",
        src: "music-5"
    },
    {
        name: "Lost Sky - Vision NCS",
        artist: "NCS Release",
        img: "music-6",
        src: "music-6"
    },

];

var audio_wrapper = document.querySelector(".audio_wrapper");
var audio_wrapper_img = document.querySelector(".playing_img_wrapper img");

var song_name = document.querySelector(".song_name");
var song_aritest = document.querySelector(".song_aritest");
var main_audio = document.querySelector("#main_audio");
var audio_play_wrapper = document.querySelector(".audio_play_wrapper ");
var prev_song = document.querySelector(".prev_song");
var next_song = document.querySelector(".next_song");
var audio_play_icon = document.querySelector(".audio_play_wrapper span");
var audio_list_wrapper = document.querySelector(".audio_list_wrapper");
var playlist = document.querySelector(".playlist");
var close_icon = document.querySelector(".close");
var audio_progress = document.querySelector(".audio_progress");
var audio_bar_wrapper = document.querySelector(".audio_bar_wrapper");
var all_music_index = Math.floor(Math.random() * all_music.length) + 1;

window.addEventListener("load", () => {
    defult_contant(all_music_index);
    play_li_song();
})
var volume = document.querySelector(".volume")

function voleum() {
    main_audio.volume = volume.value / 100

}

function defult_contant(all_music_index) {
    audio_wrapper_img.src = `images/${all_music[all_music_index-1].img}.jpg`;
    song_name.innerText = `${all_music[all_music_index-1].name}`;
    song_aritest.innerText = `${all_music[all_music_index-1].artist}`;
    try {
        main_audio.src = `songs/${all_music[all_music_index-1].src}.mp3`;

    } catch (error) {

        // console.log(error)
    }

}

function play() {
    audio_wrapper.classList.add("paused");
    audio_play_icon.innerText = "pause";
    main_audio.play();
    voleum();
}

function pased() {

    audio_wrapper.classList.remove("paused");
    audio_play_icon.innerText = "play_arrow";
    main_audio.pause();
}

audio_play_wrapper.addEventListener("click", () => {
    var condition = audio_wrapper.classList.contains("paused");
    condition ? pased() : play();

})

function prev() {

    all_music_index--;
    all_music_index < 1 ? all_music_index = all_music.length : all_music_index = all_music_index;
    defult_contant(all_music_index);
    play();

}
prev_song.addEventListener("click", () => {
    prev();
    play_li_song();
})

function next() {
    all_music_index++;
    all_music_index > all_music.length ? all_music_index = 1 : all_music_index = all_music_index;
    defult_contant(all_music_index);
    play();


}

next_song.addEventListener("click", () => {
    next();
    play_li_song();

})

playlist.addEventListener("click", () => {
    audio_list_wrapper.style.marginTop = "-300px";

})
close_icon.addEventListener("click", () => {
    audio_list_wrapper.style.marginTop = "0px";

})


main_audio.addEventListener("timeupdate", () => {

    var audio_total_time = main_audio.duration;
    var audio_current_duration = main_audio.currentTime;
    var progress_width = ((audio_current_duration / audio_total_time) * 100) + "%";
    audio_progress.style.width = progress_width;
    // max time start 
    main_audio.addEventListener("loadeddata", () => {
            var max_timer = document.querySelector(".max_timer");

            var audio_total_duratioin = Math.floor(main_audio.duration / 60);
            var audio_total_duratioin_secend = Math.floor(main_audio.duration % 60);

            if (10 > audio_total_duratioin_secend) {
                audio_total_duratioin_secend = "0" + audio_total_duratioin_secend;
            }
            max_timer.innerText = `${audio_total_duratioin}:${audio_total_duratioin_secend}`;

        })
        // max time end

    var current_timer = document.querySelector(".current_timer");
    var audio_current_minet = Math.floor(audio_current_duration / 60);
    var audio_current_sceend = Math.floor(audio_current_duration % 60);

    if (10 > audio_current_sceend) {
        audio_current_sceend = "0" + audio_current_sceend;
    }
    current_timer.innerText = `${audio_current_minet}:${audio_current_sceend}`;

})


audio_bar_wrapper.addEventListener("click", e => {
    var audio_progress_width = audio_bar_wrapper.clientWidth;
    var audio_progress_offsetX = e.offsetX;
    var audio_total_time = main_audio.duration;
    // console.log(main_audio.currentTime)
    main_audio.currentTime = (audio_progress_offsetX / audio_progress_width) * audio_total_time;
    play();

    // console.log((audio_progress_offsetX / audio_progress_width))
})

var repeat = document.querySelector(".repeat");
repeat.addEventListener("click", e => {
    var get_text = repeat.innerText;

    switch (get_text) {
        case "repeat":
            repeat.innerHTML = 'repeat_one';
            break;
        case "repeat_one":
            repeat.innerHTML = 'shuffle';
            break;
        case "shuffle":
            repeat.innerHTML = 'repeat';
            break;


    }
})

main_audio.addEventListener("ended", () => {
    var get_text = repeat.innerText;
    switch (get_text) {
        case "repeat":
            next();
            play_li_song();
            break;
        case "repeat_one":
            main_audio.currentTime = 0;
            play();
            play_li_song();
            break;
        case "shuffle":

            var random_index = Math.floor(Math.random() * all_music.length) + 1;
            do {
                random_index = Math.floor(Math.random() * all_music.length) + 1;
            } while (all_music_index == random_index);
            all_music_index = random_index
            defult_contant(all_music_index);
            play();
            play_li_song();
            break;


    }
})
var ul_tag = document.querySelector(".audio_list");

for (let i = 0; i < all_music.length; i++) {
    //let's pass the song name, artist from the array
    let li_tag = `<li index="${i + 1}">
                <div class="row">
                  <span>${all_music[i].name}</span>
                  <p>${all_music[i].artist}</p>
                </div>
                <span id="${all_music[i].src}" class="audio_palying"></span>
                <audio class="${all_music[i].src}" src="songs/${all_music[i].src}.mp3"></audio>
                
              </li>`;
    ul_tag.insertAdjacentHTML("beforeend", li_tag);
    let li_audio_tag = document.querySelector(`.${all_music[i].src}`);
    let li_audio_duration = document.querySelector(`#${all_music[i].src}`);
    li_audio_tag.addEventListener("loadeddata", () => {
        var li_audio_total_time = li_audio_tag.duration;
        var li_audio_total_menit = Math.floor(li_audio_total_time / 60);
        var li_audio_total_sceend = Math.floor(li_audio_tag.duration % 60);


        if (10 > li_audio_total_sceend) {
            li_audio_total_sceend = "0" + li_audio_total_sceend;
        }

        li_audio_duration.innerHTML = `${li_audio_total_menit}:${li_audio_total_sceend}`;


        var set_audio_time_duration = `${li_audio_total_menit}:${li_audio_total_sceend}`;

        li_audio_duration.setAttribute("time-duration", set_audio_time_duration)

    });
}


function play_li_song() {
    var ul_inner_li_tag = document.querySelectorAll(".audio_list li");
    var audio_playing_active = document.querySelectorAll(".audio_palying");
    for (let i = 0; i < ul_inner_li_tag.length; i++) {

        if (ul_inner_li_tag[i].classList.contains("playing_active")) {
            ul_inner_li_tag[i].classList.remove("playing_active")
            audio_playing_active[i].innerHTML = audio_playing_active[i].getAttribute("time-duration");
        }
        if (ul_inner_li_tag[i].getAttribute("index") == all_music_index) {
            ul_inner_li_tag[i].classList.add("playing_active");
            audio_playing_active[i].innerHTML = "Playing";

        }
        ul_inner_li_tag[i].setAttribute("onclick", "myFunction(this)")

    }


}



function myFunction(element) {
    var li_index = element.getAttribute("index");
    all_music_index = li_index;
    defult_contant(all_music_index);
    play()
    play_li_song();


}