// life is easy //
function $_(selector, context) {
    return (context || document).querySelectorAll(selector);
}
function $(selector, context) {
    return (context || document).querySelector(selector);
}

function random(max=Number, min=0){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// life is easy //


function updateDiv(){
    const boxes = $_("main div");
    
    boxes.forEach(e => e.addEventListener('mouseover', function(){
        if(hoverToggle.checked || mouseDown){            
            if(rgbToggle.checked){
                e.style.backgroundColor = `rgb(${random(255)},${random(255)},${random(255)})`;
            }else{
                e.style.backgroundColor = theme.backgroundColor;
                
            }
        }
    }));
}

function updateLogoColor(){
    if(rgbToggle.checked){
        logo.style.fill = `rgb(${random(255)},${random(255)},${random(255)})`;
    }
}


function updateUI(){

    logo.style.fill = theme.backgroundColor;
    range.style.accentColor = theme.backgroundColor;
    
    toggleButtonsSVG.forEach(e => {
        checkedSVG = e.getAttribute('id');
        
        if(e.parentElement.previousElementSibling.checked){
            $(`#${checkedSVG} line`).style.stroke = theme.backgroundColor;
            $(`#${checkedSVG} circle`).style.fill = theme.backgroundColor;
        }else{
            $(`#${checkedSVG} line`).style.stroke = "#313131";
            $(`#${checkedSVG} circle`).style.fill = "#313131";
        }    
    });    
    
    if(tinycolor(theme.backgroundColor).getBrightness() < 100 ){
        theme.color = "#f5f5f5";
    }else{
        theme.color = "#313131";
    }    

    updateLogoColor();
    
}    



function changeColor(e){
    theme.backgroundColor = e.target.value;
    rgbToggle.checked = false;
    updateUI();
}    


function btnHoverIn(e){
    e.target.style.backgroundColor = theme.backgroundColor;
    e.target.style.color = theme.color;
}

function btnHoverOut(e){
    e.target.style.backgroundColor = '#313131';
    e.target.style.color = '#eeeeee';
}

function toggleBorder(){
const boxes = $_("main div");
    switch(border.checked){
        case true:
            boxes.forEach(e => e.style.border = "1px solid #bbb");
            break;
        default:
            boxes.forEach(e => e.style.border = "none");
    }
}


function updateGird(e){

    setGrid(e.target.value)
}

function setGrid(num = 64){
    required =  num *  num ;
    main.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    main.style.gridTemplateRows = `repeat(${num}, 1fr)`;
    main.innerHTML = ""
    display.value = `${num} * ${num}`

    for(let i = 0; i < required; i++){
        let div = document.createElement('div');
        main.appendChild(div);
    }
    toggleBorder();
}
    
function clearAll(){
    const boxes = $_("main div");
    boxes.forEach(e => e.style.backgroundColor = `#d0f0f0`);
}


function resetAll(){
    slider.value = 20;
    borderToggle.checked = true;
    rgbToggle.checked = false;
    hoverToggle.checked = true;
    toggleBorder();
    initialize();
}


function initialize(){
    theme.backgroundColor= `rgb(${random(255)},${random(255)},${random(255)})`,
    color.value = tinycolor(theme.backgroundColor).toHexString();
    inputButtons.forEach(e => {
        e.style.backgroundColor = "#313131";
        e.style.color = '#eeeeee';
    });
    setGrid(20);
    updateUI();
}

const main = $('main');
const color = $('#color');
const logo = $('.logo');
const slider = $('#range');
const toggleButtons = $_(".control-top");
const rgbToggle = $("#rgb");
const hoverToggle = $("#hover");
const borderToggle = $("#border");
const toggleButtonsSVG = $_(".control-top svg");
const display = $("#display");
const inputButtons = $_("input[type=button]");
const reset = $("#reset");
const clear = $("#clear");


const theme = {
    backgroundColor: "#ffa500",
    textColor: "#313131"
}

let mouseDown = false
document.onmousedown = () => (mouseDown = true)
document.onmouseup = () => (mouseDown = false)

clear.addEventListener('click', clearAll);
reset.addEventListener("click", resetAll);
slider.addEventListener('input', updateGird);
color.addEventListener('input', changeColor);
main.addEventListener('mouseenter', updateDiv);
borderToggle.addEventListener("change", toggleBorder);
logo.addEventListener('transitionend', updateLogoColor);
toggleButtons.forEach(e => {e.addEventListener("change", updateUI)});
inputButtons.forEach(e => {e.addEventListener("mouseenter", btnHoverIn)});
inputButtons.forEach(e => {e.addEventListener("mouseout", btnHoverOut)});


initialize();

