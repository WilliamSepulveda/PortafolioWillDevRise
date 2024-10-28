document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("animatedButton");
    const hoverText = button.querySelector(".front-text");
    
    function animateButton() {
        hoverText.style.width = '100%'; 
        hoverText.style.filter = 'drop-shadow(0 0 23px #C0C0C0)'; 
    }

    animateButton();
    setTimeout(() => {
        window.location.href = "views/home.html"; 
    }, 5500); 
   
});

document.addEventListener("DOMContentLoaded", function () {

const cti = document.getElementById("cti");  
const ctiText = cti.getElementById(".CTI");

// Función para iniciar la animación del texto .CTI
function animateCTI() {
    ctiText.style.width = '100%'; 
    ctiText.style.filter = 'drop-shadow(0 0 23px #6019bd)';
}

animateCTI();  

});