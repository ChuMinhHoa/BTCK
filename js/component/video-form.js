let $template = document.createElement("template");
$template.innerHTML=/*html*/`
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="./css/style.css">   
<div class="container video-div">
    <video-wrappers videoname='hoa' id="video1" videosrc="https://firebasestorage.googleapis.com/v0/b/btck-564c6.appspot.com/o/1617629302283_NH%E1%BA%A0C%20TR%E1%BA%BA%20REMIX%202021%20HAY%20NH%E1%BA%A4T%20HI%E1%BB%86N%20NAY%20-%20EDM%20Tik%20Tok%20ORINN%20REMIX%20-%20Lk%20Nh%E1%BA%A1c%20Tr%E1%BA%BB%20Remix%20G%C3%A2y%20Nghi%E1%BB%87n%20Nh%E1%BA%A5t.mp4?alt=media&token=3dc9c4a1-0742-410c-8b42-a2128275ef3e"></video-wrappers>
</div>`;
export default class VideoForm extends HTMLElement {
    
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
   
    }

}
window.customElements.define("video-form",VideoForm);