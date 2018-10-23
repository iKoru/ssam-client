<template>
    <div>
        <quill-editor v-model="content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
        </quill-editor>
        <v-btn class="success" @click="saveLocal()">Save(local)</v-btn>
        <div>
            <div id="boardView" v-if="savedContent" v-html="savedContent">
            </div>
            {{link}}
            <link-prevue v-if="link" :linkUrl="link">
            </link-prevue>
        </div>
    </div>
</template>
<script>

import LinkPrevue from '@/components/LinkPrevue'
export default {
  components: {
    LinkPrevue
  },
  data () {
    return {
      savedContent: undefined,
      link: undefined,
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          imageDrop: true,
          imageResize: true
        }
      }
    }
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    saveLocal () {
      this.savedContent = localStorage.item = this.content
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  watch: {
    savedContent (to, from) {
      let href = to.match(/\bhttps?:\/\/\S+/gi)
      if (href) {
        this.link = href[0].substr(0, (href[0]).indexOf('<'))
        console.log(this.link)
      }
    }
  },
  mounted () {
    console.log(this.content)
  }
}
</script>
