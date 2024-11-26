const animation = document.querySelectorAll(".card");
animation.forEach(animation=>{
animation.addEventListener('mousemove',(e)=>{
    animation.style.transform='translateZ(-30px)';
    //e.mouseX=aniX;
});
});