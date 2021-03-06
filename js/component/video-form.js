let $template = document.createElement("template");
$template.innerHTML=/*html*/`
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="./css/style.css">   
<div class="row" id="div-video-wrapper">
    
</div>`;
export default class VideoForm extends HTMLElement {
    
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        
        this.$wrapper =this.shadowRoot.getElementById('div-video-wrapper')
    }
    async loadVideoFromFireBase(){
        let datas=await firebase.firestore().collection('Video').get();
        for (let video of datas.docs) {
            
            let _name = video.data().videoName
            let _link = video.data().linkVideo 
            let _linkImg = video.data().linkImage 
            let $video_wrapper = document.createElement('video-wrappers')
            $video_wrapper.setAttribute('videoname',_name)
            $video_wrapper.setAttribute('videosrc',_link) 
            $video_wrapper.setAttribute('imgsrc',_linkImg) 
            $video_wrapper.classList+="col-4";     
            this.$wrapper.appendChild($video_wrapper);   
        }
    }
    connectedCallback(){
        this.loadVideoFromFireBase();
    }
}
window.customElements.define("video-form",VideoForm);