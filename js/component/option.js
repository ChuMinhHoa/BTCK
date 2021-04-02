let $template = document.createElement("template");
$template.innerHTML =/*html */`
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="./css/style.css">    
    <option value="1" idtype="2" id="option"></option>
`;

export default class Options extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));

        this.$option = this.shadowRoot.getElementById('option');
    }
    static get observedAttributes() {
        return ['value', 'idtype']
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
        switch (attrName) {
            case 'value':
                this.$option.value = newValue
                this.$option.innerHTML = newValue
                break;
            case 'idtype':
                this.$option.setAttribute('idtype',newValue);
                break;
            default:
                break;
        }
    }

    get value() {
        return this.$option.value
    }

    get id() {
        return this.$option.idtype
    }
}
window.customElements.define('option-custom', Options);