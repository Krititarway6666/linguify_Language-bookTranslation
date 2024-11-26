const ratings=document.querySelectorAll(".ratings");
const ratingsContainer=document.querySelector(".ratings-container");
const sendBtn = document.querySelector('#send');
const pannel=document.querySelector("#panel");

let SelectedRatings="statisfied";

ratingsContainer.addEventListener("click",(e)=>{
  if(e.target.parentNode.classList.contains("rating")){
   // console.log(e.target.parentNode.classlList.contains("rating"));
   removeActive();
   e.target.parentNode.classList.add("active");
   selectedRating= e.target.nextElementSibling.innerHTML;
  }
});

sendBtn.addEventListener("click",()=>{
    pannel.innerHTML=`
    <p class="heart">❤️</p>
    <strong>Thank you</strong>
    <br>
    <strong>Feedback:${selectedRating}</strong>
    `;
});

function removeActive(){
    for(let i=0;i<ratings.length;i++){
        ratings[i].classList.remove("active");
    }
}