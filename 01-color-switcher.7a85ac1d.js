const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let n=null;function a(t){t.disabled=!0}function o(t){t.disabled=!1}t.addEventListener("click",(()=>{n||(n=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.backgroundColor=t}),1e3),a(t),o(e))})),e.addEventListener("click",(()=>{clearInterval(n),n=null,a(e),o(t)}));
//# sourceMappingURL=01-color-switcher.7a85ac1d.js.map
