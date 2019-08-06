<template>
  <div>
    <nuxt-link to="/index/params">首页</nuxt-link>
    <div @click="alertr">alert</div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$browser);
  },
  methods: {
    alertr() {
      MessageBox({
        title: "Notice",
        message: "Are you sure?",
        showCancelButton: true
      });
    }
  }
};
</script>

<style lang='scss' scoped='' type='text/css'>
</style>