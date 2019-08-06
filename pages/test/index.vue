<template>
  <div>
    <nuxt-link to="/index/params">首页</nuxt-link>
    <div @click="alertr">alert</div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { MessageBox } from "mint-ui";
import { request } from "@/plugins/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$axios);
    request("post", "/stat/get_user_info.do", { user_id: "" }).then(res => {
      console.log(res);
    });
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