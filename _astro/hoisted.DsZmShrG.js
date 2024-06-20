const e=document.getElementById("hamburger");e?.addEventListener("click",()=>{e.dataset.active==="true"?delete e.dataset.active:e.dataset.active="true"});
