const a=document.getElementById("schedule"),r=a?.querySelectorAll(":scope > li");r?.forEach(t=>{const l=t.querySelectorAll("button[data-set]"),e=t.querySelector(".text"),c=e?.querySelector("div");!e||!c||l?.forEach(s=>{s.addEventListener("click",()=>{s.getAttribute("data-set")==="true"?(t.dataset.active="true",e.style.height=c.clientHeight+"px",e.style.opacity="1"):(delete t.dataset.active,e.style.height="0",e.style.opacity="0")})})});
