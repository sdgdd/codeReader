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

export function addQuestion(data){
    return request('post',`/api/questions`,data)
}

export function getQuestion(pagesize=50, pagenum=0){
    return request('get',`/api/questions?pageSize=${pagesize}&pageNumber=${pagenum}`)
}

export function getcaptcha(){
    return request('get',`/api/captcha`)
}