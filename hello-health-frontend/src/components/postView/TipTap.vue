<script setup>
import {useEditor, EditorContent, Editor} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps(['content'])

const emit = defineEmits(['update:content'])

const editor = new Editor({
    content: props.content,
    extensions: [
        StarterKit,
    ],
    onUpdate: () => {
        emit('update:content',editor.getJSON())
    }
})
</script>

<template>
    <editor-content :editor="editor" />
</template>

<style scoped>

</style>