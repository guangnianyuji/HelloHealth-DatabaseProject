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
        <div class="editorButton" @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
            <i class="fi fi-rr-align-left centerIcon"></i>
        </div>
        <div class="editorButton" @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
            <i class="fi fi-rr-align-center centerIcon"></i>
        </div>
        <div class="editorButton" @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
            <i class="fi fi-rr-symbol centerIcon"></i>
        </div>
        <div class="editorButton" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
            <i class="fi fi-rr-list centerIcon"></i>
        </div>
        <div class="editorButton" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
            <i class="fi fi-rr-quote-right centerIcon"></i>
        </div>
        <div class="editorButton" @click="addImage">
            <i class="fi fi-rr-picture centerIcon"></i>
        </div>
    </div>
    <editor-content :editor="editor" class="writableEditor" />
</template>

<script>
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image'
import { Editor, EditorContent } from '@tiptap/vue-3'

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
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
            ],
            content: ``,
        })
    },
    methods: {
        addImage() {
            const url = window.prompt('URL')

            if (url) {
                this.editor.chain().focus().setImage({src: url}).run()
            }
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