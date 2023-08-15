<template>
    <div v-if="editor" class="buttonHolder">
        <div class="editorButton" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            <i class="fi fi-rr-bold centerIcon"></i>
        </div>
        <div class="editorButton" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
            <i class="fi fi-rr-italic centerIcon"></i>
        </div>
        <div class="editorButton" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            <i class="fi fi-rr-h1 centerIcon"></i>
        </div>
        <div class="editorButton" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            <i class="fi fi-rr-h2 centerIcon"></i>
        </div>
        <div class="editorButton" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
            <i class="fi fi-rr-list centerIcon"></i>
        </div>
        <div class="editorButton" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
            <i class="fi fi-rr-quote-right centerIcon"></i>
        </div>
        <label class="editorButton" for="imgUploadInput">
            <i class="fi fi-rr-picture centerIcon"></i>
        </label>
    </div>
    <editor-content :editor="editor" class="writableEditor" />
    <input style="display: none" type="file" ref="fileInput" id="imgUploadInput" @change="uploadImage" accept="image/png, image/gif, image/jpeg">
</template>

<script>
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image'
import { Editor, EditorContent } from '@tiptap/vue-3'
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
    components: {
        EditorContent,
    },

    data() {
        return {
            editor: null,
        }
    },
    expose:['editor'],
    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit,
                Image,
            ],
            content: ``,
        })
    },
    methods: {
        uploadImage() {
            const formData = new FormData();
            if (this.$refs.fileInput.files.length === 0) return;

            formData.append('image', this.$refs.fileInput.files[0]);

            axios.post('/api/Forum/ImgUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                this.editor.chain().focus().setImage({src: response.json.url}).run()
                this.$refs.fileInput.value = '';
                ElMessage.success("图片上传成功，请等待图片加载。")
            }).catch((error)=>{
                if(error.network) return;
                switch (error.errorCode) {
                    case 115:
                        ElMessage.error("图片上传失败，请联系管理员！")
                        this.$refs.fileInput.value = '';
                        break;
                    default:
                        error.defaultHandler();
                }
                this.$refs.fileInput.value = '';
            })
        }
    },

    beforeUnmount() {
        this.editor.destroy()
    }
}
</script>

<style scoped>
.editorButton{
    margin: 5px;
    border-radius: 5px;
    display: flex;
    height: 30px;
    width: 30px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s ease;
}

.editorButton:not(.is-active):hover{
    background-color: #ddd;
}


.editorButton .centerIcon{
    margin-right: 0 !important;
}

.editorButton.is-active{
    background-color: #ccc;
}

.buttonHolder{
    display: flex;
    flex-direction: row;
    align-items: center;
}



</style>