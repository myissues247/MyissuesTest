(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{wMrW:function(t,i,n){"use strict";n.r(i),n.d(i,"NotificationsModule",(function(){return v}));var c=n("ofXK"),o=n("tyNb"),e=n("fXoL"),s=n("DPk/"),b=n("OC8m");const r=["modalButton"];function a(t,i){if(1&t){const t=e.Rb();e.Qb(0,"div",8),e.Xb("click",(function(){e.zc(t);const i=e.bc().$implicit;return e.bc().check_notif(i)})),e.Qb(1,"p"),e.Qb(2,"i",9),e.Lb(3,"img",10),e.Pb(),e.Qb(4,"strong"),e.Jc(5),e.Pb(),e.Jc(6),e.Pb(),e.Qb(7,"span"),e.Jc(8),e.cc(9,"date"),e.Pb(),e.Pb()}if(2&t){const t=e.bc().$implicit;e.yb(5),e.Kc(t.fromName||"anonymous"),e.yb(1),e.Lc(" ",t.message.substr(0,30),"... "),e.yb(2),e.Kc(e.ec(9,3,t.createdOn,"medium"))}}function f(t,i){if(1&t){const t=e.Rb();e.Qb(0,"div",8),e.Xb("click",(function(){e.zc(t);const i=e.bc().$implicit;return e.bc().check_notif(i)})),e.Qb(1,"p"),e.Qb(2,"i",9),e.Lb(3,"img",10),e.Pb(),e.Qb(4,"strong"),e.Jc(5),e.Pb(),e.Jc(6),e.Pb(),e.Qb(7,"span"),e.Jc(8),e.cc(9,"date"),e.Pb(),e.Pb()}if(2&t){const t=e.bc().$implicit;e.yb(5),e.Kc(t.fromName||"anonymous"),e.yb(1),e.Lc(" ",t.message.substr(0,30),"... "),e.yb(2),e.Kc(e.ec(9,3,t.createdOn,"medium"))}}function d(t,i){if(1&t){const t=e.Rb();e.Qb(0,"div",8),e.Xb("click",(function(){e.zc(t);const i=e.bc().$implicit;return e.bc().check_notif(i)})),e.Qb(1,"p"),e.Qb(2,"i",9),e.Lb(3,"img",10),e.Pb(),e.Qb(4,"strong"),e.Jc(5,"From Admin: "),e.Pb(),e.Jc(6),e.Pb(),e.Qb(7,"span"),e.Jc(8),e.cc(9,"date"),e.Pb(),e.Pb()}if(2&t){const t=e.bc().$implicit;e.yb(6),e.Lc("",t.message.substr(0,30),"... "),e.yb(2),e.Lc("- ",e.ec(9,2,t.createdOn,"medium"),"")}}function l(t,i){if(1&t){const t=e.Rb();e.Qb(0,"div",8),e.Xb("click",(function(){e.zc(t);const i=e.bc().$implicit;return e.bc().check_notif(i)})),e.Qb(1,"p"),e.Qb(2,"i",9),e.Lb(3,"img",10),e.Pb(),e.Qb(4,"strong"),e.Jc(5,"From Admin: "),e.Pb(),e.Jc(6),e.Pb(),e.Qb(7,"span"),e.Jc(8),e.cc(9,"date"),e.Pb(),e.Pb()}if(2&t){const t=e.bc().$implicit;e.yb(6),e.Lc("",t.message.substr(0,30),"... "),e.yb(2),e.Lc("- ",e.ec(9,2,t.createdOn,"medium"),"")}}function p(t,i){if(1&t){const t=e.Rb();e.Qb(0,"div",8),e.Xb("click",(function(){e.zc(t);const i=e.bc().$implicit;return e.bc().check_notif(i)})),e.Qb(1,"p"),e.Qb(2,"i",9),e.Lb(3,"img",10),e.Pb(),e.Qb(4,"strong"),e.Jc(5,"From Admin: "),e.Pb(),e.Jc(6),e.Pb(),e.Qb(7,"span"),e.Jc(8),e.cc(9,"date"),e.Pb(),e.Pb()}if(2&t){const t=e.bc().$implicit;e.yb(6),e.Lc("",t.message.substr(0,30),"... "),e.yb(2),e.Lc("- ",e.ec(9,2,t.createdOn,"medium"),"")}}function g(t,i){if(1&t&&(e.Qb(0,"div",6),e.Hc(1,a,10,6,"div",7),e.Hc(2,f,10,6,"div",7),e.Hc(3,d,10,5,"div",7),e.Hc(4,l,10,5,"div",7),e.Hc(5,p,10,5,"div",7),e.Pb()),2&t){const t=i.$implicit;e.yb(1),e.ic("ngIf","donated"==t.type),e.yb(1),e.ic("ngIf","donated housing"==t.type),e.yb(1),e.ic("ngIf","rejected"==t.type),e.yb(1),e.ic("ngIf","approved"==t.type),e.yb(1),e.ic("ngIf","info"==t.type)}}function m(t,i){1&t&&(e.Qb(0,"p"),e.Jc(1,"You have 0 Notifications"),e.Pb())}function u(t,i){1&t&&e.Lb(0,"div",11)}const h=[{path:"",component:(()=>{class t{constructor(t,i){this.ds=t,this.notification=i,this.loading=!0,this.selectedNotif=null}get_notifications(){const t=this.db.transaction(["notifs"],"readwrite");t.objectStore("notifs").get(1),t.oncomplete=()=>{this.loading=!1,this.get_notifications_from_server()},t.onerror=()=>{console.log(t.error),this.get_notifications_from_server()}}get_notifications_from_server(){this.loading=!0,this.ds.get_notifications().subscribe(t=>{this.loading=!1,t.status?(this.notificationArray=t.data,this.save_notifs(t.data)):(alert(t.message),console.log(t))},t=>{this.loading=!1,t instanceof ErrorEvent?alert("sorry some unknown error occured in the browser"):alert(`${t.status} : ${t.error.message}`)})}save_notifs(t){if(this.db){const i=this.db.transaction(["notifs"],"readwrite");i.objectStore("notifs").add(t),i.oncomplete=()=>{}}else localStorage.setItem("notifs",JSON.stringify(t))}ngOnInit(){this.get_notifications()}check_notif(t){this.notification.showNotif(t)}}return t.\u0275fac=function(i){return new(i||t)(e.Kb(s.a),e.Kb(b.a))},t.\u0275cmp=e.Eb({type:t,selectors:[["app-notifications"]],viewQuery:function(t,i){var n;1&t&&e.Qc(r,!0),2&t&&e.vc(n=e.Yb())&&(i.modalButton=n.first)},inputs:{db:"db"},decls:6,vars:3,consts:[[1,"container-fluid",2,"padding","10px 0px"],[1,"row","w-100",2,"margin","0px"],["class","col-12 notif well",4,"ngFor","ngForOf"],[4,"ngIf"],[2,"display","flex","justify-content","center","align-items","center","width","100%","padding","15px 0px"],["class","loader-spinner","style","width: 60px; height: 60px; position: unset;",4,"ngIf"],[1,"col-12","notif","well"],["class","details px-1",3,"click",4,"ngIf"],[1,"details","px-1",3,"click"],[1,"icon-image"],["src","assets\\images\\cancel.png","alt","close icon",1,"icon"],[1,"loader-spinner",2,"width","60px","height","60px","position","unset"]],template:function(t,i){1&t&&(e.Qb(0,"section",0),e.Qb(1,"div",1),e.Hc(2,g,6,5,"div",2),e.Hc(3,m,2,0,"p",3),e.Qb(4,"div",4),e.Hc(5,u,1,0,"div",5),e.Pb(),e.Pb(),e.Pb()),2&t&&(e.yb(2),e.ic("ngForOf",i.notificationArray),e.yb(1),e.ic("ngIf",!i.loading&&0==i.notificationArray.length),e.yb(2),e.ic("ngIf",i.loading))},directives:[c.m,c.n],pipes:[c.d],styles:[".notif[_ngcontent-%COMP%]{position:relative;padding:10px 5px;cursor:pointer}.notif[_ngcontent-%COMP%]:hover{background:#f5f5f5}p[_ngcontent-%COMP%]{text-align:justify;font-size:15px;margin-bottom:0;color:#222221}strong[_ngcontent-%COMP%]{color:#8d0b77;font-weight:bolder}.notif[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:12px;display:block;text-align:right;color:#222221}.icon-image[_ngcontent-%COMP%]{margin-right:5px}.icon[_ngcontent-%COMP%]{width:20px;height:20px}"]}),t})()}];let y=(()=>{class t{}return t.\u0275mod=e.Ib({type:t}),t.\u0275inj=e.Hb({factory:function(i){return new(i||t)},imports:[[o.j.forChild(h)],o.j]}),t})();var P=n("3Pt+");let v=(()=>{class t{}return t.\u0275mod=e.Ib({type:t}),t.\u0275inj=e.Hb({factory:function(i){return new(i||t)},imports:[[c.b,y,P.j]]}),t})()}}]);