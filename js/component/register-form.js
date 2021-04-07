import {register} from "../user.js";
import {checkNull,validateEmail, validatePassword} from "../checking.js"
let $template = document.createElement("template");
$template.innerHTML=/*html*/`
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="./css/style.css">    
<div class="container ftco-section">
        <div class="row justify-content-center">
            <div class="col-10">
                <div class="shadow wrap d-md-flex">
                    <div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                        <div class="text w-100">
                        <form id="login-form">
                            <h2>Welcome to Register</h2>
                            <p>Want to login?</p>
                            <input class="btn btn-light" type="submit" value="Login">
                        </form>
                        </div>
                    </div>
                    <div class="login-wrap p-4 p-lg-5">
                        <div class="d-flex">
                            <div class="w-100">
                                <h3 class="mb-4">Register</h3>
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
                        <form action="" id="register-form">
                            <div class="form-group mb-3">
                                <label class="label" for="name">Your Name</label>
                                <input-wrapper id="name" type="text" placeholder="Your name..."></input-wrapper>
                            </div>
                            <div class="form-group mb-3">
                                <label class="label" for="name">Username</label>
                                <input-wrapper id="username" type="email" placeholder="User name..."></input-wrapper>
                            </div>
                            <div class="form-group mb-3">
                                <label class="label" for="password">Password</label>
                                <input-wrapper id="password" type="password" placeholder="Password..."></input-wrapper>
                            </div>
                            <div class="form-group mb-3">
                                <label class="label" for="password">Confirm Password</label>
                                <input-wrapper id="confirm-password" type="password" placeholder="Confirm your password..."></input-wrapper>
                            </div>
                            <div class="form-group">
                                <div style="display:flex;justify-content: center;">
                                    <input class="btn btn-primary fix form-control" type="submit" value="Register">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

export default class Register extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        
        this.$form =this.shadowRoot.getElementById('register-form');
        this.$username =this.shadowRoot.getElementById('username');
        this.$password =this.shadowRoot.getElementById('password');
        this.$confirm =this.shadowRoot.getElementById('confirm-password');
        this.$login =this.shadowRoot.getElementById('login-form');
        this.$name=this.shadowRoot.getElementById('name');
    }

    connectedCallback(){
        
        this.$form.onsubmit=(event)=>{
            event.preventDefault();
            let username=this.$username.value;
            let password=this.$password.value;

            let usernameErr=this.$username;

            function confirm(value){
                return value==password;
            }
            function errorFuction(){
                usernameErr.error="User name already exist";
            }

            let isPassed=
            (this.$name.validate(checkNull,"Your name null"))
            (this.$username.validate(validateEmail,"Please input an email")&&
            this.$username.validate(checkNull,"Email null"))
            &(this.$password.validate(checkNull,"Password null")&&
            this.$password.validate(validatePassword,"Not enough length of password"))
            &(this.$confirm.validate(confirm,"Wrong confirm password")&&
            this.$confirm.validate(checkNull,"Confirm password null"))
            if (isPassed) {
                register(username,password,errorFuction);  
            } 
        }
        this.$login.onsubmit=(event)=>{
            event.preventDefault();
            router.navigate("/login");
        }
    }
}
window.customElements.define('register-form',Register)