let $template=document.createElement("template");
$template.innerHTML=/*html */`
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="./css/style.css">   
<div>
    <h2 id="videoname">hehe</h2> 
</div>
<div class="video-wrapper d-flex justify-content-center">
    <iframe id="videosrc" width="560" height="315" src="https://www.youtube.com/embed/GmrN4_Ealjk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
`;

export default class VideoWrapper extends HTMLElement {
    
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$content=this.shadowRoot.getElementById('videoname');
        this.$src=this.shadowRoot.getElementById('videosrc');

        
    }

    static get observedAttributes() {
        return ['videoname','videosrc'];
    }
    attributeChangedCallback(attrName,oldValue,newValue) {
        switch (attrName) {
            case 'videoname':
                this.$content.innerHTML = newValue;
                break;
            case 'videosrc':
                this.$src.src = newValue;
                break;
            default:
                break;
        }
    }

    

    
}
window.customElements.define("video-wrappers",VideoWrapper);