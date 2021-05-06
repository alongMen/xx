<template>
    <div class="menu-box">
        <div class="Crumb">
            <Crumb></Crumb>
        </div>
        <div class="table-box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="商品管理 " name="img">
                    <div :class="isClickMoreQuery?'moresearch':'searchbox'">
                        <Search
                                :model='searchModel'
                                v-on:exeQuery="exeQuery"
                                v-on:creatProject='addOne'/>
                    </div>
                    <Modal
                            :options='options'
                            :dialogFormVisible='dialogFormVisible1'
                            :title="title"
                            v-on:ListenChild='handlerClose'
                            v-on:ListenChild1='handlerSure'
                            :form='form'
                            :modelP='modelP1'/>

                    <Table
                            @delet="remove"
                            @edit="edit"
                            :PSize="limit"
                            :Tpage="total"
                            @changePage="changePage"
                            @handleSizeChange="handleSizeChange"
                            :tableModel="tableModel"
                            :tableData="tableData"
                    />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>

    import Crumb from '@/components/crumb.vue'
    import Modal from '@/components/modal.vue'
    import Search from "@/components/search.vue"
    import Table from "@/components/BusinessTable.vue"

    export default {
        data() {
            return {
                activeName: 'img',
                data: '',
                form1: {},
                props: {label: 'label', children: 'children'},
                tableData: [],
                dialogFormVisible1: false,
                options: [],
                queryDate: {},
                isClickMoreQuery: false,
                total: 0,
                currentPage: 0,
                limit: 5,
                tableModel: [
                    {
                        attribute: "name",
                        dontSort: true,
                        type: "normal",
                        title: "名称",
                        width: "170px",
                        align: 'left'
                    },
                    {
                        attribute: "type",
                        dontSort: true,
                        width: "220px",
                        type: "normal",
                        title: "类型",
                    },
                    {
                        attribute: "imgUrl",
                        dontSort: true,
                        width: "220px",
                        type: 'img',
                        title: "图片",
                    },
                    {
                        attribute: "price",
                        dontSort: true,
                        width: "220px",
                        type: "normal",
                        title: "单价",
                    },
                    {
                        attribute: "content",
                        dontSort: true,
                        width: "220px",
                        type: "normal",
                        title: "备注",
                    },
                    {
                        attribute: "stock",
                        dontSort: true,
                        width: "220px",
                        type: "normal",
                        title: "库存",
                    },
                    {
                        attribute: "createTime",
                        dontSort: true,
                        type: "normal",
                        title: "创建时间",
                        width: "200px",
                    },
                    {
                        attribute: "updateTime",
                        dontSort: true,
                        type: "normal",
                        title: "更新时间",
                        width: "200px",
                    },
                ],
                searchModel: {
                    defaultSearchValue1: {
                        key: 'name',
                        label: '商品名称'
                    },
                    Import: {isneed: false, button: '自定义传入'},
                    Export: {isneed: false, button: '自定义传入'},
                    notNeedMoreQuery: true
                },
                modelP1: [],
                modelP: [
                    {modelP: 'title', type: 0, title: '名称', isRequired: true},
                    {modelP: 'href', type: 0, title: '链接', isRequired: true},
                ],
                modelPImg: [
                    {modelP: 'name', type: 0, title: '名称', isRequired: true},
                    {modelP: 'price', type: 0, title: '单价', isRequired: true},
                    {modelP: 'content', type: 0, title: '备注', isRequired: true},
                    {modelP: 'stock', type: 0, title: '库存', isRequired: true},
                    {modelP: 'type', type: 0, title: '类型', isRequired: true},
                    // {modelP: 'href', type: 0, title: '图片链接', isRequired: true},
                    {modelP: 'imgUrl', type: 'uploadImage', title: '图片', isRequired: true},
                ],
                form: {},
                title: '',
                arrDataParent: [],
                arrDataType: []
            }
        },
        components: {
            Crumb,
            Modal,
            Search,
            Table
        },
        mounted() {
            this.getLinksInfoData()
        },
        methods: {
            handleClick(tab, event) {
                this.getLinksInfoData();
            },
            changePage(v) {
                this.currentPage = v
                this.getLinksInfoData()
            },
            remove(data) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delShopList(data.id).then(res => {
                        if (res.code === 200) {
                            this.getLinksInfoData();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSizeChange(v, t) {
                this.limit = v
                this.getLinksInfoData()
            },
            // list数据
            getLinksInfoData() {
                let data = {
                    page: this.currentPage,
                    limit: this.limit,
                    ...this.queryDate
                };
                data.type = this.activeName;
                this.$http.getShopList(data).then(res => {
                    this.tableData = res.data;
                    this.total = res.total;
                });
            },
            // 新增触发
            addOne() {
                this.title = "添加";
                this.$set(this, "modelP1", this.modelP)
                if (this.activeName === 'img') {
                    this.$set(this, "modelP1", this.modelPImg)
                    this.title = "添加";
                }
                this.$set(this,'form',{businessType:'relatedLinksImg'});
                this.$set(this.form,'imgUrlList',[]);
                this.dialogFormVisible1 = true;
            },
            // 编辑触发
            edit(row) {
                this.title = "编辑";
                this.$set(this, "modelP1", this.modelP)
                this.form = JSON.parse(JSON.stringify(row));
                this.$set(this.form, 'imgUrlList', [])
                if (this.activeName === 'img') {
                    this.$set(this, "modelP1", this.modelPImg)
                    this.title = "编辑";
                    this.$set(this.form, 'imgUrlList', [{url: row.imgUrl}])
                    this.form.businessType='relatedLinksImg';
                }
                this.dialogFormVisible1 = true;
            },
            // 查询触发
            exeQuery(e) {
                this.currentPage = 1;
                this.queryDate = e;
                this.getLinksInfoData();
            },
            // 取消或关闭
            handlerClose() {
                this.dialogFormVisible1 = false;
                this.form1 = {};
                this.form = {};
            },
            // 保存
            handlerSure(data) {
                this.save(data)
            },
            save(val) {
                if (val.name == null || val.name === '') {
                    this.$message({
                        message: '请填写名称！',
                        type: 'info'
                    });
                    return;
                }
                if (this.activeName === 'img' && (val.imgUrl == null || val.imgUrl === '')) {
                    this.$message({
                        message: '请上传图片！',
                        type: 'info'
                    });
                    return;
                }
                this.$delete(val, 'imgUrlList');
                this.$delete(val, 'businessType');
                this.$http.saveShop(val).then(res => {
                    if (res.code === 200) {
                        this.getLinksInfoData();
                        this.handlerClose();
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'info'
                        });
                    }
                });
            }
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

            .el-tabs__item {
                min-width: 150px !important
            }

            .moresearch {
                height: 110px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: 10px 0;
            }

            .el-table__row--level-0 {
                background-color: #f5f7fa !important;
            }

            .el-table__row--level-1 {
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
