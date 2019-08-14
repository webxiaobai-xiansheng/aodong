<template>
    <div class="table_container">
        <table class="table">
            <thead>
                <tr class="table_tr">
                    <th class="table_th" v-for="theadItem in tableHeadData"><text class="font_16">{{theadItem}}</text></th>
                </tr>
            </thead>
            <tbody>
                <tr class="table_tr" v-for="tbodyItem in tableBodyData">
                    <td class="table_td"><text class="font_16">{{tbodyItem.containerNumber}}</text></td>
                    <td class="table_td"><text class="font_16">{{tbodyItem.productName}}</text></td>
                    <td class="table_td"><text class="font_16">{{tbodyItem.lotNumber}}</text></td>
                    <td class="table_td"><text class="font_16">{{tbodyItem.status}}</text></td>
                    <td class="table_td"><text class="font_16">{{tbodyItem.inspectionStatus}}</text></td>
                    <td class="table_td"><text class="font_16">{{tbodyItem.materialName}}</text></td>
                    <td class="table_td"><text class="font_16">{{tbodyItem.productDate}}</text></td>
                    <td class="table_td"><text class="font_16">{{tbodyItem.containerVolume}}</text></td>
                    <td class="table_td"><text class="font_16">{{tbodyItem.containerWeight}}</text></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data: () => ({
        tableHeadData: ['编号', '产品名称', '批号', '状态', '检验状态', '物料名称', '日期', '容积容量', '桶重'],
        tableBodyData: [{
            containerNumber: 'A0001',
            productName: '空料斗',
            lotNumber: '无',
            status: '已清洗',
            inspectionStatus: '待检验',
            materialName: '颗粒',
            productDate: '2019-08-02',
            containerVolume: '90L',
            containerWeight: '80KG'
        }, {
            containerNumber: 'A0031',
            productName: '空料斗',
            lotNumber: '无',
            status: '已清洗',
            inspectionStatus: '待检验',
            materialName: '颗粒',
            productDate: '2019-08-02',
            containerVolume: '90L',
            containerWeight: '80KG'
        }, {
            containerNumber: 'A0031',
            productName: '空料斗',
            lotNumber: '无',
            status: '已清洗',
            inspectionStatus: '待检验',
            materialName: '颗粒',
            productDate: '2019-08-02',
            containerVolume: '90L',
            containerWeight: '80KG'
        }, {
            containerNumber: 'A0031',
            productName: '空料斗',
            lotNumber: '无',
            status: '已清洗',
            inspectionStatus: '待检验',
            materialName: '颗粒',
            productDate: '2019-08-02',
            containerVolume: '90L',
            containerWeight: '80KG'
        }, {
            containerNumber: 'A0031',
            productName: '空料斗',
            lotNumber: '无',
            status: '已清洗',
            inspectionStatus: '待检验',
            materialName: '颗粒',
            productDate: '2019-08-02',
            containerVolume: '90L',
            containerWeight: '80KG'
        }, {
            containerNumber: 'A0031',
            productName: '空料斗',
            lotNumber: '无',
            status: '已清洗',
            inspectionStatus: '待检验',
            materialName: '颗粒',
            productDate: '2019-08-02',
            containerVolume: '90L',
            containerWeight: '80KG'
        }, {
            containerNumber: 'A0031',
            productName: '空料斗',
            lotNumber: '无',
            status: '已清洗',
            inspectionStatus: '待检验',
            materialName: '颗粒',
            productDate: '2019-08-02',
            containerVolume: '90L',
            containerWeight: '80KG'
        }, {
            containerNumber: 'A0031',
            productName: '空料斗',
            lotNumber: '无',
            status: '已清洗',
            inspectionStatus: '待检验',
            materialName: '颗粒',
            productDate: '2019-08-02',
            containerVolume: '90L',
            containerWeight: '80KG'
        }]
    }),
    methods: {}
}
</script>
<style src='../styles/style.css'></style>