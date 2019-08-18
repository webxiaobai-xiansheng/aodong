<template>
  <div class="header">
    <div class="header-cont">
      <div class="title">
        <text class="title_txt">{{workShopTitle}}</text>
      </div>
      <div class="black" @click="minibarRightButtonClick">
        <text class="title_txt">退出</text>
      </div>
    </div>
    <wxc-dialog title="退出登录"
                content="确定要退出嘛？？？"
                :show="show"
                :single="false"
                @wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
                @wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked">
    </wxc-dialog>
  </div>
</template>

<script>
import { WxcDialog } from 'weex-ui';
const modal = weex.requireModule('modal');
const storage = weex.requireModule('storage');
export default {
  components: { WxcDialog },
  data () {
    return {
      workShopTitle:'',
      show:false,
    }
  },
  methods: {
    openDialog () {
      this.show = true;
    },
    wxcDialogCancelBtnClicked () {
      this.show = false;
    },
    wxcDialogConfirmBtnClicked () {
      storage.removeItem('workShopName',event=>{
        console.log(event.data); //undefined表示设置成功
      }),
      storage.removeItem('workShopTitle',event=>{
        console.log(event.data); //undefined表示设置成功
      }),
      storage.removeItem('containerNum',event=>{
        console.log(event.data); //undefined表示设置成功
      }),
      modal.toast({ 'message': '退出成功', 'duration': 1 });
      this.show = false;
      this.$router.push({name:'login'})
    },
    minibarRightButtonClick () {
      this.show = true;
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
.header{
  
  background-color:#009ff0;
  margin-bottom: 20px;
  text-align: center;
  height: 80px;
}
.header-cont{
  display: flex;
  flex-direction: row;
  justify-content: content;
}
.black{
  flex: 1;
  /* float: right; */
}
.title{
  flex: 5;
}
.title_txt{
  font-size: 36px;
  line-height: 80px;
  color: #fff;
  text-align: center;
}
</style>
