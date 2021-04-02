import { changeLink, checkNull } from '../checking.js'
let $template = document.createElement("template");
$template.innerHTML =/*html */`

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
<link rel="stylesheet" href="./css/style.css"> 
<div class="p-3">
<div class="container">
    <div class="up-load-wrap">
        <div class="shadow w-50">
            <form action="" class="up-load-form" id="form-upload">
                <div class="form-group">
                    <label class="label">Input video name</label>
                    <input-wrapper id="video-name" type="text" placeholder="Video name..."></input-wrapper>
                </div>
                <div class="form-group">
                    <label class="label">Input video link</label>
                    <input-wrapper id="video-link" type="text" placeholder="Video link..."></input-wrapper>
                </div>
                <div class="form-group">
                    <label class="label">Choose type of video</label>
                    <select class="form-select form-select-lg mb-3" id="select-id">
                        <option value="">---Select type of your video---</option>
                    </select>
                </div>
                <div class="form-group">
                    <div class="d-flex align-items-center">
                        <label class="label w-50">Choose video image</label>
                        <div class="d-flex justify-content-end w-50">
                            <input type="file" id="up-load-img" accept="image/*">
                            <label for="up-load-img" class="label-for-img btn btn-primary fix form-control d-flex justify-content-center align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
                                    <path d="M.5 3l.04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
                                    <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                                Choose Image
                            </label>
                        </div>
                    </div>
                    <br>
                    <div class="w-100 d-flex justify-content-center border border-dark rounded" style="max-height: 300px;height: 300px;">
                        <img class="w-100 rounded" src="" alt="" id="image">
                    </div>
                </div>
                <div class="form-group">
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary fix form-control w-50 label">Upload video</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</div>
`

export default class UploadForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$videoName = this.shadowRoot.getElementById('video-name');
        this.$videoLink = this.shadowRoot.getElementById('video-link');

        this.$form = this.shadowRoot.getElementById('form-upload')
        this.$imgUpload = this.shadowRoot.getElementById('up-load-img')
        this.$img = this.shadowRoot.getElementById('image')

        this.$select=this.shadowRoot.getElementById('select-id')

    }
    uploadImg() {
        let reader = new FileReader();
        let file = this.$imgUpload.files[0];
        reader.addEventListener('load', (e) => {
            this.$img.src = e.target.result
        })
        reader.readAsDataURL(file);
    }
    async uploadVideo() {
        let ref = firebase.storage().ref();

        let file = this.$imgUpload.files[0];

        let name = file.name;

        let metaData = {
            contentType: file.type
        }

        const task = ref.child(name).put(file, metaData)

        let _linkImage;

        await task.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
            _linkImage = url
        })

        let _videoLink = changeLink(this.$videoLink.value);

        let _videoName = this.$videoName.value;

        //thieu idAccount
        let _idTypeVideo =this.$select.value;
        
        let isPssed=(this.$videoName.validate(checkNull,"Please input video name"))
        if (isPssed) {
            await firebase.firestore().collection('Video').add({
                videoName: _videoName,
                linkVideo: _videoLink,
                linkImage: _linkImage,
                typeID: _idTypeVideo,
                userID: ''
            })
            alert("Upload video successfully!");
            router.navigate('/home');
        }
    }
    async loadTypeVideo(){
        let datas = await firebase.firestore().collection('Type').get();
        for (let data of datas.docs) {
            let $option = document.createElement('option');
            $option.setAttribute('value',data.id);
            $option.innerHTML=data.data().name

            this.$select.appendChild($option);
            
        }

    }
    connectedCallback() {
        this.loadTypeVideo();
        this.$form.onsubmit = (event) => {
            event.preventDefault();
            this.uploadVideo();
        }

        this.$imgUpload.onchange = () => {
            this.uploadImg();
        }

    }
}
window.customElements.define('upload-form', UploadForm);