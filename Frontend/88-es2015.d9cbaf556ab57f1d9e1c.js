(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{YhFJ:function(e,n,t){"use strict";t.r(n),t.d(n,"SponsorsModule",(function(){return f}));var a=t("ofXK"),o=t("tyNb"),l=t("VhOV"),i=t("fXoL"),s=t("ndxW"),d=t("0QPo"),r=t("vUKi"),h=t("awcC");const u=[{path:"",component:(()=>{class e{constructor(e,n){this.ss=e,this.router=n}ngOnInit(){this.unsub=this.ss.getUserSessionObservable().subscribe(e=>{this.session=e,this.session._id||this.router.navigate(["/"])})}ngOnDestroy(){this.unsub.unsubscribe()}}return e.\u0275fac=function(n){return new(n||e)(i.Kb(s.a),i.Kb(o.f))},e.\u0275cmp=i.Eb({type:e,selectors:[["app-sponsors"]],decls:4,vars:0,template:function(e,n){1&e&&(i.Lb(0,"app-usernavbar"),i.Lb(1,"app-userheader"),i.Lb(2,"router-outlet"),i.Lb(3,"app-userfooter"))},directives:[d.a,r.a,o.k,h.a],styles:[""]}),e})(),children:[{path:"",loadChildren:()=>t.e(15).then(t.bind(null,"H116")).then(e=>e.AdlistRoutingModule)},{path:"verification",loadChildren:()=>Promise.all([t.e(1),t.e(4),t.e(5),t.e(38)]).then(t.bind(null,"jXHF")).then(e=>e.VerificationModule)},{path:"withdraw",loadChildren:()=>t.e(11).then(t.bind(null,"sknq")).then(e=>e.WithdrawMethodsModule)},{path:"post",canActivate:[l.a],loadChildren:()=>Promise.all([t.e(1),t.e(4),t.e(2),t.e(7),t.e(21),t.e(86)]).then(t.bind(null,"ktWd")).then(e=>e.ReceiverPostModule)},{path:"post-edit",canActivate:[l.a],loadChildren:()=>Promise.all([t.e(1),t.e(4),t.e(5),t.e(2),t.e(7),t.e(21),t.e(53)]).then(t.bind(null,"4+Pg")).then(e=>e.ReceiverPostEditModule)},{path:"bumps",canActivate:[l.a],loadChildren:()=>Promise.all([t.e(2),t.e(10),t.e(13),t.e(0)]).then(t.bind(null,"DxLS")).then(e=>e.BumpsModule)},{path:"stats",canActivate:[l.a],loadChildren:()=>t.e(19).then(t.bind(null,"wvrH")).then(e=>e.StatsModule)},{path:"payment-status",loadChildren:()=>t.e(8).then(t.bind(null,"WaJL")).then(e=>e.PaymentStatusModule)},{path:"settings",loadChildren:()=>t.e(9).then(t.bind(null,"7wo0")).then(e=>e.SettingsModule)},{path:"payment-status",loadChildren:()=>t.e(8).then(t.bind(null,"WaJL")).then(e=>e.PaymentStatusModule)},{path:"foodbank",canActivate:[l.a],loadChildren:()=>Promise.all([t.e(0),t.e(14)]).then(t.bind(null,"Spoo")).then(e=>e.FoodbankModule)},{path:"foodbank-signup",loadChildren:()=>t.e(17).then(t.bind(null,"DnET")).then(e=>e.FoodbankSignUpModule)},{path:"manage-groceries/:adId",loadChildren:()=>Promise.all([t.e(0),t.e(16)]).then(t.bind(null,"CV9K")).then(e=>e.ManageGroceriesModule)}]}];let p=(()=>{class e{}return e.\u0275mod=i.Ib({type:e}),e.\u0275inj=i.Hb({factory:function(n){return new(n||e)},imports:[[o.j.forChild(u)],o.j]}),e})();var c=t("xcRY"),b=t("eWLc"),m=t("ggyj");let f=(()=>{class e{}return e.\u0275mod=i.Ib({type:e}),e.\u0275inj=i.Hb({factory:function(n){return new(n||e)},imports:[[a.b,p,c.a,b.a,m.a]]}),e})()}}]);