document.querySelector('.nav-mobile__toggle').addEventListener('click',handleNavClick)

function handleNavClick(e){
    document.querySelector('.nav-mobile__list').classList.toggle('d-none')
    let toggle = document.querySelector('.nav-mobile__toggle')
    toggle.src.includes('hamburger') ? toggle.src = "./dist/img/close.svg" : toggle.src = "./dist/img/hamburger.svg" 
}