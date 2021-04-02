let router= new Navigo(null,true);
let $app=document.getElementById("app");

router.on('/login',function(){
    $app.innerHTML='<login-form></login-form>';
}).resolve();
router.on('/register',function(){
    $app.innerHTML='<register-form></register-form>';
}).resolve();
router.on('/home',function(){
    $app.innerHTML='<video-form></video-form>';
}).resolve();
router.on('/upload',function(){
    $app.innerHTML='<upload-form></upload-form>';
}).resolve();

window.router = router;