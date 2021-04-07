let router= new Navigo(null,true);
let $app=document.getElementById("app");
let $body=document.getElementById("body");

router.on('/login',function(){
    $body.innerHTML='<div id="app" class="container mt-3"></div>';
    let $app=document.getElementById("app");
    $app.innerHTML='<login-form></login-form>';
}).resolve();
router.on('/register',function(){
    $body.innerHTML='<div id="app" class="container mt-3"></div>';
    let $app=document.getElementById("app");
    $app.innerHTML='<register-form></register-form>';
}).resolve();
router.on('/home',function(){
    $body.innerHTML='<div id="app"></div>';
    let $app=document.getElementById("app");
    $app.innerHTML='<all-video></all-video>';
}).resolve();

window.router = router;