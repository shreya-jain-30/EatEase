document.addEventListener("DOMContentLoaded",function(){
let element=document.getElementById("gallery");
let backbtn=document.getElementById("back");
let nextbtn=document.getElementById("next");
let bodystyle=document.getElementById("bodystyle");
let heading=document.querySelectorAll(".heading_style");
let toggleBtn=document.getElementById('tgl');
element.addEventListener("wheel",(evt)=>{
    evt.preventDefault();
    element.scrollLeft+=evt.deltaY;
});
nextbtn.addEventListener("click",()=>{
    element.scrollLeft+=1200;
    element.style.scrollBehavior="smooth";
});
backbtn.addEventListener("click",()=>{
    element.scrollLeft-=1200;
    element.style.scrollBehavior="smooth";
});
toggleBtn.addEventListener('click',function(){
    console.log("hiiii")
    console.log(heading);
    console.log(bodystyle);
    if(bodystyle.classList.contains('dark'))
    {
        bodystyle.classList.remove('dark');
        bodystyle.classList.add('light');
        heading.forEach(e =>{
            e.classList.remove('night');
            e.classList.add('day');
        });
    }
    else{
        bodystyle.classList.add('dark');
        bodystyle.classList.remove('light');
        heading.forEach(e =>{
            e.classList.remove('day');
            e.classList.add('night');
        });
    }
})
let addToCart= document.querySelectorAll('.btn1')

// addToCart.forEach((addBtn)=>{
//     addBtn.addEventListener('click',(e)=>{
//         console.log(e);
//     })
// })

})

