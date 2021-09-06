const mainGrid = document.querySelector(".etch_screen")
console.log(mainGrid)
const sizeControl = document.querySelector(".sizeControl")
const erase = document.querySelector(".eraser")
const rainbowMode =  document.querySelector(".rainbow_mode")
const clearBtn =  document.querySelector(".clear")
const colorPicker =  document.querySelector("#colorPicker")
const colorMode =  document.querySelector(".color_mode")

let currentColor = "#333"
let currentMode = "color"

function setCurrentMode(newMode) {
    activeButton(newMode)
    currentMode = newMode
}

function criarGrid() {
    let tamanhoGrid = changeSize()
    let areaDoGrid = tamanhoGrid * tamanhoGrid

    for (let i = 1; i <= areaDoGrid; i++) {
        let gridItem = document.createElement("div");
        gridItem.addEventListener("mouseover", changeMode)
        gridItem.addEventListener("touchmove", changeMode)
        mainGrid.append(gridItem);
    }

    mainGrid.style.gridTemplateColumns = `repeat(${tamanhoGrid}, 1fr)`;
    mainGrid.style.gridTemplateRows = `repeat(${tamanhoGrid}, 1fr)`

    sizeControl.addEventListener("change", resetGrid);
}

function changeMode(event) {
    switch(currentMode) {
        case "rainbow":
            let r = Math.floor(Math.random() * 256)
            let g = Math.floor(Math.random() * 256)
            let b = Math.floor(Math.random() * 256)
            event.target.style.backgroundColor = `rgb(${r}, ${g} , ${b})`
            break;
        case "color":
            event.target.style.backgroundColor = colorPicker.value;
            break;
        case "eraser":
            event.target.style.backgroundColor = "white"
    }
}

function changeSize() {
    return sizeControl.value
}

function resetGrid() {
    mainGrid.innerHTML = ""
    changeSize()
    criarGrid()
}


rainbowMode.onclick = () => setCurrentMode("rainbow")
colorMode.onclick = ()  => setCurrentMode("color")
colorPicker.onchange = () => setCurrentMode("color")
erase.onclick = () => setCurrentMode("eraser")
clearBtn.onclick = () => resetGrid()
sizeControl.onmousemove = () => updateInfo()

criarGrid()

function activeButton(newMode) {
    switch(newMode) {
        case "color":
            colorMode.classList.add("active");
            rainbowMode.classList.remove("active");
            erase.classList.remove("active");
            break;
        case "rainbow":
            rainbowMode.classList.add("active");
            colorMode.classList.remove("active");
            erase.classList.remove("active");
            break;
        case "eraser":
            erase.classList.add("active");
            rainbowMode.classList.remove("active");
            colorMode.classList.remove("active");
            break;
    }
}