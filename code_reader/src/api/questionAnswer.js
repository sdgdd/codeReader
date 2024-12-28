import {request} from "../untils/request"


export function addQuestion(data){
    return request('post',`/api/questions`,data)
}

export function getQuestion(pagesize=50, pagenum=1,tagId){
    return request('get',`/api/questions?pageSize=${pagesize}&pageNumber=${pagenum}&tagId=${tagId || ''}`)
}


export function getTags(){
    return request('get',`/api/tags`)
}

export function uploadImg(data){
    return request('post',`/img`,{image:data},{headers: {
        'Content-Type': 'multipart/form-data', 
        'Content-Disposition': `attachment; filename=${data.name}`}
    })
}

export function getQuestionDetail(id){ 
    return request('get',`/api/questionsDetail/${id}`)
}

export function addCommen(data){ 
    return request('post',`/api/comment`,data)
}

export function getComment(id){ 
    return request('get',`/api/comment?questionId=${id}`)
}

export function questionGiveLike(data){
    return request('post',`/api/questionGiveLike`,data)
}
export function questionGiveDislike(data){
    return request('post',`/api/questionGiveDislike`,data)
}
