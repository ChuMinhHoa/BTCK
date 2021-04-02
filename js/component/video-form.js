let $template = document.createElement("template");
$template.innerHTML=/*html*/`
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="./css/style.css">   
<div class="container video-div">
    <video-wrappers videoname='hoa' id="video1" videosrc="https://www.youtube.com/embed/NPVvIE5ethU"></video-wrappers>
</div>`;
export default class VideoForm extends HTMLElement {
    
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
   
    }

}
window.customElements.define("video-form",VideoForm);