(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{AhXN:function(t,e,o){"use strict";o.r(e),o.d(e,"ResetPasswordModule",(function(){return f}));var n=o("ofXK"),r=o("tyNb"),s=o("mrSG"),i=o("fXoL"),a=o("DPk/");const c=[{path:"",component:(()=>{class t{constructor(t,e,o){this.route=t,this.ds=e,this.router=o}ngOnInit(){return Object(s.a)(this,void 0,void 0,(function*(){yield this.route.queryParamMap.subscribe(t=>Object(s.a)(this,void 0,void 0,(function*(){this.token=yield t.get("token"),this.type=yield t.get("type")})))}))}resetPassword(){return 0==Boolean(this.newPassword)?this.error="Please Enter New Password":this.newPassword.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")?0==Boolean(this.confirmPassword)?this.error="Please Enter Confirm Password":this.newPassword!=this.confirmPassword?this.error="Both Password Are Not Matched":(this.error="",void setTimeout(()=>{this.loading=!0,this.ds.resetPasswordLink({token:this.token,newPassword:this.newPassword,type:this.type}).subscribe(t=>Object(s.a)(this,void 0,void 0,(function*(){t.status?(this.loading=!1,this.success=t.message,setTimeout(()=>{this.router.navigate(["/"])},3e3)):(this.loading=!1,document.getElementById("err").textContent=t.message)})),t=>{t instanceof ErrorEvent?document.getElementById("err").textContent="Sorry some unknown error occured on the browser":document.getElementById("err").textContent=t.error.message})},100)):this.error="Please select a strong password"}}return t.\u0275fac=function(e){return new(e||t)(i.Kb(r.a),i.Kb(a.a),i.Kb(r.f))},t.\u0275cmp=i.Eb({type:t,selectors:[["app-reset-password"]],decls:9,vars:0,consts:[[1,"container_reset"],["for",""],["type","text","placeholder","Type in your email address "]],template:function(t,e){1&t&&(i.Qb(0,"section"),i.Qb(1,"div",0),i.Qb(2,"p"),i.Jc(3,"Type in your email in box below and hit Request New Password. You'll be sent a link that you will have to click to verify to us that it's your email. Shortly after that we'll email you a new password. "),i.Pb(),i.Qb(4,"label",1),i.Jc(5,"Email"),i.Pb(),i.Lb(6,"input",2),i.Qb(7,"button"),i.Jc(8,"Request New Password"),i.Pb(),i.Pb(),i.Pb())},styles:["[_nghost-%COMP%]     .p-password, [_nghost-%COMP%]     p-password, section[_ngcontent-%COMP%]{width:100%}section[_ngcontent-%COMP%]{background-color:#fafaf7;padding:50px 15px}.container_reset[_ngcontent-%COMP%]{width:100%;max-width:500px;display:flex;margin:auto;flex-direction:column;align-items:flex-start}.container_reset[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;font-weight:300;color:#000;margin-bottom:30px}.container_reset[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:18px;font-weight:500;color:#006f85}.container_reset[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;max-width:350px;padding:10px;font-size:16px;border:1px solid #000;background-color:transparent;border-radius:6px;margin-bottom:15px;outline:none}.container_reset[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:0;background-color:#006f85;color:#fff;font-size:16px;padding:10px 20px;border-radius:6px;cursor:pointer}"]}),t})()}];let d=(()=>{class t{}return t.\u0275mod=i.Ib({type:t}),t.\u0275inj=i.Hb({factory:function(e){return new(e||t)},imports:[[r.j.forChild(c)],r.j]}),t})();var l=o("3Pt+"),u=o("7kUa"),p=o("jIHw"),h=o("+YxP"),b=o("arFO"),w=o("zFJ7");let f=(()=>{class t{}return t.\u0275mod=i.Ib({type:t}),t.\u0275inj=i.Hb({factory:function(e){return new(e||t)},imports:[[n.b,d,l.j,u.b,p.c,h.b,w.b,b.b]]}),t})()}}]);