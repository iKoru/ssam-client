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
                <v-chip v-for="(item, index) in forbidden" close @input="itemRemoved(index)" outline small color="secondary" :key="item.text">{{item.text}}</v-chip>
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
                <v-chip v-for="(item, index) in warning" close @input="warningItemRemoved(index)" outline small color="secondary" :key="item.text">{{item.text}}</v-chip>
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
        <div id="filtered" :class="{'mt-3 subheading':true, 'pr-5':$vuetify.breakpoint.smAndUp, 'pr-4 pl-2':$vuetify.breakpoint.xsOnly}" v-html="filtered"></div>
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
  data () {
    return {
      text: '',
      filtered: '금지어, 주의어가 입력되면 강조되어 표시됩니다.',
      debounce: null,
      forbidden: null,
      defaultForbidden: [{ text: '대회', value: '대회' }, { text: '경시', value: '경시' }, { text: '공모전', value: '공모전' }, { text: '수상', value: '수상' }, { text: '논문', value: '논문' }, { text: '모의고사', value: '모의고사' }, { text: '토익', value: '토익' }, { text: '토플', value: '토플' }, { text: '텝스', value: '텝스' }, { text: '학회지', value: '학회지' }, { text: '헌혈', value: '헌혈' }, { text: '선플', value: '선플' }, { text: '모금', value: '모금' }, { text: '소양교육', value: '소양교육' }],
      warning: null,
      defaultWarning: [{ text: '(모든 영어단어)', value: /([a-z]+)/gi }, { text: '1인칭 시점 문장(\'~다.\')', value: /(했(?:습니)?다\.|하였(?:습니)?다\.|었(?:습니)?다\.|이다\.|느꼈(?:습니)?다\.|꼈(?:습니)?다\.|됐(?:습니)?다\.|되었(?:습니)?다\.|된다\.|았(?:습니)?다\.|얻어냈(?:습니)?다\.|얻어 냈(?:습니)?다\.|깨달았(?:습니)?다\.)/g }, { text: '적극적으로 참여', value: '적극적으로 참여' }, { text: '열심히 참여', value: '열심히 참여' }, { text: 'ppt', value: /(ppT)/gi }],
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
    this.reset();
  },
  methods: {
    inputChanged () {
      if (!this.debounce) {
        clearTimeout(this.debounce);
      }
      this.debounce = setTimeout(() => {
        let words = this.text;
        this.forbidden.filter(x => typeof x.value === 'object').forEach(x => {
          words = words.replace(x.value, '<span class="error--text" title="' + x.text + '">$1</span>');
        })
        this.warning.filter(x => typeof x.value === 'object').forEach(x => {
          words = words.replace(x.value, '<span class="warning--text" title="' + x.text + '">$1</span>');
        })
        if (this.forbidden.some(x => typeof x.value === 'string')) {
          words = words.replace(new RegExp('(' + this.forbidden.filter(x => typeof x.value === 'string').map(x => x.value).join('|') + ')', 'g'), '<span class="error--text">$1</span>');
        }
        if (this.warning.some(x => typeof x.value === 'string')) {
          words = words.replace(new RegExp('(' + this.warning.filter(x => typeof x.value === 'string').map(x => x.value).join('|') + ')', 'g'), '<span class="warning--text">$1</span>');
        }
        words = words.replace(/(?:\r\n|\r|\n)/g, '<br>');
        this.filtered = words;
      }, 500);
    },
    itemRemoved (index) {
      this.forbidden.splice(index, 1);
      this.inputChanged();
    },
    warningItemRemoved (index) {
      this.warning.splice(index, 1);
      this.inputChanged();
    },
    addItems () {
      if (typeof this.candidate === 'string') {
        this.candidate.split(',').forEach(x => {
          x = x.replace(/(<|>)/g, '');
          const escaped = x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          if (x !== '') {
            if (this.forbidden.some(y => y.value === escaped)) {
              return;
            }
            this.forbidden.push({ text: x, value: escaped });
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
          const escaped = x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          if (x !== '') {
            if (this.warning.some(y => y.value === escaped)) {
              return;
            }
            this.warning.push({ text: x, value: escaped });
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
      this.filtered = '금지어, 주의어가 입력되면 강조되어 표시됩니다.';
    }
  }
};
</script>
<style>
#filtered{
  line-height:18px;
}
#text {
  margin-top: 4px;
}
</style>
