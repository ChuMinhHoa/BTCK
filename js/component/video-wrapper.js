let $template=document.createElement("template");
$template.innerHTML=/*html */`
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="./css/style.css">  
<div class="w-100" style="cursor:pointer;" id="changeform"> 
    <div class="video-wrapper d-flex justify-content-center">
        <iframe class="d-none" id="videosrc" autoplay=0 width="560" height="315" src="https://www.youtube.com/embed/GmrN4_Ealjk" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <img class="w-100" style="max-height: 198px;" src="" alt="" id="imgsrc">
    </div>
    <div class="mt-3">
        <h6 id="videoname" style="font-weight: bold;">hehe</h6> 
    </div>
</div>
`;

export default class VideoWrapper extends HTMLElement {
    
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$content=this.shadowRoot.getElementById('videoname');
        this.$videoSrc=this.shadowRoot.getElementById('videosrc');

        this.$imgSrc=this.shadowRoot.getElementById('imgsrc');
        this.$changeform=this.shadowRoot.getElementById('changeform');

    }

    static get observedAttributes() {
        return ['videoname','videosrc','imgsrc'];
    }
    attributeChangedCallback(attrName,oldValue,newValue) {
        switch (attrName) {
            case 'videoname':
                this.$content.innerHTML = newValue;
                break;
            case 'videosrc':
                this.$videoSrc.src = newValue;
                break;
            case 'imgsrc':
                this.$imgSrc.src = newValue;
                break;
            default:
                break;
        }
    }
    connectedCallback(){
        this.$changeform.onclick=()=>{
            let $app=document.getElementById("app");
            let _name=this.$content.innerHTML;
            let _link = this.$videoSrc.src;

            let $video_wrapper = document.createElement('view-video-form')
            $video_wrapper.setAttribute('videoname',_name)
            $video_wrapper.setAttribute('videosrc',_link) 

            $app.innerHTML="";
            $app.appendChild($video_wrapper);
        }
    }

    

    
}
window.customElements.define("video-wrappers",VideoWrapper);