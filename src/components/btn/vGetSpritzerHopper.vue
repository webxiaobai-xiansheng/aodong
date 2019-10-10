<template>
    <!-- 送料斗功能 -->
    <!-- <div class="btn" @click="wxcButtonGetSpritzerHopper">
      <text class="btn-txt">送料斗</text>
    </div> -->
    <div class="btn">
        <wxc-button text="送料斗" type="blue" :disabled="isDisabled" :btn-style="btnStyle" @wxcButtonClicked="wxcButtonGetSpritzerHopper"></wxc-button>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
var stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
import { WxcButton } from 'weex-ui';
export default {
    components: { WxcButton },
    data() {
        return {
            workshopName: '',
            isDisabled: false,
            btnStyle: {
                width: '200px',
                height: '100px',
                borderRadius: '10px'
            }
        }
    },
    created() {
        storage.getItem('workShopName', event => {
            this.workshopName = event.data;
        });
    },
    methods: {
        wxcButtonGetSpritzerHopper(e) {
            let _this = this;
            _this.isDisabled = true;
            if (e.disabled) {
                _this.isDisabled = true;
                return;
            } else {
                let url = 'http://10.34.10.177:8200/functionRoomUseContainer/getFunctionRoomUseContainer?functionRoomNumber=' + this.workshopName;
                stream.fetch({
                    method: "GET",
                    url: url,
                    type: 'json',
                    timeout: 30000
                }, function(ret) {
                    console.log(ret)
                    if (ret.data.status === 1) {
                        _this.isDisabled = false;
                        if (ret.data.data.length > 0) {
                            _this.$router.push({ name: 'popUp' })
                        } else {
                            modal.toast({ message: '该车间没有料斗，请尝试其他操作', duration: 3 });
                        }
                    }
                })
            }
        }
    }
}
</script>
<style scoped>
.btn {
    display: flex;
    justify-content: center;
    background-color: #0099ff;
    width: 200px;
    height: 100px;
    border-radius: 10px;
}
</style>