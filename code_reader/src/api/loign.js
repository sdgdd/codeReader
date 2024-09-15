import {request} from "../untils/request"

export function longin(data){
    return request('get',`/api/login?userName=${data.userName}&password=${data.password}&captcha=${data.captcha}`,data)
}

export function whoAmI(){
    return request('get',`/api/whoAmi`) 
}

export function regist(data){
    return request('post',`/api/login`,data)
}


export function getcaptcha(){
    return request('get',`/api/captcha`)
}

export function userIsExist(userName){
    return request('get',`/api/login/userIsExist?userName=${userName}`)
}