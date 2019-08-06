<template>
  <div>
    <mt-header fixed title="multiple button">
      <nuxt-link to="/" slot="left">
        <mt-button icon="back">back</mt-button>
        <mt-button @click>close</mt-button>
      </nuxt-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <li class="list__item" v-for="(item, key) in list" :key="key">{{ item }}</li>
    </ul>
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="tab1">
        <img
          slot="icon"
          src="https://official-web.oss-cn-beijing.aliyuncs.com/towords/article/T/story/icon_1.png"
        />
        tab1
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <img
          slot="icon"
          src="https://official-web.oss-cn-beijing.aliyuncs.com/towords/article/T/story/icon_1.png"
        />
        tab2
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <img
          slot="icon"
          src="https://official-web.oss-cn-beijing.aliyuncs.com/towords/article/T/story/icon_1.png"
        />
        tab3
      </mt-tab-item>
      <mt-tab-item id="tab4">
        <img
          slot="icon"
          src="https://official-web.oss-cn-beijing.aliyuncs.com/towords/article/T/story/icon_1.png"
        />
        tab4
      </mt-tab-item>
    </mt-tabbar>

    <div @click="alertr">alert</div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { MessageBox } from "mint-ui";
import { request } from "@/plugins/axios";
export default {
  data() {
    return {
      selected: "",
      list: [0]
    };
  },
  mounted() {
    // console.log(this.$axios);
    // request("post", "/stat/get_user_info.do", { user_id: "" }).then(res => {
    //   console.log(res);
    // });
  },
  methods: {
    alertr() {
      MessageBox({
        title: "Notice",
        message: "Are you sure?",
        showCancelButton: true
      }).then(result => {
        console.log(result);

        if (result === "confirm") {
          this.loadMore();
        } else {
        }
      });
    },
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style lang='scss' scoped='' type='text/css'>
.list__item {
  font-size: 0.14rem;
}
</style>