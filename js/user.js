import {md5_password} from './checking.js'
export async function login(_username,_password){
    let datas=await firebase.firestore().collection('User').where("userName","==",_username).get();
    
    if (datas.empty==false) {
        let isPassword= await firebase.firestore().collection('User').where("userName","==",_username).where("passWords","==",md5_password(_password)).get();
       
        if (isPassword.empty==false) {
            console.log("login ok");
        }else{
            alert("Wrong password.");
        }
    }else{
        alert("Wrong username.");
    }
}
export async function register(_username,_password,errorFuction){
    let datas=await firebase.firestore().collection('User').where("userName","==",_username).get();
    if (datas.empty) {
        await firebase.firestore().collection('User').add({
            userName:_username,
            passWords:md5_password(_password)
        })
        router.navigate("/login");
        alert("Register successfully!")
    }else{
        errorFuction();
    }
}