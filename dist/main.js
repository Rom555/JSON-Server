(()=>{"use strict";const e=e=>{const t=document.getElementById("table-body");t.innerHTML="",e.forEach((e=>{t.insertAdjacentHTML("beforeend",`\n        <tr data-key="${e.id}">\n          <th scope="row">${e.id}</th>\n          <td>${e.name}</td>\n          <td>${e.email}</td>\n          <td>${e.children?"Есть":"Нет"}</td>\n          <td>\n              <div class="form-check form-switch">\n                  <input class="form-check-input" type="checkbox" role="switch"\n                      id="form-children" ${e.permissions?"checked":""}>\n              </div>\n          </td>\n          <td>\n              <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">\n                  <button type="button" class="btn btn-warning btn-edit">\n                      <i class="bi-pencil-square"></i>\n                  </button>\n                  <button type="button" class="btn btn-danger btn-remove">\n                      <i class="bi-person-x"></i>\n                  </button>\n              </div>\n          </td>\n      </tr>\n      `)}))};window.userService=new class{getUsers(){return fetch("http://localhost:4545/users").then((e=>e.json()))}addUser(e){return fetch("http://localhost:4545/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>e.json()))}removeUser(e){return fetch(`http://localhost:4545/users/${e}`,{method:"DELETE"}).then((e=>e.json()))}changeUser(e,t){return fetch(`http://localhost:4545/users/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((e=>e.json()))}getUser(e){return fetch(`http://localhost:4545/users/${e}`).then((e=>e.json()))}editUser(e,t){return fetch(`http://localhost:4545/users/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((e=>e.json()))}filterUsers(e){return fetch(`http://localhost:4545/users?${e}=true`).then((e=>e.json()))}getSortUsers(e){return fetch(`http://localhost:4545/users?_sort=${e.name}&_order=${e.value}`).then((e=>e.json()))}getSearchUsers(e){return fetch(`http://localhost:4545/users?name_like=${e}`).then((e=>e.json()))}},userService.getUsers().then((t=>{e(t)})),(()=>{const t=document.querySelector("form"),r=t.querySelector("#form-name"),s=t.querySelector("#form-email"),n=t.querySelector("#form-children");t.addEventListener("submit",(c=>{if(c.preventDefault(),!t.dataset.user){const c={name:r.value,email:s.value,children:n.checked,permissions:!1};userService.addUser(c).then((()=>{userService.getUsers().then((r=>{e(r),t.reset()}))}))}}))})(),document.getElementById("table-body").addEventListener("click",(t=>{if(t.target.closest(".btn-remove")){const r=t.target.closest("tr").dataset.key;userService.removeUser(r).then((()=>{userService.getUsers().then((t=>{e(t)}))}))}})),document.getElementById("table-body").addEventListener("click",(t=>{if(t.target.closest("input[type=checkbox]")){const r=t.target.closest("tr"),s=r.querySelector("input[type=checkbox]"),n=r.dataset.key;userService.changeUser(n,{permissions:s.checked}).then((()=>{userService.getUsers().then((t=>{e(t)}))}))}})),(()=>{const t=document.getElementById("table-body"),r=document.querySelector("form"),s=r.querySelector("#form-name"),n=r.querySelector("#form-email"),c=r.querySelector("#form-children");t.addEventListener("click",(e=>{if(e.target.closest(".btn-edit")){const t=e.target.closest("tr").dataset.key;userService.getUser(t).then((e=>{s.value=e.name,n.value=e.email,c.checked=e.children,r.dataset.user="1"}))}})),r.addEventListener("submit",(t=>{if(t.preventDefault(),r.dataset.user){const t=r.dataset.user,o={name:s.value,email:n.value,children:c.checked,permissions:!1};userService.editUser(t,o).then((()=>{userService.getUsers().then((t=>{e(t),r.reset(),r.removeAttribute("data-user")}))}))}}))})(),(()=>{const t=document.getElementById("btn-isChildren"),r=document.getElementById("btn-isPermissions"),s=document.getElementById("btn-isAll");t.addEventListener("click",(()=>{userService.filterUsers("children").then((t=>{e(t)}))})),r.addEventListener("click",(()=>{userService.filterUsers("permissions").then((t=>{e(t)}))})),s.addEventListener("click",(()=>{userService.getUsers().then((t=>{e(t)}))}))})(),(()=>{const t=document.getElementById("sort-is-children");let r=!1;t.style.cursor="pointer",t.addEventListener("click",(()=>{userService.getSortUsers({name:"children",value:r?"asc":"desc"}).then((t=>{e(t)})),r=!r}))})(),(()=>{const t=document.getElementById("search-input"),r=((e,t=300)=>{let r;return(...s)=>{clearTimeout(r),r=setTimeout((()=>{e.apply(void 0,s)}),t)}})((()=>{userService.getSearchUsers(t.value).then((t=>{e(t)}))}),500);t.addEventListener("input",r)})()})();