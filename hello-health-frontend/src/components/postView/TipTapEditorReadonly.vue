<script>
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image'
import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
  components: {
    EditorContent,
  },
  props:["contentJsonString"],
  data() {
    return {
      editor: null,
    }
  },

  watch: {
    contentJsonString: {
      immediate: true,
      handler(newValue) {
        if(this.editor && newValue) {
          this.editor = new Editor({
            extensions: [
              StarterKit,
              Image,
              TextAlign.configure({
                types: ['heading', 'paragraph'],
              }),
            ],
            content: newValue ? JSON.parse(newValue) : {},
            editable: false
          })
        }
      }
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Image,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
      content: this.contentJsonString ? JSON.parse(this.contentJsonString) : {},
      editable: false
    })
  },
  methods: {

  },

  beforeUnmount() {
    this.editor.destroy()
  }
}
</script>

<template>
    <editor-content :editor="editor" class="readOnlyEditor" />
</template>

<style scoped>

</style>