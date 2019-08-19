<template>
    <div class="login_content">
        <div class="login_input">
            <div class="user_name input_box">
                <input v-model="userName" class="input_item" type="text" placeholder="用户名称"/>
            </div>
            <div class="user_password input_box">
                <input v-model="userPassword" class="input_item" type="password" placeholder="密码">
            </div>
        </div>

        <div class="button_box">
            <wxc-button text="登录" type="blue" @wxcButtonClicked="onLogin"></wxc-button>
        </div>
        <div class="button_box">
            <wxc-button text="返回" type="blue" @wxcButtonClicked="onBlack"></wxc-button>
        </div>

    </div>
</template>
<script>
const modal = weex.requireModule('modal');
const stream = weex.requireModule('stream');
const navigator = weex.requireModule('navigator');
import { WxcButton } from 'weex-ui';
import toParams from  '../api/config';
export default {
    components: { WxcButton },
    data: () => ({
        userName: 'admin',
        userPassword: 'admin',
    }),
    methods: {
        // 登录按钮
        onLogin() {
            let _this=this;
            if(this.userName&&this.userPassword){
                let url = 'http://10.34.10.126:8200/admin/getAdmin';
                let body = JSON.stringify({
                    username: this.userName,
                    password: this.userPassword
                });
                
                stream.fetch({
                    method:"POST",
                    url:url,
                    headers:{'Content-Type':'application/json'},
                    body: body,
                    type:'json',
                },function(ret){
                    console.log(ret)
                    if(ret.data.status===1){
                        modal.toast({ message: ret.data.message, duration: 3 });
                        _this.$router.push({name:'jurisLoginMessage'});
                    }else{
                        modal.toast({ message: '登录失败！！！', duration: 3 });
                    }
                },function(progress) {
                    // console.log(progress)
                })
            }else{
                modal.toast({ message: '请输入账号和密码', duration: 3 });
            }
        },
        // 返回按钮
        onBlack(){
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>
.login_content {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 90px;
}

.input_box {
    flex-direction: row;
    border-style: solid;
    border-width: 1;
    border-color: #333;
    border-radius: 10;
    margin-bottom: 40;
    padding-left: 20;
}

.input_item {
    width: 670px;
    height: 90px;
}

.button_box {
    margin-top: 20px;
    align-items: center;
}

.bottom {
    margin-top: 40px;
}

.mask-content {
    padding-top: 20;
}

.mask-title {
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
    height: 808;
    position: absolute !important;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}

.workShop-confirm {
    margin-top: 10px;
}
</style>