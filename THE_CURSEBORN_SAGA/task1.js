
// document.ready(() => {
//     console.log('hello');
// })
const $_select = document.querySelector.bind(document)
const $_select_all = document.querySelectorAll.bind(document)

const the_characters = $_select('.The_Characters')
const conceptual_artwork = $_select('.conceptual_artwork')
const img_see_our_world = $_select('.img_see_our_world')
const All_img_see_our_world = $_select_all('.img_see_our_world .col-sm-3')
const conceptual_artwork_image = ["images/Layer96.png", "images/Layer97.png", "images/Layer98.png", "images/Layer99.png"]
const Form_Name = $_select('#Form_Name')
const Form_Email = $_select('#Form_Email')
const Form_Message = $_select('#Form_Message')
const btn_send_form = $_select('.btn_send_form')
const arrow_cicle = $_select('.arrow-cicle')
const current_arrow_list = ['#Saga', '#THE_CHARACTERS', '#THE_CREW', '#THE_NOVELLAS', '#SEE_our_world', '#BAZAAR', '#Feel_contact']
var win_screen_x = screen.width
const view_image = $_select('.view_image img')
const view_image_box = $_select('.view_image')
const close = $_select('.close')
const next = $_select('.next')
const previous = $_select('.previous')
const menu_fit_header = $_select('.menu_fit_header')
const hide_menu = $_select('.hide_menu')
const menu_header = $_select('.menu-header')
const menu = $_select_all('.menu')
const carousel_item_chara = $_select_all("#mycarousel .carousel-item")
const carousel_item_nove = $_select_all("#THE_NOVELLAS_dot .carousel-item")

var list = current_arrow_list.map((id) => $_select(id).offsetTop)


document.addEventListener("DOMContentLoaded", function () {

    $(".regular").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
        autoplay: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });




    document.body.addEventListener('scroll', () => {
        let scroll_screen = document.documentElement.scrollTop || document.body.scrollTop
        if (scroll_screen > 100) {
            menu_fit_header.style.backgroundColor = 'rgb(0 0 0 / 70%)'
            menu_fit_header.style.paddingTop = '20px'
            menu_fit_header.style.height = '85px'
            hide_menu.style.top = '30px'
        } else {
            menu_fit_header.style.backgroundColor = 'unset'
            menu_fit_header.style.paddingTop = '54px'
            menu_fit_header.style.height = '119px'
            hide_menu.style.top = '52px'
        }

        if (scroll_screen > list[list.length - 1]) {
            arrow_cicle.classList.add('d-none')
        }
        else {
            arrow_cicle.classList.remove('d-none')
        }
        menu_header.classList.remove('display_unset')
        // active menu
        menu.forEach((value) => {
            value.classList.remove('active-menu')
        })
        if (scroll_screen < list[1] - 85) {
            menu[0].classList.add('active-menu')
        }
        else if (scroll_screen < list[2] - 85) {
            menu[1].classList.add('active-menu')
        }
        else if (scroll_screen < list[3] - 85) {
            menu[5].classList.add('active-menu')
        }
        else if (scroll_screen < list[4] - 85) {
            menu[2].classList.add('active-menu')
        }
        else if (scroll_screen < list[5] - 85) {
            menu[3].classList.add('active-menu')
        }
        else if (scroll_screen < list[6] - 85) {
            menu[4].classList.add('active-menu')
        }
    })


    $_select('.home').onclick = (e) => {
        e.preventDefault()
        document.body.scrollTo(0, 0)
    }
    $_select('.info').onclick = (e) => {
        e.preventDefault()
        document.body.scrollTo(0, list[1] - 84)
    }
    $_select('.thebookseries').onclick = (e) => {
        e.preventDefault()
        document.body.scrollTo(0, list[3] - 84)
    }
    $_select('.seeoutworld').onclick = (e) => {
        e.preventDefault()
        document.body.scrollTo(0, list[4] - 84)
    }
    $_select('.bazaar').onclick = (e) => {
        e.preventDefault()
        document.body.scrollTo(0, list[5] - 84)
    }
    $_select('.thecrew').onclick = (e) => {
        e.preventDefault()
        document.body.scrollTo(0, list[2] - 84)
    }


    hide_menu.onclick = () => {
        // menu_header.style.display = 'unset'
        menu_header.classList.toggle('display_unset')
    }


    // vi trí scroll tat ca phan tu

    arrow_cicle.onclick = () => {

        // let next = list.find((value, index) => { return value > document.body.scrollTop + 10 })
        // if (next !== undefined) {
        //     document.body.scrollTo(0, next)
        // }
        if (screen.width < 400) {
            document.body.scrollTo(0, list[0] - 125)
        }
        else if (screen.width < 800) {
            document.body.scrollTo(0, list[0] - 135)
        }
        else {
            document.body.scrollTo(0, list[0] - 160)
        }


    }

    current_arrow_list.forEach(id => {
        $_select(id).style.width = win_screen_x
    })

    All_img = [...All_img_see_our_world]

    the_characters.onclick = () => {
        while (img_see_our_world.hasChildNodes()) {
            img_see_our_world.removeChild(img_see_our_world.firstChild);
        }
        All_img.forEach((element) => {
            img_see_our_world.appendChild(element)
        })

        the_characters.classList.add("active_the_characters")
        conceptual_artwork.classList.remove("active_the_characters")

    }
    conceptual_artwork.onclick = () => {

        while (img_see_our_world.hasChildNodes()) {
            img_see_our_world.removeChild(img_see_our_world.firstChild);
        }
        conceptual_artwork_image.forEach((element) => {
            img_see_our_world.innerHTML = img_see_our_world.innerHTML + `<div class="col-sm-3 activeimg">
                        <img src="`+ element + `" alt="SEE OUR WORLD">
                    </div>`
        })
        the_characters.classList.remove("active_the_characters")
        conceptual_artwork.classList.add("active_the_characters")
    }
    btn_send_form.onclick = (e) => {
        let stop = false
        if (Form_Name.value === '') {
            Form_Name.nextElementSibling.classList.remove("d-none")
            stop = true
        }
        if (Form_Email.value === '') {
            Form_Email.nextElementSibling.classList.remove("d-none")
            stop = true
        }
        if (Form_Message.value === '') {
            Form_Message.nextElementSibling.classList.remove("d-none")
            stop = true
        }
        if (stop) {
            e.preventDefault()
            stop = false
        }

    }

    Form_Name.onkeyup = () => {
        val(Form_Name)
    }
    Form_Email.onkeyup = () => {
        val(Form_Email)
    }
    Form_Message.onkeyup = () => {
        val(Form_Message)
    }

    function val(element) {
        element.nextElementSibling.classList.add("d-none")
    }

    var vt_img_hien_tai, so_anh_hien_co
    All_img.forEach((element) => {
        element.onclick = () => {
            var img_now = element
            view_image.src = element.querySelector('img').src
            view_image_box.classList.remove('d-none')

            All_img_see_our_world.forEach((value, key) => {
                if (value === img_now) {
                    vt_img_hien_tai = key
                }
            })
            so_anh_hien_co = All_img_see_our_world.length
        }

    })

    close.onclick = () => {
        view_image_box.classList.add('d-none')
    }



    next.onclick = () => {
        vt_img_hien_tai++
        if (vt_img_hien_tai >= so_anh_hien_co) {
            vt_img_hien_tai = 0
        }
        view_image.src = All_img_see_our_world[vt_img_hien_tai].querySelector('img').src
    }

    previous.onclick = () => {
        vt_img_hien_tai--
        if (vt_img_hien_tai < 0) {
            vt_img_hien_tai = so_anh_hien_co - 1
        }
        view_image.src = All_img_see_our_world[vt_img_hien_tai].querySelector('img').src
    }





    // reponsive
    window.addEventListener("resize", () => {
        win_screen_x = screen.width
        $_select_all('.menu').forEach(menu => {
            menu.style.margin = 20 / (1500 / win_screen_x) + 'px'
        })
        list = current_arrow_list.map((id) => $_select(id).offsetTop)
        list[5] = $_select('#BAZAAR').offsetTop
    })
    list = current_arrow_list.map((id) => $_select(id).offsetTop)


}, false);