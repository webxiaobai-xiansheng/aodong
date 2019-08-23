<template>
  <!-- 称重功能 -->
  <div class="btn" @click="wxcButtonWeigh">
    <text class="btn-txt">称重完成</text>
  </div>
</template>


<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
export default {
  methods: {
    wxcButtonWeigh (e) {
        let _this=this;

        let url = 'http://10.34.10.177:8999/delivery/weighing';
        let body = JSON.stringify({

        });
        stream.fetch({
            method:"POST",
            url:url,
            headers:{'Content-Type':'application/json'},
            body: body,
            type:'json',
        },function(ret){
            if(ret.data.status===1){
                const Steve = new BroadcastChannel('Avengers')
                Steve.postMessage('Assemble!')
                modal.toast({ message: ret.data.message, duration: 3 });
            }else{
               modal.toast({ message: ret.data.message, duration: 3 });
            }
        })
    }
  }
}
</script>

<style scoped>
.btn{
  display: flex;
  justify-content: center;
  background-color:#0099ff;
  width: 200px;
  height: 100px;
  border-radius: 10px;
}
.btn-txt{
  text-align: center;
  margin: 0 auto;
  color: #fff;
  font-size: 35px;
}
</style>