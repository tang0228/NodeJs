(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086b7"],{a55b:function(e,n,t){"use strict";t.r(n);var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("p",[e._v("账号："),t("input",{directives:[{name:"model",rawName:"v-model",value:e.loginId,expression:"loginId"}],attrs:{type:"text"},domProps:{value:e.loginId},on:{input:function(n){n.target.composing||(e.loginId=n.target.value)}}})]),t("p",[e._v("密码："),t("input",{directives:[{name:"model",rawName:"v-model",value:e.loginPwd,expression:"loginPwd"}],attrs:{type:"password"},domProps:{value:e.loginPwd},on:{input:function(n){n.target.composing||(e.loginPwd=n.target.value)}}})]),t("p",[t("button",{on:{click:e.login}},[e._v("登录")])])])},i=[],r=t("1da1"),a=(t("96cf"),{data:function(){return{loginId:"",loginPwd:""}},methods:{login:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$store.dispatch("loginUser/login",{loginId:e.loginId,loginPwd:e.loginPwd});case 2:t=n.sent,t?(alert("登录成功"),e.$router.push("/")):alert("账号密码错误");case 4:case"end":return n.stop()}}),n)})))()}}}),l=a,u=t("2877"),s=Object(u["a"])(l,o,i,!1,null,null,null);n["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d2086b7.12078e40.js.map