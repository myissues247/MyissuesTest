!function(){function n(t,i){return(n=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(t,i)}function t(n){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var o,b=e(n);if(t){var a=e(this).constructor;o=Reflect.construct(b,arguments,a)}else o=b.apply(this,arguments);return i(this,o)}}function i(n,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}(n):t}function e(n){return(e=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function o(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function b(n,t){for(var i=0;i<t.length;i++){var e=t[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}function a(n,t,i){return t&&b(n.prototype,t),i&&b(n,i),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"1G5W":function(i,e,b){"use strict";b.d(e,"a",(function(){return c}));var r=b("zx2A");function c(n){return function(t){return t.lift(new s(n))}}var s=function(){function n(t){o(this,n),this.notifier=t}return a(n,[{key:"call",value:function(n,t){var i=new l(n),e=Object(r.c)(this.notifier,new r.a(i));return e&&!i.seenValue?(i.add(e),t.subscribe(i)):i}}]),n}(),l=function(i){!function(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(i&&i.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),i&&n(t,i)}(b,i);var e=t(b);function b(n){var t;return o(this,b),(t=e.call(this,n)).seenValue=!1,t}return a(b,[{key:"notifyNext",value:function(){this.seenValue=!0,this.complete()}},{key:"notifyComplete",value:function(){}}]),b}(r.b)},vUKi:function(n,t,i){"use strict";i.d(t,"a",(function(){return k}));var e=i("XNiG"),b=i("1G5W"),r=i("fXoL"),c=i("ndxW"),s=i("tyNb"),l=i("DPk/"),p=i("ofXK");function d(n,t){if(1&n){var i=r.Rb();r.Qb(0,"div",57),r.Qb(1,"div",58),r.Qb(2,"div",59),r.Qb(3,"button",60),r.Xb("click",(function(){return r.zc(i),r.bc().showSignUpPopup()})),r.Lb(4,"i",61),r.Pb(),r.Qb(5,"ul"),r.Qb(6,"li",60),r.Xb("click",(function(){return r.zc(i),r.bc().showSignInPopup()})),r.Jc(7,"Sign In"),r.Pb(),r.Qb(8,"li",62),r.Jc(9,"Sign Up"),r.Pb(),r.Pb(),r.Pb(),r.Qb(10,"div",63),r.Qb(11,"div",26),r.Qb(12,"div",64),r.Qb(13,"div",65),r.Qb(14,"label"),r.Jc(15,"User Name "),r.Qb(16,"sup"),r.Jc(17,"*"),r.Pb(),r.Pb(),r.Lb(18,"input",66),r.Pb(),r.Pb(),r.Pb(),r.Qb(19,"div",26),r.Qb(20,"div",64),r.Qb(21,"div",65),r.Qb(22,"label"),r.Jc(23,"First Name "),r.Qb(24,"sup"),r.Jc(25,"*"),r.Pb(),r.Pb(),r.Lb(26,"input",66),r.Pb(),r.Pb(),r.Pb(),r.Qb(27,"div",26),r.Qb(28,"div",64),r.Qb(29,"div",65),r.Qb(30,"label"),r.Jc(31,"Last Name "),r.Qb(32,"sup"),r.Jc(33,"*"),r.Pb(),r.Pb(),r.Lb(34,"input",66),r.Pb(),r.Pb(),r.Pb(),r.Qb(35,"div",26),r.Qb(36,"div",64),r.Qb(37,"div",65),r.Qb(38,"label"),r.Jc(39,"E-mail Address "),r.Qb(40,"sup"),r.Jc(41,"*"),r.Pb(),r.Pb(),r.Lb(42,"input",66),r.Pb(),r.Pb(),r.Pb(),r.Qb(43,"div",26),r.Qb(44,"div",64),r.Qb(45,"div",65),r.Qb(46,"label"),r.Jc(47,"Password "),r.Qb(48,"sup"),r.Jc(49,"*"),r.Pb(),r.Pb(),r.Lb(50,"input",67),r.Qb(51,"i",68),r.Xb("click",(function(){return r.zc(i),r.bc().showPass()})),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Qb(52,"div",26),r.Qb(53,"div",64),r.Qb(54,"div",65),r.Qb(55,"label"),r.Jc(56,"Confirm Password "),r.Qb(57,"sup"),r.Jc(58,"*"),r.Pb(),r.Pb(),r.Lb(59,"input",66),r.Pb(),r.Pb(),r.Pb(),r.Lb(60,"br"),r.Qb(61,"div",26),r.Qb(62,"div",27),r.Qb(63,"label",69),r.Lb(64,"input",70),r.Lb(65,"span",71),r.Qb(66,"p"),r.Jc(67,"Browser "),r.Lb(68,"br"),r.Jc(69," Donor"),r.Pb(),r.Pb(),r.Pb(),r.Qb(70,"div",27),r.Qb(71,"label",69),r.Lb(72,"input",72),r.Lb(73,"span",71),r.Qb(74,"p"),r.Jc(75,"Receiver "),r.Lb(76,"br"),r.Jc(77,"Advertiser"),r.Pb(),r.Pb(),r.Pb(),r.Qb(78,"div",27),r.Qb(79,"label",69),r.Lb(80,"input",72),r.Lb(81,"span",71),r.Qb(82,"p"),r.Jc(83,"Agency "),r.Lb(84,"br"),r.Jc(85,"Community"),r.Pb(),r.Pb(),r.Pb(),r.Qb(86,"div",27),r.Qb(87,"label",69),r.Lb(88,"input",72),r.Lb(89,"span",71),r.Qb(90,"p"),r.Jc(91,"volunteers "),r.Lb(92,"br"),r.Jc(93,"Helper"),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Lb(94,"br"),r.Qb(95,"div",26),r.Qb(96,"div",64),r.Qb(97,"label",73),r.Lb(98,"input",74),r.Lb(99,"span",75),r.Qb(100,"p"),r.Jc(101,"I agree to the terms condition"),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Qb(102,"div",26),r.Qb(103,"div",64),r.Qb(104,"button",76),r.Jc(105,"Sign Up"),r.Pb(),r.Pb(),r.Pb(),r.Qb(106,"div",77),r.Qb(107,"p"),r.Jc(108,"By continuing, you agree to the "),r.Qb(109,"a",51),r.Jc(110,"Myissues terms"),r.Pb(),r.Jc(111," and "),r.Qb(112,"a",51),r.Jc(113,"acknowledge receipt our Privacy Policy"),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb()}if(2&n){var e=r.bc();r.yb(1),r.ic("ngClass",e.isSignUpPopup?"slide_up":"slide_down"),r.yb(49),r.ic("type",e.isPassword?"text":"password"),r.yb(1),r.ic("ngClass",e.isPassword?"fa-eye":"fa-eye-slash")}}function g(n,t){if(1&n){var i=r.Rb();r.Qb(0,"div",57),r.Qb(1,"div",58),r.Qb(2,"div",59),r.Qb(3,"button",60),r.Xb("click",(function(){return r.zc(i),r.bc().showSignInPopup()})),r.Lb(4,"i",61),r.Pb(),r.Qb(5,"ul"),r.Qb(6,"li",62),r.Jc(7,"Sign In"),r.Pb(),r.Qb(8,"li",60),r.Xb("click",(function(){return r.zc(i),r.bc().showSignUpPopup()})),r.Jc(9,"Sign Up"),r.Pb(),r.Pb(),r.Pb(),r.Qb(10,"div",63),r.Qb(11,"div",26),r.Qb(12,"div",64),r.Qb(13,"div",65),r.Qb(14,"label"),r.Jc(15,"Email"),r.Pb(),r.Lb(16,"input",66),r.Pb(),r.Pb(),r.Pb(),r.Qb(17,"div",26),r.Qb(18,"div",64),r.Qb(19,"div",65),r.Qb(20,"label"),r.Jc(21,"Password"),r.Pb(),r.Lb(22,"input",66),r.Pb(),r.Pb(),r.Pb(),r.Lb(23,"br"),r.Qb(24,"div",26),r.Qb(25,"div",64),r.Qb(26,"label",73),r.Lb(27,"input",74),r.Lb(28,"span",75),r.Qb(29,"p"),r.Jc(30,"Remember my device for 90 days"),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Qb(31,"div",26),r.Qb(32,"div",64),r.Qb(33,"button",76),r.Jc(34,"Sign In"),r.Pb(),r.Pb(),r.Pb(),r.Qb(35,"div",78),r.Qb(36,"ul"),r.Qb(37,"li",60),r.Xb("click",(function(){return r.zc(i),r.bc().showSignUpPopup()})),r.Jc(38,"New to MyIssues? SignUp"),r.Pb(),r.Qb(39,"li",60),r.Xb("click",(function(){return r.zc(i),r.bc().forgotPopup()})),r.Jc(40,"Forgot your password?"),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb()}if(2&n){var e=r.bc();r.yb(1),r.ic("ngClass",e.isSignInPopup?"slide_up":"slide_down")}}var u,P=function(){return["active_mobile"]},f=function(){return{exact:!0}},m=((u=function(){function n(t){o(this,n),this.router=t,this.isShowNav=!1,this.isSignUpPopup=!1,this.isPassword=!1,this.isSignInPopup=!1}return a(n,[{key:"ngOnInit",value:function(){}},{key:"showMobileNav",value:function(){this.isShowNav=!this.isShowNav}},{key:"showSignUpPopup",value:function(){this.isSignUpPopup=!this.isSignUpPopup,this.isSignInPopup=!1}},{key:"showPass",value:function(){this.isPassword=!this.isPassword}},{key:"showSignInPopup",value:function(){this.isSignInPopup=!this.isSignInPopup,this.isSignUpPopup=!1}},{key:"forgotPopup",value:function(){this.isSignInPopup=!1,this.isShowNav=!1,this.router.navigate(["/reset-password"])}}]),n}()).\u0275fac=function(n){return new(n||u)(r.Kb(s.f))},u.\u0275cmp=r.Eb({type:u,selectors:[["app-userheader-mobile"]],decls:122,vars:15,consts:[[1,"header"],[1,"navbar","pb-3","navbar-expand","navbar-light","bg-white"],[1,"container-fluid"],["href","#",1,"navbar-brand"],["src","assets/images/logo.png","alt","logo",1,"img-fluid"],["id","navbarSupportedContent",1,"navbar-collapse"],[1,"navbar-nav","ms-auto","align-items-center"],[1,"nav-item"],["href","#",1,"nav-link"],["src","assets/images3/icon/corona.svg.png","alt","corona",1,"img-fluid"],["src","assets/images3/icon/Horn-Icon.png","alt","horn",1,"img-fluid"],[1,"nav-item","dropdown"],["href","#","id","navbarDropdown","role","button","data-bs-toggle","dropdown","aria-expanded","false",1,"nav-link","dropdown-toggle"],["aria-labelledby","navbarDropdown",1,"dropdown-menu","dropdown-menu-end","inharit_transform"],["href","#",1,"dropdown-item"],[1,"vr","ms-sm-2","ms-3","me-2"],[1,"nav-item",3,"click"],[1,"nav-link"],[1,"fas","fa-list-ul"],[1,"mobile_nav_container",3,"ngClass","click"],[1,"mobile_primary_nav"],["routerLink","/",3,"routerLinkActive","routerLinkActiveOptions"],["routerLink","/myissues/ad-foodbank",1,"active_mobile",3,"routerLinkActive","routerLinkActiveOptions"],["routerLink","/blog",3,"routerLinkActive","routerLinkActiveOptions"],[1,"add_center"],[1,"content-card"],[1,"row"],[1,"col-6"],["routerLink","/bumps/bumps-list",1,"btn","button-custom"],["src","../../../assets/images2/a-b.png","alt","a"],["href","#",1,"btn","button-custom","yellow"],["src","../../../assets/images2/p-a.png","alt","s"],[1,"mobile_sub_nav"],["routerLink","/myissues/how-it-works"],[1,"fa-brands","fa-canadian-maple-leaf"],["routerLink","/myissues/ad-donors"],["routerLink","/myissues/about-us"],["routerLink","/myissues/volunteer"],["routerLink","/blog"],["routerLink","/myissues/privacy-policy"],[1,"mobile_accountandcart_nav"],["src","../../../assets/images2/note-edit-icon.png","alt",""],["src","../../../assets/images2/live-img-icon.png","alt",""],["src","../../../assets/images2/cart-icon.png","alt",""],[1,"mobile_info_nav"],[1,"row","gy-4"],[1,"col-sm-6","col","text-nowrap","d-flex","align-items-center"],["src","../../../../assets/images2/Q.png","alt","image"],["routerLink","/ad-faq"],[1,"d-flex","align-items-center"],["src","../../../../assets/images2/settings.png","alt","image"],["href","#"],["src","../../../../assets/images2/plus.png","alt","s",1,"ps-4"],["routerLink","/ad-service/privacy-settings"],["src","../../../../assets/images2/l-out.png","alt","image"],[1,"m-0","ps-3"],["class","popup_feed",4,"ngIf"],[1,"popup_feed"],[1,"popup_container",3,"ngClass"],[1,"popup_header"],[3,"click"],[1,"fa-solid","fa-xmark"],[1,"active_form_tab"],[1,"popup_content"],[1,"col-md-12"],[1,"form_input_box"],["type","text"],[3,"type"],[1,"far",3,"ngClass","click"],[1,"radiobutton_two"],["type","radio","name","user_type","checked","checked"],[1,"selectradio_two"],["type","radio","name","user_type"],[1,"checkbox"],["type","checkbox"],[1,"checkmark"],[1,"signup_btn"],[1,"popup_bottom_link"],[1,"popup_bottom_link","mt_0"]],template:function(n,t){1&n&&(r.Qb(0,"header",0),r.Qb(1,"nav",1),r.Qb(2,"div",2),r.Qb(3,"a",3),r.Lb(4,"img",4),r.Pb(),r.Qb(5,"div",5),r.Qb(6,"ul",6),r.Qb(7,"li",7),r.Qb(8,"a",8),r.Lb(9,"img",9),r.Pb(),r.Pb(),r.Qb(10,"li",7),r.Qb(11,"a",8),r.Lb(12,"img",10),r.Pb(),r.Pb(),r.Qb(13,"li",11),r.Qb(14,"a",12),r.Jc(15," En "),r.Pb(),r.Qb(16,"ul",13),r.Qb(17,"li"),r.Qb(18,"a",14),r.Jc(19,"Bn"),r.Pb(),r.Pb(),r.Qb(20,"li"),r.Qb(21,"a",14),r.Jc(22,"En(UK)"),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Lb(23,"div",15),r.Qb(24,"li",16),r.Xb("click",(function(){return t.showMobileNav()})),r.Qb(25,"a",17),r.Lb(26,"i",18),r.Pb(),r.Pb(),r.Pb(),r.Qb(27,"div",19),r.Xb("click",(function(){return t.showMobileNav()})),r.Qb(28,"ul",20),r.Qb(29,"li"),r.Qb(30,"a",21),r.Jc(31,"ADS"),r.Pb(),r.Pb(),r.Qb(32,"li"),r.Qb(33,"a",22),r.Jc(34,"FOODBANK"),r.Pb(),r.Pb(),r.Qb(35,"li"),r.Qb(36,"a",23),r.Jc(37,"BLOG"),r.Pb(),r.Pb(),r.Pb(),r.Qb(38,"ul",24),r.Qb(39,"div",25),r.Qb(40,"div",26),r.Qb(41,"div",27),r.Qb(42,"a",28),r.Qb(43,"span"),r.Lb(44,"img",29),r.Pb(),r.Jc(45," Add Center"),r.Pb(),r.Pb(),r.Qb(46,"div",27),r.Qb(47,"a",30),r.Qb(48,"span"),r.Lb(49,"img",31),r.Pb(),r.Jc(50," Post Add"),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Qb(51,"ul",32),r.Qb(52,"li"),r.Qb(53,"a",33),r.Lb(54,"i",34),r.Jc(55," How Myissues Work"),r.Pb(),r.Pb(),r.Qb(56,"li"),r.Qb(57,"a",35),r.Lb(58,"i",34),r.Jc(59," Your Donations"),r.Pb(),r.Pb(),r.Qb(60,"li"),r.Qb(61,"a",36),r.Lb(62,"i",34),r.Jc(63," About us"),r.Pb(),r.Pb(),r.Qb(64,"li"),r.Qb(65,"a",37),r.Lb(66,"i",34),r.Jc(67," Volunteer Now"),r.Pb(),r.Pb(),r.Qb(68,"li"),r.Qb(69,"a",38),r.Lb(70,"i",34),r.Jc(71," Blog"),r.Pb(),r.Pb(),r.Qb(72,"li"),r.Qb(73,"a",39),r.Lb(74,"i",34),r.Jc(75," Privacy"),r.Pb(),r.Pb(),r.Pb(),r.Qb(76,"ul",40),r.Qb(77,"li"),r.Lb(78,"img",41),r.Qb(79,"p"),r.Jc(80,"Start your "),r.Lb(81,"br"),r.Jc(82," account"),r.Pb(),r.Pb(),r.Qb(83,"li"),r.Lb(84,"img",42),r.Qb(85,"p"),r.Jc(86,"Live online counselling "),r.Lb(87,"br"),r.Jc(88," & medical service"),r.Pb(),r.Pb(),r.Qb(89,"li"),r.Lb(90,"img",43),r.Qb(91,"p"),r.Jc(92,"Shopping "),r.Lb(93,"br"),r.Jc(94," cart"),r.Pb(),r.Pb(),r.Pb(),r.Qb(95,"ul",44),r.Qb(96,"div",25),r.Qb(97,"div",45),r.Qb(98,"div",46),r.Lb(99,"img",47),r.Qb(100,"a",48),r.Jc(101,"Support"),r.Pb(),r.Pb(),r.Qb(102,"div",46),r.Qb(103,"div",49),r.Lb(104,"img",50),r.Qb(105,"a",51),r.Jc(106,"$0.00"),r.Pb(),r.Pb(),r.Qb(107,"a",51),r.Lb(108,"img",52),r.Pb(),r.Pb(),r.Qb(109,"div",46),r.Lb(110,"img",50),r.Qb(111,"a",53),r.Jc(112,"Settings"),r.Pb(),r.Pb(),r.Qb(113,"div",46),r.Qb(114,"div",49),r.Lb(115,"img",54),r.Qb(116,"a",51),r.Jc(117,"Log Out"),r.Pb(),r.Pb(),r.Qb(118,"p",55),r.Jc(119,"firegirl"),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Pb(),r.Hc(120,d,114,3,"div",56),r.Hc(121,g,41,1,"div",56)),2&n&&(r.yb(27),r.ic("ngClass",t.isShowNav?"show_nav":"hide_nav"),r.yb(3),r.ic("routerLinkActive",r.mc(9,P))("routerLinkActiveOptions",r.mc(10,f)),r.yb(3),r.ic("routerLinkActive",r.mc(11,P))("routerLinkActiveOptions",r.mc(12,f)),r.yb(3),r.ic("routerLinkActive",r.mc(13,P))("routerLinkActiveOptions",r.mc(14,f)),r.yb(84),r.ic("ngIf",t.isSignUpPopup),r.yb(1),r.ic("ngIf",t.isSignInPopup))},directives:[p.l,s.i,s.h,p.n],styles:[".mobile_nav_container[_ngcontent-%COMP%]{position:fixed;right:0;height:100%;top:0;padding:15px;background-color:#f1f1f1;box-shadow:0 0 10px 0 rgb(0 0 0/10%);transition:.3s ease-in-out;z-index:99;width:100%;max-width:600px;overflow-y:auto}.close_btn[_ngcontent-%COMP%]{background-color:#f1f1f1;border:0;font-size:22px;position:absolute;left:8px;padding:6px;line-height:.1;border-right:0;top:0;cursor:pointer;color:#006e85}.nav_mobile_right[_ngcontent-%COMP%]{padding:0;margin:0;display:flex;align-items:center}.nav_mobile_right[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none;display:inline-block;margin-left:30px;font-size:18px;line-height:1;cursor:pointer}.nav_mobile_right[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:30px}.nav_mobile_right[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:36px;padding-left:6px}.show_nav[_ngcontent-%COMP%]{-webkit-animation:slideLeft .3s forwards;animation:slideLeft .3s forwards;visibility:visible;opacity:1}.hide_nav[_ngcontent-%COMP%]{-webkit-animation:slideRight .3s forwards;animation:slideRight .3s forwards;visibility:hidden;opacity:0}@-webkit-keyframes slideLeft{0%{transform:translateX(100%)}to{transform:translateX(0)}}@keyframes slideLeft{0%{transform:translateX(100%)}to{transform:translateX(0)}}@-webkit-keyframes slideRight{0%{transform:translateX(0)}to{transform:translateX(100%)}}@keyframes slideRight{0%{transform:translateX(0)}to{transform:translateX(100%)}}.mobile_primary_nav[_ngcontent-%COMP%]{width:100%;height:auto;padding-left:0}.mobile_primary_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{width:100%;height:auto;display:list-item;list-style:none;border-left:5px solid #fff}.mobile_primary_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child{border-left-color:#fdb934}.mobile_primary_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;background-color:#fff;margin-bottom:6px;text-decoration:none;color:#006e85;text-transform:uppercase;font-size:16px;font-weight:600;transition:.3s ease-in-out;padding:15px 10px}.mobile_primary_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#fdb934}.active_mobile[_ngcontent-%COMP%]{color:#fdb934!important}.active[_ngcontent-%COMP%]{color:#900685!important}.mobile_loginsignup[_ngcontent-%COMP%]{width:100%;height:auto;background-color:#fff;display:flex;align-items:center;justify-content:center;padding:15px 8px;margin-bottom:6px}.mobile_loginsignup[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none;width:100%;text-align:center;border:1px solid #006e85;margin:0 7px;padding:12px;font-size:18px;font-weight:600;color:#006e85;border-radius:10px;cursor:pointer;transition:.3s ease-in-out}.mobile_loginsignup[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child, .mobile_loginsignup[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{background-color:#006e85;color:#fff}.mobile_sub_nav[_ngcontent-%COMP%]{width:100%;height:auto;background-color:#fff;padding:15px 8px;margin-bottom:6px}.mobile_sub_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none;display:inline-block;padding:10px}.mobile_sub_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#797979;font-size:16px;font-weight:500}.mobile_sub_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#900685}.mobile_accountandcart_nav[_ngcontent-%COMP%]{width:100%;height:auto;background-color:#fff;display:flex;align-items:center;justify-content:center;padding:30px 8px 15px;margin-bottom:6px}.mobile_accountandcart_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none;width:100%;text-align:center;margin:0 7px;padding:25px 12px 12px;font-size:18px;font-weight:600;color:#006e85;border-radius:10px;cursor:pointer;background-color:#f1f1f1;box-shadow:0 3px 7.76px .24px rgb(0 0 0/29%)}.mobile_accountandcart_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;margin:-38px auto 8px;width:26px}.mobile_accountandcart_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:13px;font-weight:400;line-height:14px;margin:0}.mobile_info_nav[_ngcontent-%COMP%]{width:100%;height:auto;background-color:#fff;padding:15px;margin-bottom:6px}.mobile_info_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:none;display:inline-block;padding:10px 2px}.mobile_info_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#006e85;font-size:16px;font-weight:500}.mobile_info_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:#006e85}.add_center[_ngcontent-%COMP%]{width:100%;height:auto;background-color:#fff;padding:15px;margin-bottom:6px}@media(min-width:768px){.modal[_ngcontent-%COMP%]   .modal-dialog[_ngcontent-%COMP%]{min-width:720px}}.modal-content[_ngcontent-%COMP%]{background:#f1f1f1;padding:20px}.content-card.user-mart[_ngcontent-%COMP%]{text-align:center}.content-card.user-mart[_ngcontent-%COMP%]   .m-card[_ngcontent-%COMP%]{padding:25px 0 10px;background:#f1f1f1;height:100%;position:relative;display:block;border-radius:15px}.content-card.user-mart[_ngcontent-%COMP%]   .m-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;left:50%;transform:translateX(-50%);top:-22px}.content-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#9c9c9c;font-size:16px;font-weight:500}.content-card[_ngcontent-%COMP%]   .nav-heading[_ngcontent-%COMP%], .content-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;font-family:Poppins,sans-serif}.content-card[_ngcontent-%COMP%]   .nav-heading[_ngcontent-%COMP%]{color:#006e85;font-size:22px;font-weight:700}.content-card[_ngcontent-%COMP%]   .nav-heading.yellow[_ngcontent-%COMP%]{color:#ffb635}.content-card[_ngcontent-%COMP%]   .button-custom[_ngcontent-%COMP%]{width:100%;background:#006e85;color:#fff;padding:10px}.content-card[_ngcontent-%COMP%]   .button-custom.yellow[_ngcontent-%COMP%]{background:#ffb635}.border-left-m[_ngcontent-%COMP%]{border-left:6px solid #006e85}.w-max[_ngcontent-%COMP%]{min-width:40%}@media(max-width:767px){.content-card[_ngcontent-%COMP%], .modal-content[_ngcontent-%COMP%]{padding:0}.content-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:14px}.content-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:32px}.modal-body[_ngcontent-%COMP%]   .button-custom[_ngcontent-%COMP%]{display:grid}.mobile_sub_nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:14px}.content-card[_ngcontent-%COMP%]   .nav-heading[_ngcontent-%COMP%]{font-size:16px}.header[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:36px!important}.header[_ngcontent-%COMP%]   .nav-item[_ngcontent-%COMP%]{padding-right:6px}.navbar-expand[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .ms-3[_ngcontent-%COMP%]{margin-left:0!important}.navbar-expand[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .me-2[_ngcontent-%COMP%]{margin-right:0!important}.header[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100px}.navbar-expand[_ngcontent-%COMP%]   .navbar-collapse[_ngcontent-%COMP%]{max-width:200px}}.inharit_transform[_ngcontent-%COMP%]{transform:inherit!important}"]}),u),v=["formFoodbank"];function _(n,t){1&n&&(r.Qb(0,"a",19),r.Jc(1,"+"),r.Pb())}function h(n,t){if(1&n){var i=r.Rb();r.Qb(0,"a",20),r.Xb("click",(function(){return r.zc(i),r.bc().take_to_post()})),r.Jc(1,"Post an Ad"),r.Pb()}}function Q(n,t){if(1&n){var i=r.Rb();r.Qb(0,"a",21),r.Xb("click",(function(){return r.zc(i),r.bc().take_to_home()})),r.Lb(1,"img",22),r.Jc(2," Ad Center "),r.Pb()}}function y(n,t){1&n&&r.Lb(0,"div",23)}var O,C=function(n){return{"is-sticky":n}},k=((O=function(){function n(t,i,b){o(this,n),this.ss=t,this.router=i,this.ds=b,this.unsub$=new e.a,this.hidden=!1,this.submitting=!1,this.isSticky=!1,this.lastScrollTop=0}return a(n,[{key:"ngOnInit",value:function(){var n=this;this.ss.getUserSessionObservable().pipe(Object(b.a)(this.unsub$)).subscribe((function(t){n.session=t,"doner"==t.type&&(n.hidden=!0)}))}},{key:"take_to_home",value:function(){"agency"==this.session.type?this.router.navigate(["/agency"]):"receiver"==this.session.type?this.router.navigate(["/receiver"]):"doner"==this.session.type?this.router.navigate(["/doner"]):"sponsor"==this.session.type&&this.router.navigate(["/sponsor"])}},{key:"take_to_post",value:function(){this.session._id||this.ss.openModal({signIn:!0,signUp:!1}),"agency"==this.session.type?this.router.navigate(["/agency/post/add"]):"receiver"==this.session.type?this.router.navigate(["/receiver/post/add"]):"sponsor"==this.session.type&&this.router.navigate(["/sponsor/post/add"])}},{key:"ngOnDestroy",value:function(){this.unsub$.unsubscribe()}},{key:"gotoFoodbank",value:function(){var n=this,t={email:this.session.email,firstname:this.session.firstname,lastname:this.session.lastname,type:this.session.type,id:this.session._id};this.progress().show(),this.ds.foodbankLogin(t).subscribe((function(t){console.log(t),t?(n.openToken=t.result.open_token,n.apiUrl="http://3.97.194.144/foodbank/user/signin",setTimeout((function(){n.formFoodbank.nativeElement.submit(),n.progress().hide()}),3e3)):(window.alert("Login failed! Please try again."),n.progress().hide())}),(function(t){alert(t),n.progress().hide()}))}},{key:"progress",value:function(){var n=this;return{show:function(){n.submitting=!0},hide:function(){n.submitting=!1}}}},{key:"onWindowScroll",value:function(){var n=window.pageYOffset||document.documentElement.scrollTop;n>this.lastScrollTop?this.isSticky=!1:(this.isSticky=!0,0===window.scrollY&&(this.isSticky=!1)),this.lastScrollTop=n<=0?0:n}}]),n}()).\u0275fac=function(n){return new(n||O)(r.Kb(c.a),r.Kb(s.f),r.Kb(l.a))},O.\u0275cmp=r.Eb({type:O,selectors:[["app-userheader"]],viewQuery:function(n,t){var i;1&n&&r.Qc(v,!0),2&n&&r.vc(i=r.Yb())&&(t.formFoodbank=i.first)},hostBindings:function(n,t){1&n&&r.Xb("scroll",(function(){return t.onWindowScroll()}),!1,r.yc)},decls:27,vars:9,consts:[[1,"desktop_view"],[1,"header-bottom","result-bottom-header"],[1,"active"],["routerLink","/ads/view"],["href","javascript:void(0);",3,"click"],["src","assets/images/myissue-header.png","alt","Images"],[1,"blog-link",2,"display","inline-flex"],["routerLink","/blog","title","View Blogs"],["routerLink","/blog/add","title","Add a new blog",4,"ngIf"],["class","btn-post",3,"click",4,"ngIf"],[1,"blog-img-link"],["href","javascript:void(0);"],["src","assets/images/new-blog-img.png","alt","Images"],["class","btn-post btn-add",3,"click",4,"ngIf"],["id","formFoodbank","method","POST","target","_blank",2,"display","none",3,"action"],["formFoodbank",""],["id","op","name","op","type","hidden",3,"value"],["class","loader-spinner",4,"ngIf"],[1,"mobile_view",3,"ngClass"],["routerLink","/blog/add","title","Add a new blog"],[1,"btn-post",3,"click"],[1,"btn-post","btn-add",3,"click"],["src","assets/images/graph-icon.png","alt","graph-icon"],[1,"loader-spinner"]],template:function(n,t){1&n&&(r.Qb(0,"div",0),r.Qb(1,"div",1),r.Qb(2,"ul"),r.Qb(3,"li",2),r.Qb(4,"a",3),r.Jc(5,"Ads"),r.Pb(),r.Pb(),r.Qb(6,"li"),r.Qb(7,"a",4),r.Xb("click",(function(){return t.gotoFoodbank()})),r.Lb(8,"img",5),r.Pb(),r.Pb(),r.Qb(9,"li",6),r.Qb(10,"a",7),r.Jc(11,"Blog"),r.Pb(),r.Hc(12,_,2,0,"a",8),r.Pb(),r.Qb(13,"li"),r.Hc(14,h,2,0,"a",9),r.Pb(),r.Qb(15,"li",10),r.Qb(16,"a",11),r.Lb(17,"img",12),r.Pb(),r.Pb(),r.Qb(18,"li"),r.Hc(19,Q,3,0,"a",13),r.Pb(),r.Pb(),r.Pb(),r.Ob(20),r.Qb(21,"form",14,15),r.Lb(23,"input",16),r.Pb(),r.Nb(),r.Hc(24,y,1,0,"div",17),r.Pb(),r.Qb(25,"div",18),r.Lb(26,"app-userheader-mobile"),r.Pb()),2&n&&(r.yb(12),r.ic("ngIf",!t.hidden&&t.session._id),r.yb(2),r.ic("ngIf",!t.hidden),r.yb(5),r.ic("ngIf",!t.hidden&&t.session._id),r.yb(2),r.jc("action",t.apiUrl,r.Cc),r.yb(2),r.jc("value",t.openToken),r.yb(1),r.ic("ngIf",t.submitting),r.yb(1),r.ic("ngClass",r.nc(7,C,1==t.isSticky)))},directives:[s.i,p.n,p.l,m],styles:[".p-2[_ngcontent-%COMP%]{cursor:pointer}.p-2[_ngcontent-%COMP%]:hover{background-color:#036068}.btn.btn-outline-primary.active[_ngcontent-%COMP%], .btn.btn-outline-primary[_ngcontent-%COMP%]:active, .btn.btn-outline-primary[_ngcontent-%COMP%]:focus, .btn.btn-outline-primary[_ngcontent-%COMP%]:hover{color:#fff;background-color:transparent;border-color:#fdb934}.btn.btn-outline-primary[_ngcontent-%COMP%]{font-size:x-large;border-radius:7px;color:#fff;background-color:#fdb934}.btn.btn-outline-success.active[_ngcontent-%COMP%], .btn.btn-outline-success[_ngcontent-%COMP%]:active, .btn.btn-outline-success[_ngcontent-%COMP%]:focus, .btn.btn-outline-success[_ngcontent-%COMP%]:hover{color:#fff;border:2px solid #fdb934;background-color:transparent}.btn.btn-outline-success[_ngcontent-%COMP%]{font-size:x-large;border-radius:7px;color:#fff;background-color:transparent;border:thin}.is-sticky[_ngcontent-%COMP%]{box-shadow:0 0 10px rgb(0 0 0/20%);position:-webkit-sticky;position:sticky;top:0;z-index:999999}"]}),O)}}])}();