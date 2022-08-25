const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const body = $('body')
const name_chanel = $('.name_chanel')
const content_video = $('.content_video')
const btn_play_vid = $('.play_vid i')
const btn_play_vid_center_video = $('.btn_play')
const play_vid = $$('.play_vid p')
const avatar = $('.avatar')
const url_chaner = $('.img_avatar a')
const like_video = $('.like_video').children
const comment_video = $('.comment_video').children
const following_video = $('.following_video').children
const video = $('video')
const background_video = $('.show-video')
const progress = $('#progress')
const auto_replay = $('input#Auto_Replay')
const speed = $('.speed_video')
const speed_value = $$('.speed_video select option')
const value_volume = $('#value_volume')
const btn_value_volume = $('.volume_video i')
const btn_zoom_screen_web = $('.zoom_screen_web')
const btn_zoom_max = $('.zoom_f11')
const video_next = $('.video_next')
const video_previous = $('.video_previous')
const show_menu_in_media = $('.media_1024')
const menu_hide_media = $('.menu_hide')

var setTimeVideo, setValueProgress


const app = {
    curentIndex: 0,
    play_video: true,
    replay: true,
    speed: 1,
    volume: 100,
    can_play_video_if_scroll: true,
    play_list: [{
        name_chanel: '@test',
        url_chaner: 'https://www.douyin.com/user/MS4wLjABAAAApbDcjk1aeuB_D3pNRzmbpnJN01Fl1GBG_fxjxguWsfIWHEbDuFE90cDZa-e7Ue_t?vid=7128307066879380769',
        image_avatar: 'avata1.jpeg',
        title_video: 'test',
        url_video: 'xichdu.mp4',
        background_video: 'xichdu.png',
        like: true,
        follow_chanel: true,
        number_of_likes: '49.8w',
        number_of_comment: '3.5w',
        number_of_follow_chanel: '2.9w'
    },
    {
        name_chanel: '@库库',
        url_chaner: 'https://www.douyin.com/user/MS4wLjABAAAApbDcjk1aeuB_D3pNRzmbpnJN01Fl1GBG_fxjxguWsfIWHEbDuFE90cDZa-e7Ue_t?vid=7128307066879380769',
        image_avatar: 'avata1.jpeg',
        title_video: '限定双马尾小狐狸返场',
        url_video: 'zebra_girl.mp4',
        background_video: 'zebra_girl.png',
        like: false,
        follow_chanel: true,
        number_of_likes: '11.9w',
        number_of_comment: '7874',
        number_of_follow_chanel: '4434'
    },
    {
        name_chanel: '@一只七.',
        url_chaner: 'https://www.douyin.com/user/MS4wLjABAAAAWnBtrKfO6UkmwuoxAb6y8s-ZefL23gbC_cyrPM2BxdxzljfxBGxcTj6Md4svJjt1?enter_from=recommend&enter_method=video_title&from_gid=7127217403280264483&is_full_screen=0&vid=7127217403280264483',
        image_avatar: 'girl_seven_teen.jpeg',
        title_video: '该吃吃该喝喝 有事儿没事儿多想哥',
        url_video: 'girl_seven_teen.mp4',
        background_video: 'girl_seven_teen.png',
        like: true,
        follow_chanel: true,
        number_of_likes: '15.4w',
        number_of_comment: '4033',
        number_of_follow_chanel: '1.7w'
    },
    {
        name_chanel: '@幻ゝ',
        url_chaner: 'https://www.douyin.com/user/MS4wLjABAAAA_8Mw3xh1Jed-XvS27NvML0BxeHUrcMTiHVzi8y6bDzk?enter_from=recommend&enter_method=video_title&from_gid=7090086925868027171&is_full_screen=0&vid=7090086925868027171',
        image_avatar: 'supper_tom&jerry.jpeg',
        title_video: ' 谁教你这么剪视频的 现在热度应该降下去叻',
        url_video: 'supper_tom&jerry.mp4',
        background_video: 'supper_tom&jerry.png',
        like: false,
        follow_chanel: false,
        number_of_likes: '2374',
        number_of_comment: '133',
        number_of_follow_chanel: '157'
    },
    {
        name_chanel: '@CarTops「超清4K」',
        url_chaner: 'https://www.douyin.com/user/MS4wLjABAAAA6t_Oy2GPUz9YGy0KkXQTT0BBjSLQPBsYvt9WDRlU_-IRW7NtGhTOV93V2ySHoGks?enter_from=recommend&enter_method=video_title&from_gid=7111275943641058595&is_full_screen=0&vid=7122690449084534052',
        image_avatar: 'car.jpeg',
        title_video: '召唤一个能给你买这个车的人！',
        url_video: 'car.mp4',
        background_video: 'car.png',
        like: false,
        follow_chanel: true,
        number_of_likes: '1.2w',
        number_of_comment: '504',
        number_of_follow_chanel: '786'
    },
    {
        name_chanel: '@PLAN^',
        url_chaner: 'https://www.douyin.com/user/MS4wLjABAAAAAkNzq0RMFtgNcQ8yvfBLgxQKAeB-bbNOsIRKFenVghnmwbfHwOjsjvVGX_dyhPXa?enter_from=recommend&enter_method=video_title&from_gid=7120980147351702797&is_full_screen=0&vid=7120980147351702797',
        image_avatar: 'penguin_catoon.jpeg',
        title_video: '企鹅特工准则第一条：为了兄弟能屈能伸',
        url_video: 'penguin_catoon.mp4',
        background_video: 'penguin_catoon.png',
        like: false,
        follow_chanel: false,
        number_of_likes: '4636',
        number_of_comment: '158',
        number_of_follow_chanel: '519'
    }],
    defineProperties: function () {
        Object.defineProperty(this, 'currentVideo', {
            get: function () {
                return this.play_list[this.curentIndex]
            }
        })

        auto_replay.checked = this.replay
    },

    handleEvent: function () {

        background_video.onclick = (e) => {
            if (e.target === $('.glass') || e.target === video || e.target === btn_play_vid || e.target === btn_play_vid_center_video.children[0]) {
                this.play_video ? video.pause() : video.play()
                this.play_video = !this.play_video
            }
        }
        body.onclick = (e) => {
            body_onclick(e)
        }
        function body_onclick(e) {
            if (e.target !== btn_value_volume) {
                value_volume.classList.contains('visible') ? value_volume.classList.remove("visible")
                    : ""
            }
            if (e.target !== speed.children[0]) {
                speed.children[1].classList.contains('visible') ? speed.children[1].classList.remove("visible")
                    : ""
            }
        }

        progress.onchange = (e) => {
            video.currentTime = e.target.value / 100 * video.duration
        }

        auto_replay.onclick = () => {
            this.replay = !this.replay
        }

        speed.children[0].onclick = (e) => {
            speed.children[1].classList.contains('visible') ? speed.children[1].classList.remove("visible")
                : speed.children[1].classList.add("visible")
        }

        speed_value.forEach((value) => {
            value.onclick = (e) => {
                this.speed = Number(e.target.value)
                video.playbackRate = this.speed;
                speed.children[1].classList.remove("visible")
                speed.children[0].textContent = e.target.value + 'x'
                clearInterval(setTimeVideo)
                clearInterval(setValueProgress)
                // đặt thời gian chạy của video
                setTimeVideo = setInterval(settimevideo, 1000 / this.speed)
                function settimevideo() {
                    let timevideo = video.currentTime
                    play_vid[0].textContent = app.cal_time(timevideo)
                }

                setValueProgress = setInterval(setvalueprogress, video.duration * 10 / this.speed)
                function setvalueprogress() {
                    progress.value = Number(progress.value) + 1
                }
                video.play()
            }
        })

        btn_value_volume.onclick = (e) => {
            value_volume.classList.contains('visible') ? value_volume.classList.remove("visible")
                : value_volume.classList.add("visible")
        }

        value_volume.onchange = (e) => {
            this.volume = Number(e.target.value)
            video.volume = this.volume / 100
            value_volume.classList.remove("visible")
            this.volume > 75 ? btn_value_volume.classList = 'fa-solid fa-volume-high'
                : this.volume > 30 ? btn_value_volume.classList = 'fa-solid fa-volume-low'
                    : this.volume > 0 ? btn_value_volume.classList = 'fa-solid fa-volume-off'
                        : btn_value_volume.classList = 'fa-solid fa-volume-xmark'

        }

        btn_zoom_screen_web.onclick = () => {
            // thu nho
            if (btn_zoom_screen_web.classList.contains('fa-compress')) {
                document.webkitExitFullscreen()
                background_video.classList.remove('zoom_video')
                btn_zoom_screen_web.classList.replace('fa-compress', 'fa-expand')
                btn_zoom_max.classList.replace('fa-minimize', 'fa-maximize')
            }
            // phong to
            else {
                background_video.classList.add('zoom_video')
                btn_zoom_screen_web.classList.replace('fa-expand', 'fa-compress')
                btn_zoom_max.classList.replace('fa-maximize', 'fa-minimize')
            }

        }

        btn_zoom_max.onclick = () => {

            if (btn_zoom_max.classList.contains('fa-minimize')) {
                // thu nho screen f11 (esc)
                document.webkitExitFullscreen()
                background_video.classList.remove('zoom_video')
                btn_zoom_screen_web.classList.replace('fa-compress', 'fa-expand')
                btn_zoom_max.classList.replace('fa-minimize', 'fa-maximize')
            }
            else {
                // phong to screen f11
                document.body.webkitRequestFullScreen()
                background_video.classList.add('zoom_video')
                btn_zoom_max.classList.replace('fa-maximize', 'fa-minimize')
                btn_zoom_screen_web.classList.replace('fa-expand', 'fa-compress')
            }
        }

        like_video[0].onclick = (e) => {
            app.play_list[app.curentIndex].like = !app.play_list[app.curentIndex].like
            like_video[0].classList.toggle('like_active')
            let number = like_video[1].textContent
            if (!isNaN(Number(number))) {
                if (like_video[0].classList.contains('like_active')) {
                    like_video[1].textContent = String(Number(number) + 1)
                }
                else {
                    like_video[1].textContent = String(Number(number) - 1)
                }
            }
        }
        following_video[0].onclick = (e) => {
            app.play_list[app.curentIndex].follow_chanel = !app.play_list[app.curentIndex].follow_chanel
            following_video[0].classList.toggle('follow_active')
            let number = following_video[1].textContent
            if (!isNaN(Number(number))) {
                if (following_video[0].classList.contains('follow_active')) {
                    following_video[1].textContent = String(Number(number) + 1)
                }
                else {
                    following_video[1].textContent = String(Number(number) - 1)
                }
            }
        }

        window.addEventListener('wheel', checkScrollDirection);
        function checkScrollDirection(event) {
            value_volume.classList.remove("visible")
            speed.children[1].classList.remove("visible")
            if (event.wheelDelta > 0 && app.can_play_video_if_scroll) {
                app.previous_video()
            } else {
                if (app.can_play_video_if_scroll) {
                    app.next_video()
                }
            }
        }
        let number_space = false
        window.onkeyup = (e) => {
            value_volume.classList.remove("visible")
            speed.children[1].classList.remove("visible")
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 27:
                    // esc
                    // thu nho screen f11 (esc)
                    document.webkitExitFullscreen()
                    background_video.classList.remove('zoom_video')
                    btn_zoom_screen_web.classList.replace('fa-compress', 'fa-expand')
                    btn_zoom_max.classList.replace('fa-minimize', 'fa-maximize')
                    break;
                case 32:
                    // space
                    number_space = !number_space
                    console.log(number_space);
                    number_space ? video.play() : video.pause()
                    break;
                case 38:
                    // up
                    if (app.can_play_video_if_scroll) {
                        app.previous_video()
                    }
                    break;
                case 40:
                    // down
                    if (app.can_play_video_if_scroll) {
                        app.next_video()
                    }
                    break;
            }
        }

        show_menu_in_media.onclick = () => {
            menu_hide_media.classList.toggle('menu_media_show')
        }


    },
    previous_video: function () {
        progress.value = 0
        app.curentIndex == 0 ? app.curentIndex = app.play_list.length - 1 : app.curentIndex -= 1
        video_previous.style.backgroundImage = `url('image/${this.currentVideo.background_video}')`
        background_video.classList.add('animate_previous_video')
        app.loadVideo()
        setTimeout(() => {
            background_video.classList.remove('animate_previous_video')
        }, 800);
        app.can_play_video_if_scroll = false
        setTimeout(() => {
            app.can_play_video_if_scroll = true
        }, 800);
    },
    next_video: function () {
        progress.value = 0
        app.curentIndex === app.play_list.length - 1 ? app.curentIndex = 0 : app.curentIndex += 1
        video_next.style.backgroundImage = `url('image/${this.currentVideo.background_video}')`
        background_video.classList.add('animate_next_video')
        app.loadVideo()
        setTimeout(() => {
            background_video.classList.remove('animate_next_video')
        }, 800);
        app.can_play_video_if_scroll = false
        setTimeout(() => {
            app.can_play_video_if_scroll = true
        }, 800);
    },
    // chuyen doi giay sang phut:giay
    cal_time: function (time) {
        let check_2_so = function (time) {
            return time > 9 ? time.toString() : '0' + time
        }
        let phut = check_2_so(Math.floor(time / 60))
        let giay = check_2_so(Math.floor(time % 60))
        return phut + ':' + giay
    },

    loadVideo: function () {
        name_chanel.textContent = this.currentVideo.name_chanel
        content_video.textContent = this.currentVideo.title_video
        video.src = 'video/' + this.currentVideo.url_video



        // khi video duoc phat

        video.onplay = () => {
            console.log('video play');
            btn_play_vid.classList.remove('fa-play')
            btn_play_vid.classList.add('fa-pause')
            btn_play_vid_center_video.classList.add('hide')
            progress.value == 100 ? progress.value = 0 : ''
            play_vid[0].textContent = '00:00'
            // đặt thời gian chạy của video
            clearInterval(setTimeVideo)
            clearInterval(setValueProgress)

            setTimeVideo = setInterval(settimevideo, 1000 / this.speed)
            function settimevideo() {
                let timevideo = video.currentTime
                play_vid[0].textContent = app.cal_time(timevideo)
            }

            setValueProgress = setInterval(setvalueprogress, video.duration * 10 / this.speed)
            function setvalueprogress() {
                progress.value = Math.ceil(video.currentTime / (video.duration / 100))
            }
        }
        // khi video dung hoac ket thuc
        video.onpause = () => {
            console.log('video pause');
            btn_play_vid.classList.add('fa-play')
            btn_play_vid.classList.remove('fa-pause')
            btn_play_vid_center_video.classList.remove('hide')
            clearInterval(setTimeVideo)
            clearInterval(setValueProgress)
            if (video.currentTime === video.duration) {
                play_vid[0].textContent = app.cal_time(video.duration)
                if (this.replay) {
                    video.play()
                }
                else {
                    // next video
                    this.next_video()
                }

            }

        }

        // khi video duoc load xong
        video.onloadedmetadata = () => {
            const timevideo = video.duration;
            play_vid[2].textContent = this.cal_time(timevideo)
            video.playbackRate = this.speed;
            video.volume = this.volume / 100
        }
        video.oncanplay = () => {
            video.play()
        }
        background_video.style.backgroundImage = `url('image/${this.currentVideo.background_video}')`
        avatar.src = 'image/' + this.currentVideo.image_avatar
        url_chaner.href = this.currentVideo.url_chaner
        if (this.currentVideo.like) {
            like_video[0].classList.add('like_active')
        }
        else {
            like_video[0].classList.remove('like_active')
        }
        like_video[1].textContent = this.currentVideo.number_of_likes
        comment_video[1].textContent = this.currentVideo.number_of_comment
        if (this.currentVideo.follow_chanel) {
            following_video[0].classList.add('follow_active')
        } else {
            following_video[0].classList.remove('follow_active')
        }
        following_video[1].textContent = this.currentVideo.number_of_follow_chanel
        value_volume.value = this.volume
    },

    start: function () {
        // định nghĩa các thuộc tính cho object
        this.defineProperties()

        // thêm các even cho video
        this.handleEvent()

        // render video
        this.loadVideo()
    }
}

app.start()
