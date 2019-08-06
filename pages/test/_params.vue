<template>
  <div></div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      title: "555"
    };
  },
  mounted() {},
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "测试", content: "My custom description" }
      ]
    };
  }
};
</script>

<style lang='scss' scoped='' type='text/css'>
</style>