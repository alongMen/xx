<template>
    <div class="menu-box">
        <div class="Crumb">
            <Crumb></Crumb>
        </div>
        <div class="table-box">

            <div :class="isClickMoreQuery?'moresearch':'searchbox'">
                <Search
                        :model='searchModel'
                        v-on:exeQuery="exeQuery"/>
            </div>

            <Table
                    v-on:handleSizeChange="handleSizeChange"
                    @changePage='changePage'
                    :Tpage='total'
                    :PSize='limit'
                    :tableModel="tableModel"
                    :tableData="tableData"
                    :needOperationArea="false"
            />
        </div>
    </div>
</template>
<script>
    import Crumb from '@/components/crumb.vue'
    import Search from "@/components/search.vue"
    import Table from "@/components/BusinessTable.vue"

    export default {
        data() {
            return {
                data: '',
                form1: {},
                props: {label: 'label', children: 'children'},
                tableData: [],
                dialogFormVisible1: false,
                options: [],
                queryDate: {},
                isClickMoreQuery: false,
                total: 0,
                limit: 5,
                currentPage: 1,
                tableModel: [
                    {
                        attribute: "userid",
                        dontSort: true,
                        type: "normal",
                        title: "用户id",
                        width:"170px",
                    },
                    {
                        attribute: "title",
                        dontSort: true,
                        type: "normal",
                        title: "标题",
                        width:"170px",
                    },
                     {
                        attribute: "content",
                        dontSort: true,
                        type: "normal",
                        title: "内容",
                        width:"170px",
                    },
                     {
                        attribute: "imgUrl",
                        dontSort: true,
                        type: "img",
                        title: "图片",
                        width:"170px",
                    },
                    {
                        attribute: "updateTime",
                        dontSort: true,
                        type: "normal",
                        title: "更新时间",
                        width:"200px",
                    }
                ],
                searchModel: {
                    defaultSearchValue1: {
                        key: 'id',
                        label: '用户ID'
                    },
                    notNeedCreateNewproject:true,
                    Import: {isneed: false, button: '自定义传入'},
                    Export: {isneed: false, button: '自定义传入'},
                    notNeedMoreQuery: true
                },
                form: {},
                arrDataParent: [],
                arrDataType: []
            }
        },
        components: {
            Crumb,
            Search,
            Table
        },
        mounted() {
            this.getColumnInfoData()
        },
        methods: {
            changePage(v) {
                this.currentPage = v
                this.getColumnInfoData()
            },
            handleSizeChange(v, t) {
                console.log(v, t)
                this.limit = v
                this.getColumnInfoData()
            },
            // list数据
            getColumnInfoData() {
                let data = {
                    limit: this.limit,
                    page: this.currentPage,
                    ...this.queryDate
                }
                this.tableData = [];
                this.$http.getDynamicList(data).then(
                    res => {
                        this.tableData = res.data;
                        this.total = res.total
                    }
                );
            },
            // 查询触发
            exeQuery(e) {
                this.currentPage = 1;
                this.queryDate = e;
                this.getColumnInfoData();
            },
        },
    }
</script>
<style lang="less">
    .menu-box {
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;

        .Crumb {
            width: 100%;
            height: 50px;
            box-sizing: border-box;
        }

        .table-box {
            width: 100%;
            min-height: 93%;
            padding: 5px 20px;
            box-sizing: border-box;
            background-color: #ffffff;
            box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.3);
            border-radius: 4px 4px 0px 0px;
            border: solid 1px #dcdcdc;

            .searchbox {
                height: 60px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: 10px 0;
            }

            .moresearch {
                height: 110px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: 10px 0;
            }

            .el-table__row--level-0{
               background-color: #f5f7fa!important;
            }
            .el-table__row--level-1{
               background-color: #fdfefe !important;
            }

        }
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        padding-right: 8px;
    }

</style>