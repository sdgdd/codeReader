import {request} from "../untils/request"


export function addQuestion(data){
    return request('post',`/api/questions`,data)
}

export function getQuestion(pagesize=50, pagenum=1,tagId){
    return request('get',`/api/questions?pageSize=${pagesize}&pageNumber=${pagenum}&tagId=${tagId}`)
}


export function getTags(){
    return request('get',`/api/tags`)
}

export function uploadImg(data){
    return request('post',`/api/img`,{image:data},{headers: {
        'Content-Type': 'multipart/form-data', 
        'Content-Disposition': `attachment; filename=${data.name}`}
    })
}