<template>
    <!-- 桶/库位绑定 -->
    <div>
        <div class="btn" @click="wxcButtonContainerLocation">
            <text class="btn-txt">桶/库位绑定</text>
        </div>
        <div class="mask-container">
            <wxc-popup popup-color="#fff" :show="show" @wxcPopupOverlayClicked="wxcMaskSetHidden" pos="left" height="400">
                <div class="content mask-content">
                    <div class="mask-title">
                        <text class="title">桶/库位绑定</text>
                    </div>
                    <div class="input_box">
                        <input v-model="ContainerNum" class="input_item" type="text" placeholder="请输入桶的编号" @input="onInputContainer">
                    </div>
                    <div class="input_box">
                        <input v-model="LocationNum" class="input_item" type="text" placeholder="请输入库位的编号" @input="onInputContainer">
                    </div>
                    <div class="button_box bottom">
                        <wxc-button text="确定" type="blue" :disabled="isDisabled" @wxcButtonClicked="wxcConfirmContainer"></wxc-button size="small">
                    </div>
                    <div class="button_box bottom">
                        <wxc-button text="查看" type="blue" :disabled="isCheckDisabled" @wxcButtonClicked="wxcCheckList"></wxc-button size="small">
                    </div>
                </div>
            </wxc-popup>
        </div>
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
            </wxc-popup>
        </div>
    </div>
</template>
<script>
const stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
const modal = weex.requireModule('modal');
import { WxcPopup, WxcButton } from 'weex-ui';
export default {
    components: { WxcPopup, WxcButton },
    data: () => ({
        ContainerNum: '',
        LocationNum: '',
        show: false,
        showTable: false,
        isDisabled: true,
        isCheckDisabled: true,
        tableHeadData: ['编号', '桶号', '二维码号'],
        tableBodyData: [],
        isPreviewDisabled: false,
        isNextDisabled: false,
        currentPage: 1,
        pageSize: 10,
        pages: 0,
        pageNum: 1
    }),
    methods: {
        // 打开弹窗
        wxcButtonContainerLocation(e) {
            if (e.disabled) {
                return;
            } else {
                this.show = true;
            }
        },
        // 关闭弹窗
        wxcMaskSetHidden() {
            this.show = false;
        },

        // 关闭弹窗---列表
        wxcMaskTableHidden() {
            this.showTable = false;
        },

        //输入桶编号和库位编号
        onInputContainer() {
            if (this.ContainerNum && this.LocationNum) {
                this.isDisabled = false;
            } else {
                this.isDisabled = true;
                if (!this.ContainerNum) {
                    modal.toast({ message: '桶编号不能为空' });
                } else if (!this.LocationNum) {
                    modal.toast({ message: '库位号不能为空' });
                }
            }
        },

        // 确认按钮
        wxcConfirmContainer(e) {
            if (e.disabled) {
                return;
            } else {
                let that = this;
                let url = 'http://10.34.10.53:8200/containerFunctionLocation/saveContainerFunctionLocation';
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

        // 打开列表弹窗
        wxcCheckList() {
            this.showTable = true;
            this.initTable();
        },
        // 初始化table和筛选table
        initTable() {
            let that = this;
            let url = 'http://10.34.10.53:8200/containerFunctionLocation/getAllContainerFunctionLocation';
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
    }
}
</script>
<style src='../styles/style.css'></style>
<style scoped>
.btn {
    display: flex;
    justify-content: center;
    background-color: #0099ff;
    width: 200px;
    height: 100px;
    border-radius: 10px;
}

.btn-txt {
    text-align: center;
    margin: 0 auto;
    color: #fff;
    font-size: 35px;
}

.mask-container {
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

.mask-title {
    align-items: center;
}

.title {
    font-size: 28px;
}

.button_box {
    margin-top: 20px;
    align-items: center;
}

.bottom {
    margin-top: 40px;
}

.input_box {
    margin-bottom: 20;
    margin-top: 20;
    align-items: center;
}

.input_item {
    width: 690px;
    height: 90px;
    border-style: solid;
    border-width: 1;
    border-color: #333;
    border-radius: 10;
    padding-left: 20;
}

/**/
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

.active {
    background-color: #ffb200;
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
</style>