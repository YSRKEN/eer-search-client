(this["webpackJsonpeer-search-client"]=this["webpackJsonpeer-search-client"]||[]).push([[0],{10:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(3),l=a.n(c),m=a(1),o="3000"===window.location.port?"http://localhost:5000":window.location.protocol+"//"+window.location.host,s=function(e){var t=e.newItemList,a=Object(n.useState)(""),c=Object(m.a)(a,2),l=c[0],o=c[1],s=Object(n.useState)(""),i=Object(m.a)(s,2),u=i[0],d=i[1],E=Object(n.useState)(!1),f=Object(m.a)(E,2),p=f[0],h=f[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"row mt-3 justify-content-center"},r.a.createElement("div",{className:"col-12 col-md-8"},r.a.createElement("form",null,r.a.createElement("div",{className:"form-group d-flex my-0"},r.a.createElement("label",{className:"text-nowrap mr-3 mt-2",htmlFor:"filterWord"},"\u540d\u524d\u30d5\u30a3\u30eb\u30bf"),r.a.createElement("input",{type:"text",id:"filterWord",className:"form-control",placeholder:"\u5165\u529b\u3057\u305f\u30ef\u30fc\u30c9\u3092\u542b\u3080\u3082\u306e\u306e\u307f\u8868\u793a",value:l,onChange:function(e){o(e.currentTarget.value)}}))))),r.a.createElement("div",{className:"row mt-3 justify-content-center"},r.a.createElement("div",{className:"col-12 col-md-8"},r.a.createElement("table",{className:"border table table-striped table-nowrap table-bordered table-sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"text-nowrap",onClick:function(){"\u5546\u54c1\u540d"!==u?(d("\u5546\u54c1\u540d"),h(!1)):p?d(""):h(!0)}},"\u5546\u54c1\u540d"!==u?"\u5546\u54c1\u540d":"\u5546\u54c1\u540d"+(p?"\u2193":"\u2191")),r.a.createElement("th",{className:"text-nowrap",onClick:function(){"\u4fa1\u683c"!==u?(d("\u4fa1\u683c"),h(!1)):p?d(""):h(!0)}},"\u4fa1\u683c"!==u?"\u4fa1\u683c":"\u4fa1\u683c"+(p?"\u2193":"\u2191")),r.a.createElement("th",{className:"text-nowrap"},"\u753b\u50cf"))),r.a.createElement("tbody",null,function(){var e=t.filter((function(e){return""===l||e.name.includes(l)}));switch(u){case"\u5546\u54c1\u540d":e=e.sort((function(e,t){return e.name>t.name?1:e.name<t.name?-1:0}));break;case"\u4fa1\u683c":e=e.sort((function(e,t){return e.price>t.price?1:e.price<t.price?-1:0}))}return p&&(e=e.reverse()),e}().map((function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",{className:"align-middle"},r.a.createElement("a",{href:e.item_url,target:"_blank",rel:"noopener noreferrer"},e.name)),r.a.createElement("td",{className:"align-middle"},e.price),r.a.createElement("td",{className:"align-middle"},r.a.createElement("img",{src:e.image_url,width:60,height:60,alt:e.name})))})))))))},i=function(e){var t=e.usedItemList,a=Object(n.useState)(""),c=Object(m.a)(a,2),l=c[0],o=c[1],s=Object(n.useState)(""),i=Object(m.a)(s,2),u=i[0],d=i[1],E=Object(n.useState)(!1),f=Object(m.a)(E,2),p=f[0],h=f[1],b=Object(n.useState)(""),w=Object(m.a)(b,2),N=w[0],v=w[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"row mt-3 justify-content-center"},r.a.createElement("div",{className:"col-12 col-md-8"},r.a.createElement("form",null,r.a.createElement("div",{className:"form-group d-flex mt-0"},r.a.createElement("label",{className:"text-nowrap mr-3 mt-2",htmlFor:"filterWord"},"\u540d\u524d\u30d5\u30a3\u30eb\u30bf"),r.a.createElement("input",{type:"text",id:"filterWord",className:"form-control",placeholder:"\u5165\u529b\u3057\u305f\u30ef\u30fc\u30c9\u3092\u542b\u3080\u3082\u306e\u306e\u307f\u8868\u793a",value:l,onChange:function(e){o(e.currentTarget.value)}})),r.a.createElement("div",{className:"form-group d-flex mb-0"},r.a.createElement("label",{className:"text-nowrap mr-3 mt-2",htmlFor:"filterShop"},"\u8ca9\u58f2\u5e97"),r.a.createElement("select",{className:"form-control",id:"filterShop",value:N,onChange:function(e){v(e.currentTarget.value)}},r.a.createElement("option",{value:""},"(\u672a\u6307\u5b9a)"),r.a.createElement("option",{value:"\u5927\u962a\u65e5\u672c\u6a4b\u672c\u5e97"},"\u5927\u962a\u65e5\u672c\u6a4b\u672c\u5e97"),r.a.createElement("option",{value:"\u6885\u7530EST\u5e97"},"\u6885\u7530EST\u5e97"),r.a.createElement("option",{value:"\u540d\u53e4\u5c4b\u5927\u9808\u5e97"},"\u540d\u53e4\u5c4b\u5927\u9808\u5e97"),r.a.createElement("option",{value:"\u79cb\u8449\u539f\u5e97"},"\u79cb\u8449\u539f\u5e97")))))),r.a.createElement("div",{className:"row mt-3 justify-content-center"},r.a.createElement("div",{className:"col-12 col-md-8"},r.a.createElement("table",{className:"border table table-striped table-nowrap table-bordered table-sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"text-nowrap",onClick:function(){"\u5546\u54c1\u540d"!==u?(d("\u5546\u54c1\u540d"),h(!1)):p?d(""):h(!0)}},"\u5546\u54c1\u540d"!==u?"\u5546\u54c1\u540d":"\u5546\u54c1\u540d"+(p?"\u2193":"\u2191")),r.a.createElement("th",{className:"text-nowrap",onClick:function(){"\u4fa1\u683c"!==u?(d("\u4fa1\u683c"),h(!1)):p?d(""):h(!0)}},"\u4fa1\u683c"!==u?"\u4fa1\u683c":"\u4fa1\u683c"+(p?"\u2193":"\u2191")),r.a.createElement("th",{className:"text-nowrap"},"\u8ca9\u58f2\u5e97"),r.a.createElement("th",{className:"text-nowrap"},"\u5546\u54c1\u756a\u53f7"),r.a.createElement("th",{className:"text-nowrap"},"\u753b\u50cf"))),r.a.createElement("tbody",null,function(){var e=t.filter((function(e){return""===l||e.name.includes(l)}));switch(e=e.filter((function(e){return""===N||e.shop_name===N})),u){case"\u5546\u54c1\u540d":e=e.sort((function(e,t){return e.name>t.name?1:e.name<t.name?-1:0}));break;case"\u4fa1\u683c":e=e.sort((function(e,t){return e.price>t.price?1:e.price<t.price?-1:0}))}return p&&(e=e.reverse()),e}().map((function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",{className:"align-middle"},r.a.createElement("a",{href:e.item_url,target:"_blank",rel:"noopener noreferrer"},e.name)),r.a.createElement("td",{className:"align-middle"},e.price),r.a.createElement("td",{className:"align-middle"},e.shop_name),r.a.createElement("td",{className:"align-middle"},e.shop_item_id),r.a.createElement("td",{className:"align-middle"},r.a.createElement("img",{src:e.image_url,width:60,height:60,alt:e.name})))})))))))},u=function(e){var t=e.showMode,a=e.newItemList,n=e.usedItemList;switch(t){case"New":return r.a.createElement(s,{newItemList:a});case"Used":return r.a.createElement(i,{usedItemList:n});default:return r.a.createElement(r.a.Fragment,null)}},d=function(){var e=Object(n.useState)(""),t=Object(m.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)([]),s=Object(m.a)(l,2),i=s[0],d=s[1],E=Object(n.useState)([]),f=Object(m.a)(E,2),p=f[0],h=f[1],b=Object(n.useState)("New"),w=Object(m.a)(b,2),N=w[0],v=w[1],g=Object(n.useState)(!1),j=Object(m.a)(g,2),O=j[0],y=j[1];Object(n.useEffect)((function(){O&&("New"===N?fetch("".concat(o,"/search_new?item_name=").concat(a,"&remove_keyword")).then((function(e){return e.json()})).then((function(e){d(e),v("New"),y(!1)})):fetch("".concat(o,"/search_used?item_name=").concat(a,"&remove_keyword")).then((function(e){return e.json()})).then((function(e){h(e),v("Used"),y(!1)})))}),[O]);return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row mt-3 justify-content-center"},r.a.createElement("div",{className:"col-12 col-md-8 text-center"},r.a.createElement("h1",null,"e\u30a4\u30e4\u691c\u7d22\u30a2\u30d7\u30ea"))),r.a.createElement("div",{className:"row mt-3 justify-content-center"},r.a.createElement("div",{className:"col-12 col-md-8"},r.a.createElement("form",{className:"border p-3"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"searchWord"},"\u691c\u7d22\u30ef\u30fc\u30c9"),r.a.createElement("input",{type:"text",className:"form-control",id:"searchWord",placeholder:"\u691c\u7d22\u30ef\u30fc\u30c9",value:a,onChange:function(e){c(e.currentTarget.value)},readOnly:O})),r.a.createElement("div",{className:"form-group d-flex"},r.a.createElement("label",{className:"text-nowrap mt-2",htmlFor:"showMode"},"\u5546\u54c1\u72b6\u614b"),r.a.createElement("select",{className:"form-control ml-3",id:"showMode",value:N,onChange:function(e){"New"===e.currentTarget.value?(v("New"),d([])):(v("Used"),h([]))},disabled:O},r.a.createElement("option",{value:"New"},"\u65b0\u54c1"),r.a.createElement("option",{value:"Used"},"\u4e2d\u53e4")),r.a.createElement("button",{type:"button",className:"btn btn-primary text-nowrap ml-3",onClick:function(){y(!0)},disabled:""===a||O},"\u691c\u7d22"))))),r.a.createElement("div",{className:"row mt-3 justify-content-center"},r.a.createElement("div",{className:"col-12 col-md-8"},r.a.createElement("div",{className:"spinner-border text-primary ".concat(O?"":"d-none"),role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")))),r.a.createElement(u,{showMode:N,newItemList:i,usedItemList:p}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(9);l.a.render(r.a.createElement(d,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},4:function(e,t,a){e.exports=a(10)}},[[4,1,2]]]);
//# sourceMappingURL=main.a1758eca.chunk.js.map