const e="https://api.thecatapi.com/v1",n="/breeds",t="/images/search",r="live_mye044TqDGd7C2kKYclUMX2fGyrdn4mufug3Nw2qAIdAiNI07c5VLd8fYptvXDPT";function s(n){return fetch(`${e}/images/${n}`).then((e=>{if(!e.ok)throw new Error(responce.status);return e.json()}))}const a=document.querySelector(".breed-select"),i=document.querySelector(".cat-info");fetch(`${e}${n}?${r}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()})).then((e=>{!function(e){const n=e.map((({id:e,name:n})=>`<option class = "cat" value="${e}">${n}</option>`)).join("");a.insertAdjacentHTML("beforeend",n)}(e)})),a.addEventListener("change",(function(n){(a=n.target.value,fetch(`${e}${t}?breed_ids=${a}&${r}`).then((e=>{if(!e.ok)throw new Error(responce.status);return e.json()}))).then((e=>e.map((({id:e})=>{s(e).then((e=>i.innerHTML=function({breeds:e,url:n}){return` <div>\n  <img src="${n}" alt="${e.map((({name:e})=>e))}" width = "300"></div>\n  <div class="cat-information">\n    <h2 class="title">${e.map((({name:e})=>e))}</h2>\n    <p class="description">${e.map((({description:e})=>e))}</p>\n    <h3 class="temperament">Temperament:</h3>\n    <span class="description">${e.map((({temperament:e})=>e))}</span>\n  \n</div>`}(e)))}))));var a}));
//# sourceMappingURL=index.9b591184.js.map
