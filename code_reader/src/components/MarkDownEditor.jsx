import React from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import {uploadImg} from "../api/questionAnswer";
import {message} from "antd";
import {useRef} from "react";


export default function MarkDownEditor({setEditorValue}) {
    let editorRef = useRef();
    return (
        <Editor
            ref={editorRef}
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            language="zh-CN"
            useCommandShortcut={true}
            onBlur={()=>{
                setEditorValue( editorRef.current.getInstance().getHTML())
            }}
            hooks={{
                addImageBlobHook: (blob, callback) =>{
                    uploadImg(blob).then(res => {
                        if(!res.path){
                            message.error(res.message);
                            callback(null, "image");
                            return;
                        }
                        callback(window.location.origin+ res.path, "image");
                    })

                   
                }
            }}
        />
    )
}




