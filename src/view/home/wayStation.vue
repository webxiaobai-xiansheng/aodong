<template>
  <!-- 中间站 -->
  <div class="home">
    <v-popover-way></v-popover-way>
    <v-table class="table"></v-table>
    <!-- <v-page></v-page> -->

    <wxc-popup popup-color="#fff"
               :show="showproduct"
               pos="bottom"
               height="500">
      <div class="demo-content">
            <div class="mask-title">
                <text class="title">复核</text>
            </div>
            <div class="inputBox">
                <text class="input-title">功能间</text>
                <div class="input_box">
                    <text class="input_item">{{functionNumber}}</text>
                </div>
            </div>
            <div class="inputBox">
                <text class="input-title">编号</text>
                <div class="input_box">
                    <text class="input_item">{{containerNumber}}</text>
                </div>
            </div>
            <div class="inputBox">
                <text class="input-title">产品名称</text>
                <div class="input_box">
                    <text class="input_item">{{productName}}</text>
                </div>
            </div>
            <div class="button_box">
                <wxc-button text="允许" type="blue" @wxcButtonClicked="wxcChoseAllow" size="medium"></wxc-button >
                <wxc-button text="拒绝" type="blue" @wxcButtonClicked="wxcChoseRefuse" size="medium"></wxc-button >
            </div>
      </div>
    </wxc-popup>
    <!-- <v-page></v-page> -->
  </div>
</template>

<script>
const modal = weex.requireModule('modal');
const stream = weex.requireModule('stream');
const navigator = weex.requireModule('navigator');
import vPopoverWay from '../../components/vPopoverWay';
import vTable from '../../components/vTable';
// import vPage from '../../components/btn/vPage';
import { WxcButton, WxcPopup } from 'weex-ui';
export default {
  data () {
    return {
      functionNumber:'',
      containerNumber:'',
      productName:'',
      showproduct:false,
      count:1,
      time:''
    }
  },
  components: {
    vPopoverWay,
    vTable,
    // vPage,
    WxcButton,
    WxcPopup
  },
  created () {
    this.$nextTick(function () {
        this.time=setInterval(this.timer, 1000);
    })
  },
  methods: {
    timer(){
      this.showproduct=true;
      let _this=this;
      if(this.containerNum!=='undefined'&&this.workshopName!=='undefined'){
        let url = 'http://10.34.10.25:8999/agvTask/getReviewTask';
        // let body = JSON.stringify({
        //     containerNumber:_this.containerNum,
        //     functionRoomNumber:_this.workshopName
        // });
        stream.fetch({
            method:"POST",
            url:url,
            headers:{'Content-Type':'application/json'},
            body: body,
            type:'json',
        },function(ret){
            if(ret.data.status===1){
                modal.toast({ message: ret.data.message, duration: 3 });
            }else{
                modal.toast({ message: ret.data.message, duration: 3 });
            }
        })
      }else{
        modal.toast({ message: '请选择桶编号', duration: 3 });
      }
      if (this.count > 0) {
          this.count++;
          console.log(this.count)
          clearInterval(this.time)
          
      }
    },
    wxcChoseAllow(){
      this.showproduct=false;
      // setInterval(this.timer, 60000);
    },
    wxcChoseRefuse(){
      this.showproduct=false;
      // setInterval(this.timer, 60000);
    }
  }
}
</script>

<style scoped>
.table{
  /* margin-bottom: 40px; */
}
.inputBox{
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
}
.input-title{
    flex: 1;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
}
.input_box {
    flex:3;
    /* flex-direction: row; */
    border-style: solid;
    border-width: 1px;
    border-color: #333;
    border-radius: 10px;
    margin-bottom: 40px;
    padding-left: 20px;
}
.login-txt{
    padding:20px;
    /* justify-content: center; */
    /* align-items: center; */
    /* flex-direction: column; */
}


.input_item {
    height: 60px;
    line-height:60px;
    font-size:30px;
}

.button_box {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;
}

.mask-content {
    padding-top: 20;
}

.mask-title {
    padding: 20px 0;
    align-items: center;
}

.title {
    font-size: 28px;
}

.mask-btns {
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.scroller-box {
    height: 606;
    position: absolute !important;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}

.workShop-confirm {
    margin-top: 10px;
}
.button{
    align-items: center;
}
</style>