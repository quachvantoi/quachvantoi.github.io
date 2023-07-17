const select = document.querySelector.bind(document)
const select_all = document.querySelectorAll.bind(document)

var scale
const container = select('.container')
const body = select('body')
const top_header = select('.top_header')
const logo = select('.logo')
const logo_ic = select('.logo_ic')
const nvarbar = select('.nvarbar')
const nvarbar_a = select_all('.top_header .nvarbar a')

document.addEventListener("DOMContentLoaded", function () {
    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        prevArrow: $('.previous_slick'),
        nextArrow: $('.next_slick')
    });

    $(".collections_image").slick({
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
    });

    // scroll

    document.addEventListener('scroll', () => {
        let scroll_screen = document.documentElement.scrollTop
        if (scroll_screen > 100) {
            top_header.style.backgroundColor = '#b4b4b4'
        } else {
            top_header.style.backgroundColor = 'unset'
        }

        if (scroll_screen < select('.footer').offsetTop * scale - (303 * scale) && scroll_screen > select('.tanner_collections').offsetTop * scale - (303 * scale) + screen.height + (440 * scale)) {
            clear_line(select('.CONTACT'))
        }
        else if (scroll_screen > select('.tanner_collections').offsetTop * scale - (303 * scale)) {
            clear_line(select('.COLLECTION'))
        }
        else if (scroll_screen > select('.drifter').offsetTop * scale - (303 * scale) - 100) {
            clear_line(select('.DRIFTER'))
        }
        else if (scroll_screen > select('.voyager').offsetTop * scale - (303 * scale)) {
            clear_line(select('.VOYAGER'))
        }
        else {
            clear_line(select('.NAVY'))
        }


    })

    select('.NAVY').onclick = (e) => {
        e.preventDefault()
        window.scrollTo(0, 0)
    }
    select('.VOYAGER').onclick = (e) => {
        e.preventDefault()
        window.scrollTo(0, select('.voyager').offsetTop * scale - (303 * scale))
    }
    select('.DRIFTER').onclick = (e) => {
        e.preventDefault()
        window.scrollTo(0, select('.drifter').offsetTop * scale - (303 * scale))
    }
    select('.COLLECTION').onclick = (e) => {
        e.preventDefault()
        window.scrollTo(0, select('.tanner_collections').offsetTop * scale - (303 * scale))
    }
    select('.CONTACT').onclick = (e) => {
        e.preventDefault()
        window.scrollTo(0, select('.footer').offsetTop * scale - (303 * scale))
    }


    // reponsive
    set_scale()
    window.addEventListener("resize", () => {
        set_scale()
    })
}, false);

function set_scale() {
    window.scrollTo(0, 0)
    win_screen_x = screen.width
    // console.log(win_screen_x)
    scale = (win_screen_x / 3800)
    scale = scale - scale / 10
    container.style.scale = scale
    //menu
    top_header.style.width = (3800 * scale) + 'px'
    top_header.style.height = (303 * scale) + 'px'
    logo.style.width = (438 * scale) + 'px'
    logo.style.height = (438 * scale) + 'px'
    logo.style.marginLeft = (22 * scale) + 'px'
    logo.style.transform = "translateY(-" + (135 * scale) + 'px)'

    logo_ic.style.width = (309 * scale) + 'px'
    logo_ic.style.height = (124 * scale) + 'px'

    nvarbar.style.width = (1590 * scale) + 'px'
    // nvarbar.style.height = (124 * scale) + 'px'
    nvarbar.style.marginLeft = (280 * scale) + 'px'
    nvarbar.style.marginTop = (130 * scale) + 'px'

    nvarbar_a.forEach(element => {
        element.style.fontSize = (30 * scale) + 'px'
    })
    nvarbar_a[0].style.setProperty('--width_line_header', (80 * scale) + 'px');
    nvarbar_a[0].style.setProperty('--height_line_header', (5 * scale) + 'px');
}

function clear_line(element_active) {
    nvarbar_a.forEach((e) => {
        e.classList.remove("line")
    })
    element_active.classList.add("line")
    element_active.style.setProperty('--width_line_header', (80 * scale) + 'px');
    element_active.style.setProperty('--height_line_header', (5 * scale) + 'px');
}