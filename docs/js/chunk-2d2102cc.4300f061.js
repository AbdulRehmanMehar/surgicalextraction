(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2102cc"],{b789:function(t,a,r){"use strict";r.r(a);var e=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"container",staticStyle:{margin:"100px auto"}},[r("div",{staticClass:"card"},[t._m(0),r("div",{staticClass:"card-content"},[r("div",{staticClass:"content"},[r("div",{staticClass:"table-container",staticStyle:{"overflow-x":"auto"}},[r("table",{staticClass:"table"},[t._m(1),t.$root.cart&&t.$root.cart.length?r("tbody",[t._l(t.$root.cart,(function(a,e){return r("tr",{key:e},[r("td",[t._v(t._s(++e))]),r("td",[r("router-link",{attrs:{to:{name:"product",params:{id:a.product.id}}}},[t._v("\n                                        "+t._s(a.product.name)+"\n                                    ")])],1),r("td",[r("router-link",{attrs:{to:{name:"category",params:{id:a.product.category.id}}}},[t._v("\n                                        "+t._s(a.product.category.name)+"\n                                    ")])],1),r("td",[r("QuantityUpdateModule",{attrs:{cart:a}})],1),r("td",[r("a",{on:{click:function(r){return r.preventDefault(),t.$root.removeFromCart(r,a)}}},[t._v("Remove")])])])})),r("tr",[r("td",{staticClass:"has-text-right",attrs:{colspan:"4"}},[r("a",{staticClass:"button is-danger",on:{click:function(a){return a.preventDefault(),t.$root.deleteCart(a)}}},[t._v("Delete Cart")])]),r("td",[t.$root.isLoggedIn?r("a",{staticClass:"button is-primary",on:{click:function(a){return a.preventDefault(),t.$root.placeOrder(a)}}},[t._v("Place Order")]):r("router-link",{staticClass:"button is-primary",attrs:{to:{name:"login"}}},[t._v("Login & Place Order")])],1)])],2):r("tbody",[t._m(2)])])])])])])])},n=[function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"card-header"},[r("p",{staticClass:"card-header-title"},[t._v("Cart")])])},function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("thead",[r("tr",[r("th",[t._v("#")]),r("th",[t._v("Product Name")]),r("th",[t._v("Product Category")]),r("th",[t._v("Quantity")]),r("th",[t._v("Actions")])])])},function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("tr",[r("th",{attrs:{colspan:"5"}},[t._v("No product was found!")])])}],o=function(){return r.e("chunk-2d0cbaa9").then(r.bind(null,"4b49"))},c={data:function(){return{form:{handler:[]}}},components:{QuantityUpdateModule:o}},s=c,i=r("2877"),l=Object(i["a"])(s,e,n,!1,null,null,null);a["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d2102cc.4300f061.js.map