<template>
    <div class="login_content">
        <div class="container">
            <div class="demo">
                <wxc-minibar background-color="#009ff0" leftButton="" @wxcMinibarLeftButtonClicked="minibarLeftButtonClick" @wxcMinibarRightButtonClicked="minibarRightButtonClick">
                    <text style="font-size: 35px;color:#fff;" slot="middle">桶/库位绑定</text>
                    <text slot="right" style="font-size: 35px;color:#fff;">退出</text>
                </wxc-minibar>
            </div>
        </div>
        <div class="login-txt">
            <div class="login_input">
                <div class="inputBox">
                    <text class="input-title">桶编号</text>
                    <div class="input_box">
                        <input v-model="ContainerNum" class="input_item" type="text" placeholder="请输入桶的编号" @input="onInputContainer">
                    </div>
                </div>
                <div class="inputBox">
                    <text class="input-title">库位二维码</text>
                    <div class="input_box">
                        <input v-model="LocationNum" class="input_item" type="text" placeholder="请输入库位二维码的编号" @input="onInputContainer">
                    </div>
                </div>
            </div>
            <div class="button_box">
                <wxc-button text="确定" type="blue" @wxcButtonClicked="wxcConfirmContainer"></wxc-button>
            </div>
            <div class="button_box">
                <wxc-button text="查看" type="blue" @wxcButtonClicked="wxcCheckList"></wxc-button>
            </div>
            <div class="button_box">
                <wxc-button text="返回中间站" type="blue" @wxcButtonClicked="onBlack"></wxc-button>
            </div>
        </div>
        <!-- 列表 -->
        <div class="mask-container">
            <wxc-popup popup-color="#fff" :show="showTable" @wxcPopupOverlayClicked="wxcMaskTableHidden" pos="left" height="400">
                <div class="table_box">
                    <div class="table_container">
                        <table class="table">
                            <thead>
                                <tr class="table_tr">
                                    <th class="table_th long" v-for="theadItem in tableHeadData"><text>{{theadItem}}</text></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="table_tr" v-for="(item,index) in tableBodyData">
                                    <td class="table_td long"><text>{{item.id}}</text></td>
                                    <td class="table_td long"><text>{{item.containerFunctionNumber}}</text></td>
                                    <td class="table_td long"><text>{{item.containerFunctionQrCodeNumber}}</text></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- 页码功能 -->
                <div class="pageButton_box">
                    <wxc-button text="上一页" type="blue" size="big" :disabled="isPreviewDisabled" @wxcButtonClicked="wxcButtonPreview"></wxc-button>
                    <div class="text_box">
                        <text class="page-txt pageNum">{{currentPage}}/{{pages}}</text>
                    </div>
                    <wxc-button text="下一页" type="blue" size="big" :disabled="isNextDisabled" @wxcButtonClicked="wxcButtonNext"></wxc-button>
                </div>
                <!-- 返回按钮 -->
                <div class="pageButton_box">
                    <wxc-button text="返回" type="blue" size="big" @wxcButtonClicked="back"></wxc-button>
                </div>
            </wxc-popup>
        </div>
    </div>
</template>
<script>
const modal = weex.requireModule('modal');
const stream = weex.requireModule('stream');
import { WxcButton, WxcRadio, WxcPageCalendar, WxcMinibar, WxcPopup } from 'weex-ui';
export default {
    components: { WxcButton, WxcRadio, WxcPageCalendar, WxcMinibar, WxcPopup },
    data: () => ({
        ContainerNum: '10086',
        LocationNum: '33333',
        isCheckDisabled: true,
        tableHeadData: ['编号', '桶号', '库位二维码编号'],
        tableBodyData: [],
        isPreviewDisabled: false,
        isNextDisabled: false,
        currentPage: 1,
        pageSize: 10,
        pages: 0,
        pageNum: 1,
        showTable: false
    }),
    methods: {
        //输入桶编号和库位编号
        onInputContainer() {
            if (this.ContainerNum && this.LocationNum) {
                this.isDisabled = false;
            } else {
                this.isDisabled = true;
                if (!this.ContainerNum) {
                    modal.toast({ message: '桶编号不能为空' });
                } else if (!this.LocationNum) {
                    modal.toast({ message: '库位二维码编号不能为空' });
                }
            }
        },

        // 确定绑定按钮
        wxcConfirmContainer(e) {
            if (e.disabled) {
                return;
            } else {
                let that = this;
                let url = 'http://10.34.10.126:8200/containerFunctionLocation/saveContainerFunctionLocation';
                let body = JSON.stringify({
                    containerFunctionNumber: that.ContainerNum,
                    containerFunctionQrCodeNumber: that.LocationNum
                });
                stream.fetch({
                    method: "POST",
                    type: 'json',
                    url: url,
                    headers: { 'Content-Type': 'application/json' },
                    body: body
                }, function(ret) {
                    console.log(ret);
                    let data = ret.data.data;
                    if (ret.status === 200) {
                        if (ret.data.status === 1) {
                            modal.toast({ message: ret.data.message });
                            that.isCheckDisabled = false;
                        } else {
                            modal.toast({ message: ret.data.message });
                        }
                    }
                });
                // this.show = false;
            }
        },
        minibarLeftButtonClick() {},
        minibarRightButtonClick() {
            modal.toast({ 'message': '退出成功', 'duration': 1 });
            this.$router.push({ name: 'login' })
        },
        // 打开列表弹窗
        wxcCheckList() {
            this.showTable = true;
            this.initTable();
        },
        // 初始化table
        initTable() {
            let that = this;
            let url = 'http://10.34.10.126:8200/containerFunctionLocation/getAllContainerFunctionLocation'
            let body = JSON.stringify({
                page: that.currentPage,
                size: that.pageSize
            });
            stream.fetch({
                method: "POST",
                type: 'json',
                url: url,
                headers: { 'Content-Type': 'application/json' },
                body: body
            }, function(ret) {
                console.log(ret)
                let data = ret.data.data;
                if (ret.status === 200) {
                    if (ret.data.status === 1) {
                        modal.toast({ message: ret.data.message });
                        that.tableBodyData = data.list;
                        if (data.list && data.list != '') {
                            that.isCheckDisabled = false;
                        }
                        that.pages = data.pages; //页数
                        that.currentPage = data.pageNum; //当前页
                        if (data.pageNum > 1) {
                            if (data.pageNum === data.pages) {
                                that.isPreviewDisabled = false;
                                that.isNextDisabled = true;
                            }
                        }
                        if (data.pageNum === 1) {
                            that.isPreviewDisabled = true;
                            that.isNextDisabled = false;
                            if (data.pageNum === data.pages) {
                                that.isPreviewDisabled = true;
                                that.isNextDisabled = true;
                            }
                        }
                    } else {
                        modal.toast({ message: ret.data.message });
                    }
                }
            });
        },

        // 分页按钮--上一页
        wxcButtonPreview(e) {
            let that = this;
            if (e.disabled) {
                return;
            } else {
                that.currentPage -= 1;
                that.initTable();
            }
        },
        // 分页按钮--下一页
        wxcButtonNext(e) {
            let that = this;
            if (e.disabled) {
                return;
            } else {
                that.currentPage += 1;
                that.initTable();
            }
        },
        // 返回中间站
        onBlack() {
            this.$router.push({ name: 'wayStation' })
        },
        // 返回上一页
        back() {
            this.showTable = false;
        },
        // 关闭popup
        wxcMaskTableHidden() {
            this.showTable = false;
        }
    }
}
</script>
<style scoped>
.inputBox {
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
}

.input-title {
    flex: 1;
    line-height: 60px;
    text-align: center;
    font-size: 30px;
}

.input_box {
    flex: 3;
    /* flex-direction: row; */
    border-style: solid;
    border-width: 1px;
    border-color: #333;
    border-radius: 10px;
    margin-bottom: 40px;
    padding-left: 20px;
}

.login-txt {
    padding: 20px;
    /* justify-content: center; */
    /* align-items: center; */
    /* flex-direction: column; */
}


.input_item {
    height: 60px;
    line-height: 60px;
    font-size: 30px;
}

.button_box {
    margin-top: 20px;
}
.mask-container{
    display: flex;
    justify-content: center;
    align-items: center;
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

.button {
    align-items: center;
}

/*table*/
.table_container {
    align-items: center;
    margin-top: 20px;
}

.table {
    width: 702;
    border-style: solid;
    border-color: #333;
    border-width: 1px;
    overflow-x: scroll;
}

.table_tr {
    flex-direction: row;
}

.table_th {
    width: 234;
    height: 60;
    border-style: solid;
    border-color: #333;
    border-right-width: 1px;
    justify-content: center;
    align-items: center;
    background-color: #ccc;
}

.table_td {
    width: 234;
    height: 60;
    border-style: solid;
    border-color: #333;
    border-right-width: 1px;
    border-top-width: 1px;
    justify-content: center;
    align-items: center;
}

/*分页*/
.pageButton_box {
    flex-direction: row;
    justify-content: space-around;
    justify-content: center;
    margin-top:20px;
    /* width:400px; */
    /* background-color: orange; */
}
.text_box {
    width: 100px;
    height: 70px;
    background-color: #0f8ee8;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
}
</style>