
// work space
/**
 * Render songs
 * Scroll top
 * Play/ Pause / Seek
 * CD rotate 
 * Next / Prev
 * Random
 * Next / Repeat When Ended
 * Active song
 * Scroll active song into view
 * Play song when click 
**/

const $ = document.querySelector.bind(".document");
const $$ = document.querySelectorAll.bind(".document");

const name = document.querySelector ('.display-now--name');
const audio  = document.querySelector ('.audio')
const thumb = document.querySelector ('#thumbnail');
const playBtn = document.querySelector('.play')
const pauseBtn = document.querySelector('.pause')
const range = document.querySelector('#progress');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
const randomBtn = document.querySelector('.randomBtn')
const repeatBtn = document.querySelector('.rotateBtn')
const songPlay = document.querySelector('.song')
const playList = document.querySelector('.play-list')


    const app = {
        currentIndex : 0,
        isRandom :false,
        isRotate : false,
        songs: [
            {
                name: 'Hoa Hai Duong',
                singer: 'Jack',
                path: '/audio/audio_hoa-hai-duong.mp3',
                image:"/image/hoa-hai-duong.jpeg"
            },
            {
                name: 'Khue Moc Lang',
                singer: 'Bind',
                path: '/audio/audio_khue-moc-lang.mp3',
                image:"/image/khue-moc-lang.jpeg"
            },
            {
                name: 'Roi Toi Luon',
                singer: 'Nal',
                path: '/audio/audio_roi-toi-luon.mp3',
                image:"/image/roi-toi-luon.jpeg"
            },
            {
                name: 'Thien Dang',
                singer: 'Wowy',
                path: '/audio/audio_thien-dang.mp3',
                image:"/image/thien-dang.jpeg"
            },
            {
                name: 'Thuong Nhau Toi ben',
                singer: 'Bal',
                path: '/audio/audio_thuong-nhau-toi-ben.mp3',
                image:"/image/thuong-nhau-toi-ben.jpeg"
            },
            {
                name: 'Y Chang Xuan Sang',
                singer: 'Bind',
                path: '/audio/audio_y-chang-xuan-sang.mp3',
                image:"/image/y-chang-xuan-sang.jpeg"
            },
            {
                name:'Tinh Ca Tinh Ta',
                singer:'Mees',
                path:'/audio/tinh_ca_tinh_ta_kis_lyrics_video_meens_-6291178936902741829.mp3',
                image:'/image/tinh-ca-tinh-ta.jpg'
            },
            {
                name:'Breathe',
                singer: 'Mackenzie Ziegler',
                path:'/audio/breathe.mp3',
                image:"/image/breathe.jpg",
            },
            {
                name:'Telescope ',
                singer: 'Tim Legend ft. Transviolet',
                path:'/audio/telescrope.mp3',
                image:"/image/telescope.jpg",
            },
            
    ],
// render ra các bài hát trong API
    render: function () {
        const htmls = this.songs.map(function(song,index) {
            return `
            <div class="song ${index === app.currentIndex ? 'active2' :''}"data-index ="${index}">
                <img class="song-img" src="${song.image}" alt="">
                <div class="song-display">
                    <h2 class="song-name">
                    ${song.name}
                    </h2>
                    <h3 class="song-author"> ${song.singer}</h3>
                </div>
                <svg class="song-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"/></svg>
            </div>
            `
        })
        document.querySelector('.play-list').innerHTML = htmls.join('');
    },


        // Định nghĩa ra currenSong đẻ ném vào this.defineProperties
        defineProperties: function () {
            Object.defineProperty (this, 'currentSong' ,{
                get : function (){
                    return this.songs[this.currentIndex]
                }
            })
        },
      
        handelEvents :function () {
            const _this = this;
            const cd  = document.querySelector('.cd')
            const cdWidth = cd.offsetWidth;
            const thumbAnimate = thumb.animate([
                {
                   transform : "rotate(360deg)" 
                }
            ],{
                duration :10000,
                interation : Infinity,
            })
            thumbAnimate.pause(),
        
            // hiệu ứng khi scroll web
            document.onscroll = function () {
          const scrollTop =  window.scrollY || document.documentElement.scrollTop;
          const newCdWidth = cdWidth - scrollTop;
 
          cd.style.width =newCdWidth > 0 ? newCdWidth + 'px' : 0;
          cd.style.opacity = newCdWidth / cdWidth;
       }

       // Xử Lý khi play
            playBtn.onclick = function () {
                audio.play()
                playBtn.style.display = "none";
                pauseBtn.style.display = "block"
                thumbAnimate.play()
            },

            //click nút pause để dừng bài hát
            pauseBtn.onclick = function () {
                playBtn.style.display = "block" ;
                pauseBtn.style.display = "none";
                audio.pause();
                thumbAnimate.pause()

            }
        // Khi bài hát được chạy 
            audio.ontimeupdate = function () {
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime * 100 / audio.duration)
                    range.value = progressPercent;
                }
                
            }

            // xử lý khi tua song 
            range.onchange = function (e) {
                const seekTime = e.target.value * audio.duration /100;
                audio.currentTime = seekTime;
                audio.play()
                pauseBtn.style.display = "block";
                playBtn.style.display = "none";
                
            }
            // Click nút next để chuyển sang bài tiếp theo 
            nextBtn.onclick = function () {
                if(_this.isRandom) {
                _this.randomSong()
                }else{
                    _this.nextSong()
                }
                audio.play()
                playBtn.style.display = "none"
                pauseBtn.style.display = "block"
                _this.render()
                _this.scrollActiveSong()
                thumbAnimate.play()
            }
            // Click nut prev để back về bài trước
            prevBtn.onclick = function () {
                if(_this.isRandom) {
                _this.randomSong()
                }else{
                    _this.prevSong()
                }
                audio.play()
                playBtn.style.display = "none"
                pauseBtn.style.display = "block"             
                _this.render()
                _this.scrollActiveSong()
                thumbAnimate.play()
            }
            randomBtn.onclick = function () {
                _this.isRandom = !_this.isRandom
                randomBtn.classList.toggle('active' , _this.isRandom)
            }
            repeatBtn.onclick = function () {
                _this.isRotate = !_this.isRotate
                repeatBtn.classList.toggle('active' ,_this.isRotate)
            }
            audio.onended = function () {
                if(_this.isRotate) {
                    audio.play()
                }else{
                    nextBtn.onclick()
                }
            }
            songPlay.onclick = function (e) {
                console.log(e.target)
            }

            // Lắng nghe sự kiện click trong play-list
            playList.onclick = function (e) {
                const songNode  = e.target.closest('.song:not(.active2)')
                if (songNode || e.target.closest('.song-icon')){
                    if(songNode) {
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.loadCurrentSong()
                        _this.render()
                        audio.play()
                        playBtn.style.display = "none"
                        pauseBtn.style.display = "block"
                        thumbAnimate.play()
                    }
                }
            }
            
           
    },

    scrollActiveSong : function () {
        if(this.currentIndex === 0 || this.currentIndex === 1 || this.currentIndex === 2) {
            setTimeout(function() {
                document.querySelector('.song.active2').scrollIntoView({
                    behavior : 'smooth',
                    block : 'center',
                    inline :'center'
                })
               },200)
        }else{
            setTimeout(function() {
             document.querySelector('.song.active2').scrollIntoView({
                 behavior : 'smooth',
                 block : 'nearest',
                 inline :'nearest'
             })
            },200)
        }
    },
    // Load bài hát
    loadCurrentSong : function (){
        name.textContent = this.currentSong.name;
        thumb.src = this.currentSong.image;
        audio.src = this.currentSong.path;
    },

    // function để thực thi bài hát tiếp theo
    nextSong : function () {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },
    // funtion để thực thi bài hát đằng trước
    prevSong : function () {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length-1;
        }
        this.loadCurrentSong()
       
    },
    randomSong : function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex  === this.currentIndex)
            this.currentIndex = newIndex
            this.loadCurrentSong()

    },


    // bắt đầu chương trình (nơi chứa những function)
    start : function () {
        // Định nghĩa ra các thuộc tính của Object  
        this.defineProperties()

        //Lắng nghe và xử lý các sự kiện 
        this.handelEvents()


        // tải bài hát đầu tiên lên UI
        this.loadCurrentSong()
        
        // Render lại cái playtlist
        this.render()   

    },


}
app.start()




