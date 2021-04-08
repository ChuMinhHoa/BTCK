let $template = document.createElement("template");
$template.innerHTML=/*html*/`
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="./css/style.css">   
<div class="row" id="div-video-wrapper" where="">
    
</div>`;
export default class VidepType extends HTMLElement {
    
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        
        this.$wrapper =this.shadowRoot.getElementById('div-video-wrapper')
    }
    static get observedAttributes() {
        return ['where']
    }
    attributeChangedCallback(attrName,oldValue,newValue) {
        if(attrName=="where"){
            this.$wrapper.where=newValue;
            this.loadVideoFromFireBase();
        }
    }
    async loadVideoFromFireBase(){
        this.$wrapper.innerHTML="";
        
        let typeName = await firebase.firestore().collection('Type').where("name","==",this.$wrapper.where).get();
        let typeID=typeName.docs[0].id;
        let datas=await firebase.firestore().collection('Video').where("typeID","==",typeID).get();
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
}
window.customElements.define("video-type",VidepType);