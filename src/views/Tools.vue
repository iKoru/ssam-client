 <template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 class="mb-3 pl-2">
        <span class="title">글자수 세기 / 금지어 체크</span>
        <v-subheader>영숫자 1바이트, 한글 3바이트로 글자수 세기 및 지정된 금지어가 있는지 여부를 체크합니다.</v-subheader>
      </v-flex>
      <v-flex xs12 :sm6="forbidden.length > 0" :class="{'pr-3':$vuetify.breakpoint.smAndUp}">
        <v-layout column>
          <v-flex xs12 class="px-2">
            <span>검사할 내용 입력</span>
            <v-textarea v-model="text" id="text" class="mt-2" auto-grow @keydown="inputChanged" outline hide-details placeholder="검사할 내용을 입력해주세요."></v-textarea>
          </v-flex>
          <v-divider class="my-2"/>
          <v-flex class="px-2">
            공백 포함
            <span class="primary--text ml-2">{{text.length}}</span> 자 &nbsp;| &nbsp;
            <b>{{byteLength}}</b> 바이트
            <br>공백 제외
            <span class="primary--text ml-2">{{withoutSpace.length}}</span> 자 &nbsp;| &nbsp;
            <b>{{byteLengthWithoutSpace}}</b> 바이트
          </v-flex>
          <v-divider class="my-2"/>
          <v-flex xs12 class="mt-2 px-2">
            <div>
              <span>
                <span class="error--text">금지어</span> 설정
              </span>
              <div class="mt-2">
                <v-chip v-for="(item, index) in forbidden" close @input="itemRemoved(index)" outline small color="secondary" :key="item">{{item}}</v-chip>
              </div>
              <v-layout row align-center>
                <v-text-field v-model="candidate" placeholder="추가할 금지어 입력" single-line class="dense mt-0 pt-0" hint="여러개는 쉼표(,)로 구분하여 한번에 입력하실 수 있습니다." persistent-hint @keydown.enter.stop="addItems"></v-text-field>
                <v-btn @click="addItems" class="short" depressed small>추가</v-btn>
              </v-layout>
            </div>
          </v-flex>
          <v-flex xs12 class="mt-3 px-2">
            <div>
              <span>
                <span class="warning--text">주의어</span> 설정
              </span>
              <div class="mt-2">
                <v-chip v-for="(item, index) in warning" close @input="warningItemRemoved(index)" outline small color="secondary" :key="item">{{item}}</v-chip>
              </div>
              <v-layout row align-center>
                <v-text-field v-model="warningCandidate" placeholder="추가할 주의어 입력" single-line class="dense mt-0 pt-0" hint="여러개는 쉼표(,)로 구분하여 한번에 입력하실 수 있습니다." persistent-hint @keydown.enter.stop="addWarningItems"></v-text-field>
                <v-btn @click="addWarningItems" class="short" depressed small>추가</v-btn>
              </v-layout>
            </div>
          </v-flex>
          <v-flex v-if="$vuetify.breakpoint.smAndUp">
            <v-layout row>
              <v-flex class="text-xs-center mt-3">
                <v-btn depressed color="primary" @click="copy">전체내용 복사</v-btn>
                <v-btn depressed @click="reset">초기화</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 v-show="forbidden.length > 0" :class="{'pl-3':$vuetify.breakpoint.smAndUp, 'px-2':$vuetify.breakpoint.xsOnly, 'mt-3':$vuetify.breakpoint.xsOnly}" :style="{'border-left':$vuetify.breakpoint.smAndUp?'1px solid rgba(0,0,0,0.12)':'none'}">
        <span>금지어, 주의어 체크결과</span>
        <div id="filtered" class="mt-2 px-3" v-html="filtered"></div>
      </v-flex>
      <v-flex v-if="$vuetify.breakpoint.xsOnly">
        <v-layout row>
          <v-flex class="text-xs-center mt-3">
            <v-btn depressed color="primary" @click="copy">전체내용 복사</v-btn>
            <v-btn depressed @click="reset">초기화</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MainLayout from '../layouts/MainLayout';

export default {
  name: 'Tools',
  components: {
    Editor: () => import('@/components/board/editor/Editor')
  },
  data () {
    return {
      text: '',
      filtered: '금지어, 주의어가 입력되면 강조되어 표시됩니다.',
      debounce: null,
      forbidden: ['금지어', '호호'],
      defaultForbidden: ['금지어', '호호'],
      warning: ['주의어', '키키'],
      defaultWarning: ['주의어', '키키'],
      candidate: null,
      warningCandidate: null
    };
  },
  computed: {
    byteLength () {
      return (function (s, b, i, c) {
        for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
        return b;
      })(this.text);
    },
    withoutSpace () {
      return this.text.replace(/\s/g, '');
    },
    byteLengthWithoutSpace () {
      return (function (s, b, i, c) {
        for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
        return b;
      })(this.withoutSpace);
    }
  },
  created () {
    this.$emit('update:layout', MainLayout);
    this.$store.dispatch('setColumnType', 'HIDE_SM');
  },
  methods: {
    inputChanged () {
      if (!this.debounce) {
        clearTimeout(this.debounce);
      }
      this.debounce = setTimeout(() => {
        let words = this.text;
        if (this.forbidden.length > 0) {
          words = this.text.replace(new RegExp('(' + this.forbidden.join('|') + ')', 'g'), '<span class="error--text">$1</span>');
        }
        if (this.warning.length > 0) {
          words = words.replace(new RegExp('(' + this.warning.join('|') + ')', 'g'), '<span class="warning--text">$1</span>');
        }
        words = words.replace(/(?:\r\n|\r|\n)/g, '<br>');
        this.filtered = words;
      }, 500);
    },
    itemRemoved (index) {
      this.forbidden.splice(index, 1);
    },
    warningItemRemoved (index) {
      this.warning.splice(index, 1);
    },
    addItems () {
      if (typeof this.candidate === 'string') {
        this.candidate.split(',').forEach(x => {
          x = x.replace(/(<|>)/g, '');
          if (x !== '') {
            if (this.forbidden.indexOf(x) >= 0) {
              return;
            }
            this.forbidden.push(x);
          }
        });
        this.inputChanged();
        this.candidate = null;
      }
    },
    addWarningItems () {
      if (typeof this.warningCandidate === 'string') {
        this.warningCandidate.split(',').forEach(x => {
          x = x.replace(/(<|>)/g, '');
          if (x !== '') {
            if (this.warning.indexOf(x) >= 0) {
              return;
            }
            this.warning.push(x);
          }
        });
        this.inputChanged();
        this.warningCandidate = null;
      }
    },
    copy () {
      let testingCodeToCopy = document.querySelector('#text');
      testingCodeToCopy.select();

      try {
        document.execCommand('copy');
        this.$store.dispatch('showSnackbar', { text: '내용이 복사되었습니다.', color: 'success' });
      } catch (error) {
        console.log(error);
      }

      window.getSelection().removeAllRanges();
    },
    reset () {
      this.text = '';
      this.forbidden = this.defaultForbidden.slice();
      this.warning = this.defaultWarning.slice();
      this.inputChanged();
    }
  }
};
</script>
<style>
#filtered {
  font-size: 16px;
}
textarea#text {
  margin-top: 8px;
}
</style>
