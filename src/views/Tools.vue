 <template>
  <v-container>
    <v-layout column justify-center align-center>
      <v-flex xs12>
        <v-textarea v-model="text"></v-textarea>
        <div contenteditable="true" @input="highlightContent" v-html="content()" style="border:1px solid #e8e8e8"></div>
        <editor/>
      </v-flex>
      <v-flex>
        공백 포함 :
        <span class="primary--text">{{text.length}}</span>자 |
        <span>{{byteLength}}</span> Bytes
        <br>공백 제외 :
        <span class="primary--text">{{withoutSpace.length}}</span>자 |
        <span>{{byteLengthWithoutSpace}}</span> Bytes
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
export default {
  name: "Tools",
  components: {
    Editor: () => import("@/components/board/editor/Editor")
  },
  data() {
    return {
      text: ""
    };
  },
  computed: {
    byteLength() {
      return (function(s, b, i, c) {
        for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
        return b;
      })(this.text);
    },
    withoutSpace() {
      return this.text.replace(/\s/g, "");
    },
    byteLengthWithoutSpace() {
      return (function(s, b, i, c) {
        for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
        return b;
      })(this.withoutSpace);
    }
  },
  created() {
    this.$emit("update:layout", MainLayout);
    this.$store.dispatch("setColumnType", "HIDE_SM");
  },
  methods: {
    content() {
      var html = "";
      for (var text of this.text) {
        html += "<span>" + text + " " + "</span>";
      }
      return html;
    },
    highlightContent(evt) {
      var texts = evt.target.innerText.split(" ");
      this.text = texts.map(t => t.toLocaleUpperCase());
    }
  }
};
</script>
