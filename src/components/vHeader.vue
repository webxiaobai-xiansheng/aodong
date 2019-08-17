<template>
  <div class="container" :style="{ height: height }">
    <div class="demo">
      <wxc-minibar
            background-color="#009ff0"
            leftButton=""
            @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
            @wxcMinibarRightButtonClicked="minibarRightButtonClick">
          <text style="font-size: 35px;color:#fff;" slot="middle">{{workShopTitle}}</text>
          <text slot="right" style="font-size: 35px;color:#fff;">退出</text>
      </wxc-minibar>
    </div>
  </div>
</template>

<script>
import { WxcMinibar } from 'weex-ui';
const modal = weex.requireModule('modal');
const storage = weex.requireModule('storage');
export default {
  components: { WxcMinibar },
  data () {
    return {
      workShopTitle:''
    }
  },
  methods: {
    minibarLeftButtonClick () {
    },
    minibarRightButtonClick () {
      storage.removeItem('workShopName',event>{

      }),
      storage.removeItem('workShopTitle',event>{

      }),
      storage.removeItem('containerNum',event>{

      }),
      modal.toast({ 'message': '退出成功', 'duration': 1 });
      this.$router.push({name:'login'})
    }
  },
  created () {
    storage.getItem('workShopTitle', event => {
      this.workShopTitle = event.data;
    });
  }
}
</script>

<style scoped>
.demo{
  margin-bottom: 20px;
}
</style>
