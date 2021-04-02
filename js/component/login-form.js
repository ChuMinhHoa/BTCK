import {login} from "../user.js";
import {checkNull,validateEmail, validatePassword} from "../checking.js"
let $template = document.createElement("template");
$template.innerHTML=/*html*/`
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="./css/style.css"> 
<div class="ftco-section"> 
<div class="container ">
        <div class="row justify-content-center">
            <div class="col-md-12 col-lg-10">
                <div class="shadow wrap d-md-flex">
                    <div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                        <div class="text w-100">
                        <form id="register-form">
                            <h2>Welcome to login</h2>
                            <p>Don't have an acount?</p>
                            <input class="btn btn-light" type="submit" value="Register">
                        </form>
                        </div>
                    </div>
                    <div class="login-wrap p-4 p-lg-5">
                        <div class="d-flex">
                            <div class="w-100">
                                <h3 class="mb-4">Login</h3>
                            </div>
                            <div class="w-100">
                                <p class="social-media d-flex justify-content-end">
                                    <a href="" class="social-icon d-flex align-item-center justify-content-center">
                                        <span class="fa fa-facebook"></span>
                                    </a>
                                    <a href="" class="social-icon d-flex align-item-center justify-content-center">
                                        <span class="fa fa-twitter"></span>
                                    </a>
                                </p>
                            </div>
                        </div>
                        <form action="" id="login-form">
                            <div class="form-group mb-3">
                                <label class="label" for="name">Username</label>
                                <input-wrapper id="username" type="email" placeholder="User name..."></input-wrapper>
                            </div>
                            <div class="form-group mb-3">
                                <label class="label" for="password">Password</label>
                                <input-wrapper id="password" type="password" placeholder="Password..."></input-wrapper>
                            </div>
                            <div class="form-group">
                                <div style="display:flex;justify-content: center;">
                                    <input class="btn btn-primary fix form-control" type="submit" value="Login">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>  
`;

export default class LoginForm extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        
        this.$form =this.shadowRoot.getElementById('login-form');
        this.$register = this.shadowRoot.getElementById('register-form')
        this.$username =this.shadowRoot.getElementById('username');
        this.$password =this.shadowRoot.getElementById('password');
        
    }
    
    connectedCallback(){

        
        this.$form.onsubmit=(event)=>{
            event.preventDefault();
            let username=this.$username.value;
            let password=this.$password.value;
            let isPassed=
            (this.$username.validate(validateEmail,"Please input an email")&&
            this.$username.validate(checkNull,"Email null"))
            &(this.$password.validate(checkNull,"Password null")&&
            this.$password.validate(validatePassword,"Not enough length of password"))
            if (isPassed) {
                login(username,password);                  
            } 
        }
        this.$register.onsubmit=(event)=>{
            event.preventDefault();
            router.navigate("/register");
        }
    }
}
window.customElements.define('login-form',LoginForm)