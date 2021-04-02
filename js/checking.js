export function md5_password(_value) {
    return CryptoJS.MD5(_value).toString();
}
export function checkNull(_value) {
    return _value!='';
}
export function validateEmail(_value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(_value).toLowerCase());
}
export function validatePassword(_value) {
    return _value.length>3;
}
export function changeLink(_value) {
    let position = _value.indexOf('&')
    if (position > 0) _value = _value.substr(0, position)
    return _value.replace("watch?v=", "embed/");
}