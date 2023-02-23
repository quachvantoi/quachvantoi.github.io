// data_topic is data question sudoku
const body = document.querySelector("body")
const backdround_sudoku = document.querySelector(".backdround-sudoku")
const tat_ca_o_vuong_9 = document.querySelectorAll(".o_vuong_9")
const tat_ca_o_vuong_1 = document.querySelectorAll(".o_vuong")
const btn_Show_menu = document.querySelector(".btn-show-menu-right")
const menu = document.querySelector(".Fix-menu-right")
const help_solve_1_step = document.querySelector(".btn_help_1step")
const btn_solve_sudoku = document.querySelector(".btn_solve_sudoku")

const button_menu_display_1 = document.querySelectorAll(".button_menu_display_1")
const button_menu_display_2 = document.querySelectorAll(".button_menu_display_2")

const btn_create_new_game = document.querySelector(".create_new_game")
const menu_create_game = document.querySelectorAll(".menu_create_game")
const btn_return_menu = document.querySelector(".btn_return_menu")
// const btn_Laboratory = document.querySelector(".Laboratory")
const btn_Setting = document.querySelector(".Setting")
const btn_Your_Achievements = document.querySelector(".Your_Achievements")


const btn_close_table_solve = document.querySelector(".btn_close")
const table_menu_3 = document.querySelector(".menu_3")
const menu_3 = document.querySelector(".step")
const btn_oke = document.querySelector(".btn_oke")
const btn_cancer = document.querySelector(".btn_cancer")
const glass = document.querySelector(".glass")
const your_win = document.querySelector(".your_win")

const image_setting = document.querySelectorAll(".image_setting img")
const your_achievements = document.querySelector(".your_achievements")



var level = "Impossible"

//tạo biến lưu local
if (!localStorage.background_image) {
    localStorage.background_image = "image/background-1.jpg"
}
else {
    body.style.backgroundImage = `url(${localStorage.background_image})`
}
// localStorage.clickcount = Number(localStorage.clickcount)+1;

if (!localStorage.complete_easy) {
    localStorage.complete_easy = 0
}
if (!localStorage.complete_medium) {
    localStorage.complete_medium = 0
}
if (!localStorage.complete_difficult) {
    localStorage.complete_difficult = 0
}
if (!localStorage.complete_impossible) {
    localStorage.complete_impossible = 0
}
if (!localStorage.use_help) {
    localStorage.use_help = 0
}
if (!localStorage.use_solve) {
    localStorage.use_solve = 0
}



// lưu theo hàng ngang
var topic_sudoku = data[level][Math.floor(Math.random() * data[level].length)]



// const topic_sudoku = [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],

//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],

//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0]
// ]
btn_create_new_game.onclick = () => {
    button_menu_display_1.forEach((e) => {
        e.classList.add("none")
    })
    menu_create_game.forEach((e) => {
        e.classList.remove("none")
    })
    btn_return_menu.classList.remove("none")

}

btn_return_menu.onclick = () => {
    button_menu_display_1.forEach((e, key) => {
        button_menu_display_1[key].classList.remove("none")
    })
    button_menu_display_2.forEach((e) => {
        e.classList.add("none")
    })
    btn_return_menu.classList.add("none")
}


//create new game
menu_create_game.forEach((e) => {
    e.onclick = () => {
        level = e.attributes["data-level"].value
        refresh_page()
        topic_sudoku = data[level][Math.floor(Math.random() * data[level].length)]
        show_topic()
        solver_sudoku_fc()
        wirte_correct_number_input()
        show_topic()
    }
})

image_setting.forEach((e) => {
    e.onclick = () => {
        let image = e.attributes["src"].value
        body.style.backgroundImage = `url(${image})`
        localStorage.background_image = image
    }
})


// btn_Laboratory.onclick = () => {
//     refresh_page()
// }
function refresh_page() {
    thuc_hien_forEach(input_row, (input_9, input_1, key_9, key_1, row, col) => {
        let this_input = input_1.querySelector("input")
        let this_span_s = input_1.querySelectorAll("span")
        this_input.style = ""
        this_input.attributes["data-note"].value = ""
        this_input.attributes["data-topic"].value = ""
        this_input.value = ""
        this_span_s.forEach((e) => {
            e.classList.add("none")
        })
    })
}

var input_col = [[], [], [], [], [], [], [], [], []]
var input_row = [[], [], [], [], [], [], [], [], []]
var input_9x9 = []
var current_input_now
const NAME_INPUT_ROW = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
var result_check
// cho input lên 2 opa 0.6
// khi key down input  = ""
// khi key up  - span = 0 



document.addEventListener("DOMContentLoaded", function () {

    var height_o_vuong_9 = tat_ca_o_vuong_9[0].clientHeight
    var height_backdround_sudoku = height_o_vuong_9 * 3 + 32

    backdround_sudoku.style.height = height_backdround_sudoku + 'px'

    // setup display
    tat_ca_o_vuong_1.forEach((Tung_o_input_div) => {
        Tung_o_input_div.querySelector("input").onkeydown = (e) => {
            // khi ấn tab không thay đổi dữ liệu
            if (e.keyCode !== 9) {
                e.target.value = ""
            }

            // lấy ra được số cũ
            if (result_check != undefined) {
                delete_pop_up_wrong_number(result_check, Tung_o_input_div)
            }

        }
        Tung_o_input_div.querySelector("input").onkeyup = (O_input) => {
            var so_vua_chon = O_input.target.value
            if (O_input.target.attributes["data-topic"].value === "") {
                if (O_input.keyCode === 9) {
                }
                // check số từ 1 - 9 
                else if (Number.isInteger(+so_vua_chon) && +so_vua_chon !== 0) {
                    // check number true/false 
                    let ID_input = O_input.target.attributes["data-number"].value
                    let ID_in_9_input = O_input.target.attributes["data-number-9-input"].value
                    let value_number = O_input.target.value
                    result_check = Check_numer_corect(value_number, NAME_INPUT_ROW.indexOf(ID_input[0]), ID_input[1], Tung_o_input_div, ID_in_9_input)
                    // console.log(result_check);

                    if (value_number !== O_input.target.attributes["data-number-correct"].value) {
                        result_check.push(Tung_o_input_div)
                        // pop_up_wrong_number([], Tung_o_input_div)
                    }

                    if (result_check.length == 0) {
                        // không bị trùng
                        //clear data-note
                        O_input.target.attributes["data-note"].value = ""

                        O_input.target.value = so_vua_chon
                        so_vua_chon = ""
                        Tung_o_input_div.querySelectorAll("span").forEach((span_note) => {
                            span_note.classList.add("none")
                        })
                    }
                    else {
                        // O_input.target.value = ""
                        pop_up_wrong_number(result_check, Tung_o_input_div)
                    }
                }
                else {
                    O_input.target.value = ""
                }

                // nếu ấn backspace phải trả về note
                if (O_input.target.value === "") {
                    // span_note = Tung_o_input_div.querySelectorAll("span")
                    // let all_note = [...O_input.target.attributes["data-note"].value]
                    // all_note.forEach((value_note) => {
                    //     span_note[value_note - 1].classList.remove("none")
                    // })
                    create_note()
                }
            }
            else {
                O_input.target.value = O_input.target.attributes["data-topic"].value
            }

        }
        Tung_o_input_div.querySelector("input").onclick = () => {
            if (Tung_o_input_div.querySelector("input").value !== "") {

                if (current_input_now !== Tung_o_input_div.querySelector("input").attributes["data-number"].value) {
                    current_input_now = Tung_o_input_div.querySelector("input").attributes["data-number"].value
                    // console.log(document.querySelector(`[data-number='${current_input_now}']`).value);
                    if (typeof number_active !== 'undefined') {
                        remove_active_number_click(number_active)
                    }
                    number_active = Tung_o_input_div.querySelector("input").value
                    active_number_click(number_active)
                }
            }
            else {
                if (typeof number_active !== 'undefined') {
                    remove_active_number_click(number_active)
                    current_input_now = ""
                }
            }
        }
        Tung_o_input_div.querySelector("input").onchange = (O_input) => {
            let number = ""
            if (O_input.target.value === O_input.target.attributes["data-number-correct"].value) {
                number = O_input.target.value
            }
            // xoá pop_up_wrong_number
            delete_pop_up_wrong_number(result_check, Tung_o_input_div)
            delete_note(O_input.target.value, Tung_o_input_div)


            if (number !== "") {
                // O_input.target.value = number
                // O_input.target.attributes["data-note"].value = ""
                // Tung_o_input_div.querySelectorAll("span").forEach((span_note) => {
                //     span_note.classList.add("none")
                // })
                change_input_number(number, O_input.target.parentElement)
            }

            //check win game
            check_win_game()

        }
    })

    function Check_numer_corect(number, row, col, element_number, number_row_col_9x9) {
        let check_9x9 = [...input_9x9[+number_row_col_9x9]].filter((e, key) => {
            return input_9x9[+number_row_col_9x9][key].querySelector("input").value == number && e !== element_number
        })
        let check_row = [...input_row[row]].filter((e, key) => {
            return input_row[row][key].querySelector("input").value == number && e !== element_number
        })
        let check_col = [...input_col[col]].filter((e, key) => {
            return input_col[col][key].querySelector("input").value == number && e !== element_number
        })

        return [...check_9x9, ...check_row, ...check_col]
    }

    function pop_up_wrong_number(list_elements, number_input_current_element) {
        list_elements.forEach((element) => {
            element.querySelector("input").style.backgroundColor = "red"
            element.querySelector("input").style.opacity = 1
        })
        number_input_current_element.querySelector("input").style.backgroundColor = "red"
        number_input_current_element.querySelector("input").style.opacity = 1
    }
    function delete_pop_up_wrong_number(list_elements, number_input_current_element) {
        // màu của topic khác với màu của ô thường
        list_elements.forEach((element) => {
            element.querySelector("input").style.backgroundColor = "white"
            if (element.querySelector("input").attributes["data-topic"].value == "") {
                element.querySelector("input").style.opacity = 0.5
            } else {
                element.querySelector("input").style.opacity = 1
            }


        })
        number_input_current_element.querySelector("input").value = ""
        number_input_current_element.querySelector("input").style.backgroundColor = "white"
        number_input_current_element.querySelector("input").style.opacity = 0.5

        // check xem số có đúng không nếu ko đúng thì phải xoá đi
        let ID_input = number_input_current_element.querySelector("input").attributes["data-number"].value
        let ID_in_9_input = number_input_current_element.querySelector("input").attributes["data-number-9-input"].value
        let value_number = number_input_current_element.querySelector("input").value
        let Tung_o_input_div = number_input_current_element

        result_check = Check_numer_corect(value_number, NAME_INPUT_ROW.indexOf(ID_input[0]), ID_input[1], Tung_o_input_div, ID_in_9_input)
        if (result_check.length != 0) {
            number_input_current_element.querySelector("input").value = ""
            create_note()
        }
    }

    var active_number_click = function (number) {
        // document.querySelectorAll(`input:not([data-note=""])`)
        let input_activer = document.querySelectorAll(`input[data-note=""]`)
        let note_activer = document.querySelectorAll(`.o_vuong span:nth-child(${Number(number) + 1}):not(.none)`)
        input_activer.forEach((element_input, key) => {
            if (element_input.value == number) {
                element_input.classList.add("active")
            }
        })
        note_activer.forEach((element_input, key) => {
            element_input.classList.add("active")
        })
    }
    var remove_active_number_click = function (number) {
        let input_activer = document.querySelectorAll(`input[data-note=""]`)
        let note_activer = document.querySelectorAll(`.o_vuong span:nth-child(${Number(number) + 1}):not(.none)`)
        input_activer.forEach((element_input, key) => {
            if (element_input.value == number) {
                element_input.classList.remove("active")
            }
        })
        note_activer.forEach((element_input, key) => {
            element_input.classList.remove("active")
        })
    }

    btn_Show_menu.onclick = () => {
        menu.classList.toggle("hide-menu")
        if (menu.classList.contains("hide-menu")) {
            setTimeout(() => {
                btn_Show_menu.classList.replace("fa-angle-right", "fa-angle-left")
            }, 1000)
        }
        else {
            setTimeout(() => {
                btn_Show_menu.classList.replace("fa-angle-left", "fa-angle-right")
            }, 1000)

        }
    }
    // check click outsize
    window.addEventListener('click', function (e) {
        if (!menu.contains(e.target)) {
            menu.classList.add("hide-menu")
            setTimeout(() => {
                btn_Show_menu.classList.replace("fa-angle-right", "fa-angle-left")
            }, 1000)
        }
    })


    //set parameter
    tat_ca_o_vuong_9.forEach((input_9, key) => {
        input_9x9[key] = input_9.querySelectorAll(".o_vuong")
    })
    input_9x9.forEach((input_9, key_9) => {
        input_9.forEach((input_1, key_1) => {
            let row = Math.floor(key_9 / 3) * 3 + Math.floor(key_1 / 3)
            let col = (key_9 % 3) * 3 + (key_1 % 3)
            // input_1.querySelector("input").value = col + "" + row
            // input_1.querySelector("input").value = key_9 + "" + key_1
            input_1.querySelector("input").attributes["data-number-9-input"].value = key_9
            input_col[col][row] = input_1
            input_row[row][col] = input_1
        })
    })







    help_solve_1_step.onclick = () => {
        // kiểm tra có return thì phải dùng và hiện giải thích cách làm
        let number, element_number_change
        let check_1_step = true
        let check_have_input_empty = document.querySelectorAll(`.o_vuong span:not(.none)`).length
        let cac_buoc_thuc_hien = []
        while (check_1_step && check_have_input_empty) {
            [number, element_number_change] = So_le_an()
            if (number) {
                console.log('so le an');
                change_input_number(number, element_number_change)
                check_1_step = false
                cac_buoc_thuc_hien.push({
                    "Name": "Số lẻ ẩn",
                    "element_note_identify": number,
                    "element_note_remove": element_number_change
                })
                break
                // return 0
            }

            [number, element_number_change] = So_Le_hien_nhien()
            if (number && check_1_step) {
                console.log('so le hien nhien');
                change_input_number(number, element_number_change)
                check_1_step = false
                cac_buoc_thuc_hien.push({
                    "Name": "Số lẻ hiển nhiên",
                    "element_note_identify": number,
                    "element_note_remove": element_number_change
                })
                break
                // return 0
            }

            block_remove_note: if (check_1_step) {
                console.log('loai bo ghi chu');
                [element_note_identify, element_note_remove] = Cap_loai_tru()
                if (element_note_identify) {
                    // console.log(element_note_identify, element_note_remove);
                    cac_buoc_thuc_hien.push({
                        "Name": "Cặp loại trừ",
                        "element_note_identify": element_note_identify,
                        "element_note_remove": element_note_remove
                    })
                    break block_remove_note
                }

                [element_note_identify, element_note_remove] = Bo_ba_loai_tru()
                if (element_note_identify) {
                    // console.log(element_note_identify, element_note_remove);
                    cac_buoc_thuc_hien.push({
                        "Name": "Bộ ba loại trừ",
                        "element_note_identify": element_note_identify,
                        "element_note_remove": element_note_remove
                    })
                    break block_remove_note
                }

                [number_note, current_element_note] = Cap_an()
                if (number_note) {
                    cac_buoc_thuc_hien.push({
                        "Name": "Cặp ẩn",
                        "element_note_identify": number_note,
                        "element_note_remove": current_element_note
                    })
                    break block_remove_note
                }

                [number_note, current_element_note] = Bo_ba_an()
                if (number_note) {
                    cac_buoc_thuc_hien.push({
                        "Name": "Bộ ba ẩn",
                        "element_note_identify": number_note,
                        "element_note_remove": current_element_note
                    })
                    break block_remove_note
                }

                [number_note, current_corect, curent_remove] = Cap_so_hien_nhien()
                if (number_note) {
                    cac_buoc_thuc_hien.push({
                        "Name": "Cặp số hiển nhiên",
                        "element_note_identify": number_note,
                        "element_note_remove": curent_remove,
                        "element_note_corect": current_corect
                    })
                    break block_remove_note
                }

                [number_note, current_corect, curent_remove] = Bo_ba_hien_nhien()
                if (number_note) {
                    cac_buoc_thuc_hien.push({
                        "Name": "Bộ ba hiển nhiên",
                        "element_note_identify": number_note,
                        "element_note_remove": curent_remove,
                        "element_note_corect": current_corect
                    })
                    break block_remove_note
                }
            }

        }
        console.log(cac_buoc_thuc_hien.pop());
        check_win_game()
        localStorage.use_help++
    }
    btn_solve_sudoku.onclick = () => {
        solver_sudoku_fc()
        if (check_win_game()) {
            localStorage.use_solve++
        }

    }
    btn_Setting.onclick = () => {
        table_menu_3.classList.remove("none")
        image_setting[0].parentElement.classList.remove("none")
        your_achievements.classList.add("none")
    }
    btn_Your_Achievements.onclick = () => {
        table_menu_3.classList.remove("none")
        image_setting[0].parentElement.classList.add("none")
        your_achievements.classList.remove("none")

        your_achievements.innerHTML = `
                <p>Number of times to pass the challenge:</p>
                <p>Easy: <strong>${localStorage.complete_easy}</strong></p>
                <p>Medium: <strong>${localStorage.complete_medium}</strong></p>
                <p>Difficult: <strong>${localStorage.complete_difficult}</strong></p>
                <p>Impossible: <strong>${localStorage.complete_impossible}</strong></p>
                <p>Number of times to use help: <strong>${localStorage.use_help}</strong></p>
                <p>Number of times to choose the quick prize: <strong>${localStorage.use_solve}</strong></p> `
    }

    btn_close_table_solve.onclick = () => {
        table_menu_3.classList.add("none")
    }

    btn_oke.onclick = () => {
        //create new game
        refresh_page()
        topic_sudoku = data[level][Math.floor(Math.random() * data[level].length)]
        show_topic()

        your_win.classList.add("none")
        glass.classList.add("none")
    }
    btn_cancer.onclick = () => {
        your_win.classList.add("none")
        glass.classList.add("none")
    }



    show_topic()
    solver_sudoku_fc()
    wirte_correct_number_input()
    show_topic()
}, false);


// check win game
function check_win_game() {

    if (document.querySelectorAll(`.o_vuong span:not(.none)`).length === 0) {
        console.log('chúc mừng bạn đã vượt qua thử thách');
        switch (level) {
            case 'Easy':
                localStorage.complete_easy++
                break;
            case 'Medium':
                localStorage.complete_medium++
                break;
            case 'Difficult':
                localStorage.complete_difficult++
                break;
            case 'Impossible':
                localStorage.complete_impossible++
                break;
        }
        your_win.classList.remove("none")
        glass.classList.remove("none")
        return true
    }
}

// ghi ra kết quả cần điền vào ô để check số nhập vào
function wirte_correct_number_input() {
    thuc_hien_forEach(input_9x9, (input_9, input_1, key_9, key_1, row, col) => {
        input_1.querySelector("input").attributes["data-number-correct"].value = input_1.querySelector("input").value
    })
}

function solver_sudoku_fc() {
    let stop = 0
    while (stop < 5) {
        let number, element_number_change
        [number, element_number_change] = So_le_an()
        if (number) {
            change_input_number(number, element_number_change)
            stop = 0
            // menu_3.innerHTML += `<p>số lẻ ẩn : ${number} ${element_number_change}<p>`
        }

        [number, element_number_change] = So_Le_hien_nhien()
        if (number) {
            change_input_number(number, element_number_change)
            stop = 0
        }

        [element_note_identify, element_note_remove] = Cap_loai_tru()
        if (element_note_identify) {
            // console.log(element_note_identify, element_note_remove);
            stop = 0
        }

        [element_note_identify, element_note_remove] = Bo_ba_loai_tru()
        if (element_note_identify) {
            // console.log(element_note_identify, element_note_remove);
            stop = 0
        }

        [number_note, current_element_note] = Cap_an()
        if (number_note) {
            stop = 0
        }

        [number_note, current_element_note] = Bo_ba_an()
        if (number_note) {
            stop = 0
        }

        [number_note, current_corect, curent_remove] = Cap_so_hien_nhien()
        if (number_note) {
            stop = 0
        }

        [number_note, current_corect, curent_remove] = Bo_ba_hien_nhien()
        if (number_note) {
            stop = 0
        }
        stop++
    }
}

function change_input_number(number, element_number_change) {
    element_number_change.querySelector("input").value = number
    element_number_change.querySelector("input").attributes["data-note"].value = ""
    element_number_change.querySelectorAll("span").forEach((span_note) => {
        span_note.classList.add("none")
    })
    delete_note(number, element_number_change)
    element_number_change.querySelector("input").classList.add("change")
    setTimeout(() => {
        element_number_change.querySelector("input").classList.remove("change")
    }, 1000);
}


// show topic
// thứ tự điền vào theo hàng ngang (input row)
function show_topic() {
    thuc_hien_forEach(input_row, (input_9, input_1, key_9, key_1, row, col) => {
        input_1.querySelector("input").value = topic_sudoku[key_9][key_1] === 0 ? "" : topic_sudoku[key_9][key_1]
        if (input_1.querySelector("input").value != 0) {
            input_1.querySelector("input").style.opacity = 1
            input_1.querySelector("input").attributes["data-topic"].value = topic_sudoku[key_9][key_1]
        }

        // lưu hàng - cột
        input_col[col][row].querySelector("input").attributes["data-number"].value = NAME_INPUT_ROW[row] + col

    })
    create_note()
}


var thuc_hien_forEach = function (phan_can_lap, func_callback) {
    phan_can_lap.forEach((input_9, key_9) => {
        input_9.forEach((input_1, key_1) => {
            let row = Math.floor(key_9 / 3) * 3 + Math.floor(key_1 / 3)
            let col = (key_9 % 3) * 3 + (key_1 % 3)
            func_callback(input_9, input_1, key_9, key_1, row, col)
        })
    })
}

// create note
var create_note = function () {
    thuc_hien_forEach(input_9x9, (input_9, input_1, key_9, key_1, row, col) => {
        let note_active = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9]
        if (input_1.querySelector("input").value === "") {
            // input_1.querySelector("input").value = row + "" + col
            for (let i = 0; i < 9; i++) {
                if (input_9[i].querySelector("input").value !== "") {
                    note_active[input_9[i].querySelector("input").value] = ""
                }
                if (input_col[col][i].querySelector("input").value !== "") {
                    note_active[input_col[col][i].querySelector("input").value] = ""
                }
                if (input_row[row][i].querySelector("input").value !== "") {
                    note_active[input_row[row][i].querySelector("input").value] = ""
                }
            }
            input_1.querySelector("input").attributes["data-note"].value = note_active.join("")

            Note_span_input = input_1.querySelectorAll("span")
            note_active.forEach((value_note) => {
                if (value_note !== "") {
                    Note_span_input[value_note - 1].classList.remove("none")
                }

            })
        }
    })
}
//delete note
var delete_note = function (number, number_input_current_element) {
    let ID_input = number_input_current_element.querySelector("input").attributes["data-number"].value
    let current_in_9x9 = number_input_current_element.querySelector("input").attributes["data-number-9-input"].value
    let current_row = NAME_INPUT_ROW.indexOf(ID_input[0])
    let current_col = ID_input[1]
    let note_remove = []
    input_9x9[current_in_9x9].forEach((element) => {
        note_remove.push(element.querySelector(`.o_vuong span:nth-child(${Number(number) + 1}):not(.none)`))
    })
    input_row[current_row].forEach((element) => {
        note_remove.push(element.querySelector(`.o_vuong span:nth-child(${Number(number) + 1}):not(.none)`))
    })
    input_col[current_col].forEach((element) => {
        note_remove.push(element.querySelector(`.o_vuong span:nth-child(${Number(number) + 1}):not(.none)`))
    })
    note_remove = [...note_remove]

    note_remove.forEach((element_note) => {
        if (element_note !== null) {
            element_note.classList.add("none")

            // lấy ra note
            value_note = [...element_note.parentElement.querySelector("input").attributes["data-note"].value]
            // xoá đi số đã điền
            let index_note_remove = value_note.indexOf(number + "");
            if (index_note_remove > -1) {
                value_note.splice(index_note_remove, 1)
            }
            element_note.parentElement.querySelector("input").attributes["data-note"].value = value_note.join("")
        }

    })
}

// số lẻ hiển nhiên là sô mà có duy nhất 1 số trong note
function So_Le_hien_nhien() {
    for (let input_3x3 of input_9x9) {
        for (let input_element of input_3x3) {
            let note_input_element = input_element.querySelector("input").attributes["data-note"].value
            if (note_input_element.length === 1) {
                return [...note_input_element, input_element]
            }
        }
    }
    return [null, null]
}

// Cặp số hiển nhiên là bạn nên tìm 2 ô có các cặp Ghi chú giống nhau trong khối 3x3. Điều này có nghĩa là các cặp Ghi chú này không thể được sử dụng trong các ô khác trong khối 3x3 này. Vì vậy, bạn có thể xóa chúng khỏi Ghi chú của mình.
function Cap_so_hien_nhien() {

    for (let input_3x3 of input_9x9) {
        let number_cap_so_hien_nhien = []
        let current_cap_so_hien_nhien = []
        for (let input_element of input_3x3) {
            let note_input_element = input_element.querySelector("input").attributes["data-note"].value
            if (note_input_element.length === 2) {
                number_cap_so_hien_nhien.push(note_input_element)
                current_cap_so_hien_nhien.push(input_element)
            }
        }
        if (current_cap_so_hien_nhien.length > 1) {
            for (let number_1 = 0; number_1 < number_cap_so_hien_nhien.length - 1; number_1++) {
                for (let number_2 = number_1 + 1; number_2 < number_cap_so_hien_nhien.length; number_2++) {
                    let condition = number_cap_so_hien_nhien[number_1].includes(number_cap_so_hien_nhien[number_2])
                    if (condition) {
                        let numbers = [...number_cap_so_hien_nhien[number_1]]
                        let current_corect = [current_cap_so_hien_nhien[number_1], current_cap_so_hien_nhien[number_2]]
                        let curent_remove = []
                        // xoá các số có trong number_cap_so_hien_nhien tại các ô khác đi
                        for (let input_element of input_3x3) {
                            if (!current_corect.includes(input_element)) {
                                let note_input_element = [...input_element.querySelector("input").attributes["data-note"].value]
                                // console.log("---------------", note_input_element);
                                for (let number of numbers) {
                                    let index = note_input_element.indexOf(number)
                                    if (index > -1) {
                                        note_input_element.splice(index, 1)
                                        // lấy ra span
                                        let note_span = input_element.querySelector(`span:nth-child(${Number(number) + 1}):not(.none)`)
                                        // chuyển none
                                        note_span.classList.add("none")
                                        curent_remove.push(note_span)
                                    }
                                }
                                input_element.querySelector("input").attributes["data-note"].value = note_input_element.join("")

                            }
                        }
                        if (curent_remove.length !== 0) {
                            return [numbers, current_corect, curent_remove]
                        }

                    }
                }
            }
        }
    }
    return [null, null]
}

// bộ ba hiển nhiên
// Hãy nhìn vào khối trên cùng bên trái. Ba ô dưới cùng của nó chứa các ghi chú 1, 5; 1, 8 & 5, 8. Điều này có nghĩa là các ô này có số 1, 5 & 8 nhưng chúng ta vẫn chưa biết chính xác vị trí của từng số. Tuy nhiên, những gì chúng ta biết là 1, 5 & 8 không thể nằm trong các ô khác của khối này.
function Bo_ba_hien_nhien() {
    for (let input_3x3 of input_9x9) {
        let number_cap_so_hien_nhien = []
        let current_cap_so_hien_nhien = []
        for (let input_element of input_3x3) {
            let note_input_element = input_element.querySelector("input").attributes["data-note"].value
            if (note_input_element.length === 2) {
                number_cap_so_hien_nhien.push(note_input_element)
                current_cap_so_hien_nhien.push(input_element)
            }
        }
        if (current_cap_so_hien_nhien.length > 2) {
            // console.log(number_cap_so_hien_nhien, current_cap_so_hien_nhien);
            for (let number_1 = 0; number_1 < number_cap_so_hien_nhien.length - 2; number_1++) {
                for (let number_2 = number_1 + 1; number_2 < number_cap_so_hien_nhien.length - 1; number_2++) {
                    let condition1 = number_cap_so_hien_nhien[number_1][0].includes(number_cap_so_hien_nhien[number_2][0])
                    let condition2 = number_cap_so_hien_nhien[number_1][1].includes(number_cap_so_hien_nhien[number_2][1])
                    // 1 trong 2 đk phải đúng và 2 đk ko được dúng hết
                    if (!(condition1 && condition2) && (condition1 || condition2)) {
                        for (let number_3 = number_2 + 1; number_3 < number_cap_so_hien_nhien.length; number_3++) {
                            let condition3 = number_cap_so_hien_nhien[number_1][0].includes(number_cap_so_hien_nhien[number_3][0])
                            let condition4 = number_cap_so_hien_nhien[number_1][1].includes(number_cap_so_hien_nhien[number_3][1])
                            let check_1 = !(condition3 && condition4) && (condition3 || condition4)

                            // let condition5 = number_cap_so_hien_nhien[number_2][0].includes(number_cap_so_hien_nhien[number_3][0])
                            // let condition6 = number_cap_so_hien_nhien[number_2][1].includes(number_cap_so_hien_nhien[number_3][1])
                            // let check_2 = !(condition3 && condition4) && (condition3 || condition4)
                            if (check_1) {

                                let numbers = [...number_cap_so_hien_nhien[number_1], ...number_cap_so_hien_nhien[number_2], ...number_cap_so_hien_nhien[number_3]].sort()
                                // console.log(numbers);
                                // console.log(numbers[0] === numbers[1], numbers[2] === numbers[3], numbers[4] === numbers[5]);
                                if (numbers.length !== 6) {
                                    return [null, null]
                                }
                                if (numbers[0] !== numbers[1] || numbers[2] !== numbers[3] || numbers[4] !== numbers[5]) {
                                    return [null, null]
                                }
                                numbers = [numbers[0], numbers[2], numbers[4]]
                                if (numbers[0] === numbers[1] || numbers[1] === numbers[2]) {
                                    return [null, null]
                                }
                                let current_corect = [current_cap_so_hien_nhien[number_1], current_cap_so_hien_nhien[number_2], current_cap_so_hien_nhien[number_3]]
                                let curent_remove = []
                                // console.log(numbers, current_corect);
                                // return
                                // xoá các số có trong number_cap_so_hien_nhien tại các ô khác đi
                                for (let input_element of input_3x3) {
                                    if (!current_corect.includes(input_element)) {
                                        let note_input_element = [...input_element.querySelector("input").attributes["data-note"].value]
                                        // console.log("---------------", note_input_element);
                                        for (let number of numbers) {
                                            let index = note_input_element.indexOf(number)
                                            if (index > -1) {
                                                note_input_element.splice(index, 1)
                                                // lấy ra span
                                                let note_span = input_element.querySelector(`span:nth-child(${Number(number) + 1}):not(.none)`)
                                                // chuyển none
                                                note_span.classList.add("none")
                                                curent_remove.push(note_span)
                                            }
                                        }
                                        input_element.querySelector("input").attributes["data-note"].value = note_input_element.join("")

                                    }
                                }
                                if (curent_remove.length !== 0) {
                                    return [numbers, current_corect, curent_remove]
                                }


                            }
                        }
                    }
                }
            }
        }
    }
    return [null, null]
}

//check note 1 lần (số lẻ ẩn)
// Số lẻ ẩn là ghi chú là ghi chú duy nhất trong toàn bộ hàng, cột hoặc khối 3x3.
function So_le_an() {
    let numbers_so_le_an = [[], [], [], [], [], [], [], [], []]
    thuc_hien_forEach(input_9x9, (input_9, input_1, key_9, key_1, row, col) => {
        numbers_so_le_an[key_9] += input_1.querySelector("input").attributes["data-note"].value
    })

    for (let current_9x9 in numbers_so_le_an) {
        number_solean = numbers_so_le_an[current_9x9]
        for (let number = 1; number <= 9; number++) {
            if (getOccurrence([...number_solean], number) === 1) {
                //tại input_9x9[curent_9x9] có check datanote nào có xuất hiện number
                for (let input_current of input_9x9[current_9x9]) {
                    let list = [...input_current.querySelector("input").attributes["data-note"].value]
                    if (getOccurrence(list, number) === 1) {
                        let result = [number, input_current]
                        return result
                    }
                }
            }
        }
    }
    return [null, null]
}

// Cặp ẩn
// Nếu bạn có thể tìm thấy hai ô trong một hàng, cột hoặc khối 3x3 trong đó không có hai Ghi chú nào xuất hiện bên ngoài các ô này, thì hai Ghi chú này phải được đặt trong hai ô. Có thể loại bỏ tất cả các Ghi chú khác khỏi hai ô này.
function Cap_an() {
    let numbers_so_le_an = [[], [], [], [], [], [], [], [], []]
    thuc_hien_forEach(input_9x9, (input_9, input_1, key_9, key_1, row, col) => {
        numbers_so_le_an[key_9] += input_1.querySelector("input").attributes["data-note"].value
    })
    for (let current_9x9 in numbers_so_le_an) {
        // tat ca note cua o 3x3
        let number_repeat_second_time = []
        let current_number_repeat_second_time = []
        number_solean = numbers_so_le_an[current_9x9]
        for (let number = 1; number <= 9; number++) {
            // số xuất hiện 2 lần
            if (getOccurrence([...number_solean], number) === 2) {
                //tại input_9x9[curent_9x9] có check datanote nào có xuất hiện number
                number_repeat_second_time.push(number)
                for (let input_current of input_9x9[current_9x9]) {
                    let list = [...input_current.querySelector("input").attributes["data-note"].value]
                    if (getOccurrence(list, number) === 1) {
                        //lưu lại giá trị o vuong trong current_number_repeat_second_time
                        current_number_repeat_second_time.push(input_current)
                    }
                }
            }

        }
        if (number_repeat_second_time.length > 1) {
            // console.log("------", number_repeat_second_time, current_number_repeat_second_time);
            // return [number_repeat_second_time, current_number_repeat_second_time]
            // so sánh xem có cặp nào cùng vị trí không
            for (let number_before = 0; number_before < number_repeat_second_time.length - 1; number_before++) {
                for (let number_after = number_before + 1; number_after < number_repeat_second_time.length; number_after++) {
                    let condition1 = current_number_repeat_second_time[number_before * 2] === current_number_repeat_second_time[number_after * 2]
                    let condition2 = current_number_repeat_second_time[number_before * 2 + 1] === current_number_repeat_second_time[number_after * 2 + 1]
                    // console.log(condition1, condition2, number_before, number_after);
                    if (condition1 && condition2) {
                        // cả 2 giống nhau
                        // xoá tất cả ghi chú khác đi
                        let number_element_note = [number_repeat_second_time[number_before], number_repeat_second_time[number_after]]
                        // lỗi ở đây --------------------------------------------------------------------------------------------------------------------------------------------
                        let current_element_note = [current_number_repeat_second_time[number_before * 2], current_number_repeat_second_time[number_after * 2 + 1]]
                        let check_remove_note = false
                        current_element_note[0].querySelector("input").attributes["data-note"].value = number_element_note.join("")
                        current_element_note[1].querySelector("input").attributes["data-note"].value = number_element_note.join("")

                        current_element_note[0].querySelectorAll(`span:not(:nth-child(${Number(number_element_note[0]) + 1}),:nth-child(${Number(number_element_note[1]) + 1}),.none)`).forEach((e) => {
                            e.classList.add("none")
                            check_remove_note = true
                        })
                        current_element_note[1].querySelectorAll(`span:not(:nth-child(${Number(number_element_note[0]) + 1}),:nth-child(${Number(number_element_note[1]) + 1}),.none)`).forEach((e) => {
                            e.classList.add("none")
                            check_remove_note = true
                        })

                        // check_remove_note để xem có sự thay đổi không
                        if (check_remove_note) {
                            return [number_element_note, current_element_note]
                        }

                    }
                }
            }

        }
    }
    return [null, null]
}

// bộ ba ẩn
// Kỹ thuật "Bộ ba ẩn" rất giống với "Cặp ẩn" và cũng có chung một nguyên tắc. 
// "Bộ ba ẩn" áp dụng khi ba ô trong một hàng, cột hoặc khối 3x3 chứa ba Ghi chú giống nhau. Ba ô này cũng chứa các số khả thi khác mà có thể bị loại bỏ.
function Bo_ba_an() {
    // làm sau
    let numbers_so_le_an = [[], [], [], [], [], [], [], [], []]
    thuc_hien_forEach(input_9x9, (input_9, input_1, key_9, key_1, row, col) => {
        numbers_so_le_an[key_9] += input_1.querySelector("input").attributes["data-note"].value
    })
    for (let current_9x9 in numbers_so_le_an) {
        // tat ca note cua o 3x3
        let number_repeat_second_time = []
        let current_number_repeat_second_time = []
        number_solean = numbers_so_le_an[current_9x9]
        for (let number = 1; number <= 9; number++) {
            // số xuất hiện 2 lần
            if (getOccurrence([...number_solean], number) === 3) {
                //tại input_9x9[curent_9x9] có check datanote nào có xuất hiện number
                number_repeat_second_time.push(number)
                let temp = []
                for (let input_current of input_9x9[current_9x9]) {
                    let list = [...input_current.querySelector("input").attributes["data-note"].value]
                    if (getOccurrence(list, number) === 1) {
                        //lưu lại giá trị o vuong trong current_number_repeat_second_time
                        temp.push(input_current)
                    }
                }
                current_number_repeat_second_time.push(temp)
            }

        }
        if (number_repeat_second_time.length > 2) {
            // console.log("------", number_repeat_second_time, current_number_repeat_second_time);
            // return [number_repeat_second_time, current_number_repeat_second_time]
            // so sánh xem có cặp nào cùng vị trí không
            for (let number_1 = 0; number_1 < number_repeat_second_time.length - 2; number_1++) {
                for (let number_2 = number_1 + 1; number_2 < number_repeat_second_time.length - 1; number_2++) {
                    let condition1 = current_number_repeat_second_time[number_1][0] === current_number_repeat_second_time[number_2][0]
                    let condition2 = current_number_repeat_second_time[number_1][1] === current_number_repeat_second_time[number_2][1]
                    let condition3 = current_number_repeat_second_time[number_1][2] === current_number_repeat_second_time[number_2][2]
                    // console.log(condition1, condition2, condition3);
                    if (condition1 && condition2 && condition3) {
                        for (let number_3 = number_2 + 1; number_3 < number_repeat_second_time.length; number_3++) {
                            let condition4 = current_number_repeat_second_time[number_1][0] === current_number_repeat_second_time[number_3][0]
                            let condition5 = current_number_repeat_second_time[number_1][1] === current_number_repeat_second_time[number_3][1]
                            let condition6 = current_number_repeat_second_time[number_1][2] === current_number_repeat_second_time[number_3][2]
                            // console.log(condition4, condition5, condition6);
                            if (condition4 && condition5 && condition6) {
                                // console.log('ba cái giống nhau');
                                // xoá tất cả ghi chú khác đi
                                let number_element_note = [number_repeat_second_time[number_1], number_repeat_second_time[number_2], number_repeat_second_time[number_3]]
                                let current_element_note = current_number_repeat_second_time[number_3]
                                let check_remove_note = false
                                current_element_note[0].querySelector("input").attributes["data-note"].value = number_element_note.join("")
                                current_element_note[1].querySelector("input").attributes["data-note"].value = number_element_note.join("")
                                current_element_note[2].querySelector("input").attributes["data-note"].value = number_element_note.join("")

                                current_element_note[0].querySelectorAll(`span:not(:nth-child(${Number(number_element_note[0]) + 1}),:nth-child(${Number(number_element_note[1]) + 1}),:nth-child(${Number(number_element_note[2]) + 1}),.none)`).forEach((e) => {
                                    e.classList.add("none")
                                    check_remove_note = true
                                })
                                current_element_note[1].querySelectorAll(`span:not(:nth-child(${Number(number_element_note[0]) + 1}),:nth-child(${Number(number_element_note[1]) + 1}),:nth-child(${Number(number_element_note[2]) + 1}),.none)`).forEach((e) => {
                                    e.classList.add("none")
                                    check_remove_note = true
                                })
                                current_element_note[2].querySelectorAll(`span:not(:nth-child(${Number(number_element_note[0]) + 1}),:nth-child(${Number(number_element_note[1]) + 1}),:nth-child(${Number(number_element_note[2]) + 1}),.none)`).forEach((e) => {
                                    e.classList.add("none")
                                    check_remove_note = true
                                })



                                // check_remove_note để xem có sự thay đổi không
                                if (check_remove_note) {
                                    return [number_element_note, current_element_note]
                                }
                            }
                        }
                    }
                }
            }

        }
    }
    return [null, null]
}

// Cặp loại trừ
// Áp dụng "Cặp loại trừ" khi một Ghi chú xuất hiện hai lần trong một khối và Ghi chú này cũng thuộc cùng một hàng hoặc cột. Điều này có nghĩa là Ghi chú chắc chắn phải là lời giải cho một trong hai ô trong khối. Vì vậy, bạn có thể loại bỏ Ghi chú này khỏi bất kỳ ô nào khác trong hàng hoặc cột.
function Cap_loai_tru() {
    let numbers_so_le_an = [[], [], [], [], [], [], [], [], []]
    thuc_hien_forEach(input_9x9, (input_9, input_1, key_9, key_1, row, col) => {
        numbers_so_le_an[key_9] += input_1.querySelector("input").attributes["data-note"].value
    })

    for (let current_9x9 in numbers_so_le_an) {
        number_solean = numbers_so_le_an[current_9x9]
        for (let number = 1; number <= 9; number++) {
            let because = [number]
            let so = []
            if (getOccurrence([...number_solean], number) === 2) {
                //tại input_9x9[curent_9x9] có check datanote nào có xuất hiện number
                for (let input_current of input_9x9[current_9x9]) {
                    let list = [...input_current.querySelector("input").attributes["data-note"].value]
                    if (getOccurrence(list, number) === 1) {
                        because.push(input_current)
                    }
                }
                // console.log(because);
                // check 2 số có nằm trên cùng 1 col or row ko
                let data_number = [because[1].querySelector("input").attributes["data-number"].value, because[2].querySelector("input").attributes["data-number"].value]
                if (data_number[0][0] === data_number[1][0]) {
                    // chung row
                    let number_row = NAME_INPUT_ROW.indexOf(data_number[0][0])
                    input_row[number_row].forEach((element) => {

                        if (!because.includes(element)) {
                            let note_span = element.querySelector(`span:nth-child(${Number(number) + 1}):not(.none)`)
                            if (note_span !== null) {
                                note_span.classList.add("none")
                                // console.log("ghi chú số ", number, " tại hàng ", number_row);
                                // console.log(note_span);

                                // lấy ra note
                                value_note = [...element.querySelector("input").attributes["data-note"].value]
                                // xoá đi số đã điền
                                let index_note_remove = value_note.indexOf(number + "");
                                if (index_note_remove > -1) {
                                    value_note.splice(index_note_remove, 1)
                                }
                                element.querySelector("input").attributes["data-note"].value = value_note.join("")
                                so.push(note_span)
                            }
                        }
                    })
                }
                if (data_number[0][1] === data_number[1][1]) {
                    // chung col
                    let number_col = data_number[0][1]
                    input_col[number_col].forEach((element) => {
                        if (!because.includes(element)) {
                            let note_span = element.querySelector(`span:nth-child(${Number(number) + 1}):not(.none)`)
                            if (note_span !== null) {
                                note_span.classList.add("none")
                                // console.log("ghi chú số ", number, " tại cột ", number_col);
                                // console.log(note_span);

                                // lấy ra note
                                value_note = [...element.querySelector("input").attributes["data-note"].value]
                                // xoá đi số đã điền
                                let index_note_remove = value_note.indexOf(number + "");
                                if (index_note_remove > -1) {
                                    value_note.splice(index_note_remove, 1)
                                }
                                element.querySelector("input").attributes["data-note"].value = value_note.join("")
                                so.push(note_span)
                            }
                        }
                    })
                }
            }
            if (so.length !== 0) {
                return [because, so]
            }
        }
    }
    return [null, null]
}

// bộ ba loại trừ
// Kỹ thuật "bộ ba loại trừ" rất giống với "Cặp loại trừ". Sử dụng kỹ thuật này nếu Ghi chú chỉ có trong ba ô của khối 3x3 và cũng thuộc cùng một hàng hoặc cột. Điều này có nghĩa là Ghi chú phải là lời giải cho một trong ba ô trong khối. Vì vậy, rõ ràng là nó không thể là lời giải của bất kỳ ô nào khác trong hàng hoặc cột và có thể được loại bỏ khỏi các hàng và cột đó.
function Bo_ba_loai_tru() {
    let numbers_so_le_an = [[], [], [], [], [], [], [], [], []]
    thuc_hien_forEach(input_9x9, (input_9, input_1, key_9, key_1, row, col) => {
        numbers_so_le_an[key_9] += input_1.querySelector("input").attributes["data-note"].value
    })

    for (let current_9x9 in numbers_so_le_an) {
        number_solean = numbers_so_le_an[current_9x9]
        for (let number = 1; number <= 9; number++) {
            let because = [number]
            let so = []
            if (getOccurrence([...number_solean], number) === 3) {
                //tại input_9x9[curent_9x9] có check datanote nào có xuất hiện number
                for (let input_current of input_9x9[current_9x9]) {
                    let list = [...input_current.querySelector("input").attributes["data-note"].value]
                    if (getOccurrence(list, number) === 1) {
                        because.push(input_current)
                    }
                }
                // console.log(because);
                // check 3 số có nằm trên cùng 1 col or row ko
                let data_number = [because[1].querySelector("input").attributes["data-number"].value, because[2].querySelector("input").attributes["data-number"].value, because[3].querySelector("input").attributes["data-number"].value]
                if (data_number[0][0] === data_number[1][0] && data_number[0][0] === data_number[2][0]) {
                    // chung row
                    let number_row = NAME_INPUT_ROW.indexOf(data_number[0][0])
                    input_row[number_row].forEach((element) => {

                        if (!because.includes(element)) {
                            let note_span = element.querySelector(`span:nth-child(${Number(number) + 1}):not(.none)`)
                            if (note_span !== null) {
                                note_span.classList.add("none")
                                // console.log("ghi chú số ", number, " tại hàng ", number_row);
                                // console.log(note_span);

                                // lấy ra note
                                value_note = [...element.querySelector("input").attributes["data-note"].value]
                                // xoá đi số đã điền
                                let index_note_remove = value_note.indexOf(number + "");
                                if (index_note_remove > -1) {
                                    value_note.splice(index_note_remove, 1)
                                }
                                element.querySelector("input").attributes["data-note"].value = value_note.join("")
                                so.push(note_span)
                            }
                        }
                    })
                }
                if (data_number[0][1] === data_number[1][1] && data_number[0][1] === data_number[2][1]) {
                    // chung col
                    let number_col = data_number[0][1]
                    input_col[number_col].forEach((element) => {
                        if (!because.includes(element)) {
                            let note_span = element.querySelector(`span:nth-child(${Number(number) + 1}):not(.none)`)
                            if (note_span !== null) {
                                note_span.classList.add("none")
                                // console.log("ghi chú số ", number, " tại cột ", number_col);
                                // console.log(note_span);

                                // lấy ra note
                                value_note = [...element.querySelector("input").attributes["data-note"].value]
                                // xoá đi số đã điền
                                let index_note_remove = value_note.indexOf(number + "");
                                if (index_note_remove > -1) {
                                    value_note.splice(index_note_remove, 1)
                                }
                                element.querySelector("input").attributes["data-note"].value = value_note.join("")
                                so.push(note_span)
                            }
                        }
                    })
                }
            }
            if (so.length !== 0) {
                return [because, so]
            }
        }
    }
    return [null, null]
}







function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v == value && count++));
    return count;
}
