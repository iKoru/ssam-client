<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <div>
    <editor/>
    <survey-maker/>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import SurveyMaker from '@/components/SurveyMaker'
export default {
  components: {
    Editor,
    SurveyMaker
  }
}
</script>
