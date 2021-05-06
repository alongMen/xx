<template>
    <div class="CcbTenant-box">
        <div class="Crumb">
            <Crumb></Crumb>
        </div>
        <div class="table-box">
            <div class="rightContent">
                <div :class="isClickMoreQuery?'moresearch':'searchbox'">
                    <Search
                            :model="searchModel"
                            :options="options"
                            v-on:exeQuery="exeQuery"
                            :moreSearch="moreSearch"
                            v-on:creatProject="handleAdd"
                            v-on:moreQuery="moreQuery"
                            v-on:exportEvent="handleAudit"
                            v-on:importEvent="handleNoAudit"
                    />
                </div>
                <div class="content-box">
                    <Modal
                            :title="title"
                            :form="form"
                            :options="options"
                            ref="formModel"
                            :filePreviewList="filePreviewList"
                            :templateTypes="templateTypes"
                            v-on:cancelModel="cancelModel"
                            v-on:save="save"
                            :dialogFormVisible="dialogFormVisible"
                    />
                    <Table
                            v-on:delet="deleteClick"
                            v-on:edit="handleEditClick"
                            :needMultiple="true"
                            :PSize="pageSize"
                            :needMoreOperation="true"
                            :buttonExpands="buttonExpands"
                            :tableEditText="'编辑'"
                            @clickMoreBtnGroup="clickMoreBtnGroup"
                            @handleSelectionChangeOther="handleSelectionChangeOther"
                            :Tpage="total"
                            @editTop="editTop"
                            v-on:changePage="changePage"
                            v-on:handleSizeChange="handleSizeChange"
                            :tableModel="tableModel"
                            :tableData="tableData"
                    />
                    <Preview
                            :title="title"
                            :articleId="articleId"
                            @cancelModel="cancelModel"
                            :dialogPreviewVisible="dialogPreviewVisible"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Crumb from "@/components/crumb.vue";
    import Table from "@/components/BusinessTable.vue";
    import Search from "@/components/search.vue";
    import Modal from "@/views/articleManage/form/detail.vue";
    import Preview from "@/views/articleManage/form/preview.vue";

    export default {
        data() {
            return {
                tableData: [],
                disableForm: false,
                title: "审核查看",
                tableEditText: "审核查看",
                form: {},
                userInfo: {},
                templateTypes: [],
                options: [],
                total: 0,
                pageSize: 5,
                currentPage: 0,
                queryDate: {},
                needRemove: true,
                isClickMoreQuery: false,
                dialogFormVisible: false,
                dialogFormSyncVisible: false,
                dialogPreviewVisible: false,
                articleId: '',
                formModel: "",
                tableType: 'index',
                inColumnList: [],
                searchModel: {
                    defaultSearchValue1: {
                        key: "title",
                        label: "标题"
                    },
                    defaultSearchValue3: {
                        key: "columnInfoId",
                        label: "栏目名称",
                        options: [],
                    },
                    isTop: {isneed: false, button: "顶置"},
                    IsBottom: {isneed: false, button: "取消顶置"},
                    Import: {isneed: false, button: '审核不通过'},
                    Export: {isneed: false, button: '审核通过'},
                },
                tableModel: [
                    {
                        attribute: "title",
                        width: 200,
                        dontSort: true,
                        type: "normal",
                        title: "标题"
                    },
                    {
                        attribute: "columnName",
                        width: 120,
                        dontSort: true,
                        // type: "obj",
                        title: "栏目"
                    },
                    {
                        attribute: "author",
                        width: 120,
                        dontSort: true,
                        type: "normal",
                        title: "作者"
                    },
                    {
                        attribute: "source",
                        width: 120,
                        dontSort: true,
                        type: "normal",
                        title: "来源"

                    },
                    {
                        attribute: "viewCount",
                        width: 80,
                        dontSort: true,
                        type: "normal",
                        title: "浏览数"
                    },
                    {
                        attribute: "occurrenceTime",
                        width: 150,
                        dontSort: false,
                        type: "normal",
                        title: "发生时间"
                    },
                    {
                        attribute: "publicationDate",
                        width: 150,
                        dontSort: false,
                        type: "normal",
                        title: "管理时间"
                    },

                    {
                        attribute: "isTop",
                        width: 80,
                        dontSort: true,
                        type: "isTop",
                        title: "是否顶置"
                    },
                    {
                        attribute: "isAudit",
                        width: 80,
                        dontSort: true,
                        type: "dict",
                        title: "状态",
                        opKey: 'value',
                        opName: 'label',
                        dictList: [
                            {'value': "0", "label": "审核中"},
                            {'value': "1", "label": "已审核"},
                            {'value': "2", "label": "已管理"},
                            {'value': "3", "label": "撤回"},
                        ]
                    }
                ],
                moreSearch: [
                    {
                        key: "startTime",
                        label: "开始时间",
                        needDate: true
                    },
                    {
                        key: "endTime",
                        label: "结束时间",
                        needDate: true
                    },
                    {
                        key: "author",
                        label: "作者",

                    }
                ],
                modalP: [
                    {
                        title: "栏目名称",
                        modelP: "columnInfoId",
                        opKey: 'id',
                        opLabel: 'name',
                        roles: {value: 'id', label: 'name', emitPath: false, checkStrictly: true},
                        type: 2,
                        required: true
                    }
                ],
                selectTable: [],
                filePreviewList: [],
                syncArticleId: '',
                buttonExpands: [
                    {
                        text: '预览',
                        itemType: '',
                        event: 'preview'
                    }
                ]

            }
        },
        components: {
            Crumb,
            Search,
            Table,
            Modal,
            Preview,
        },
        mounted() {
            let auth = window.localStorage.getItem("userAuthData");
            let flag = auth.indexOf("audit-article") !== -1;
            this.$set(this.searchModel, "Import", {
                isneed: flag,
                button: "审核不通过"
            });
            this.$set(this.searchModel, "Export", {
                isneed: flag,
                button: "审核通过"
            });
            let arr = [
                {
                    text: '预览',
                    itemType: '',
                    event: 'preview'
                }
            ]
            if (flag) {
                arr.push({
                    text: '管理',
                    itemType: '',
                    event: 'push'
                });
                arr.push({
                    text: '撤回',
                    itemType: '',
                    event: 'recall'
                });
            }
            this.$set(this, "buttonExpands", arr)
            this.searchArticleList();
            this.queryColumnInfoList();
        },
        methods: {
            //监听按钮组事件并回调按钮事件
            clickMoreBtnGroup(row, item) {
                this[item.event](row)
            },
            push(row) {
                let data = [{
                    id: row.id,
                    isAudit: "2"
                }];
                this.saveList(data);
            },
            recall(row) {
                this.$confirm("此操作将会撤回智慧环保, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let data = [{
                        id: row.id,
                        isAudit: "3",
                        isSync: "0",
                    }];
                    this.saveList(data);
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消撤回"
                    });
                });
            },
            preview(row) {
                this.title = "智慧环保预览";
                this.articleId = row.id;
                this.dialogPreviewVisible = true;
            },
            handleNoAudit() {
                if (this.selectTable.length < 1) {
                    this.sendTips("请选择", "info");
                    return;
                }
                let data = this.selectTable.map(item => ({
                    id: item.id,
                    isAudit: "0"
                }));
                this.saveList(data);
            },
            handleAudit() {
                if (this.selectTable.length < 1) {
                    this.sendTips("请选择", "info");
                    return;
                }
                this.saveList(this.selectTable);
            },
            saveList(data) {
                this.$http.addCmsArticleList(data).then(res => {
                    if (res.code !== 200) {
                        this.$message.error(res.msg);
                    } else {
                        this.form = {};
                        this.currentPage = 0;
                        this.$message.success(res.msg);
                        this.searchArticleList();
                    }
                });
            },
            handleSelectionChangeOther(data) {
                this.selectTable = data;
            },
            queryColumnInfoList() {
                let data = {};
                this.$http.queryColumnInfo(data).then(resp => {
                    if (resp.code === 200) {
                        this.options = JSON.parse(JSON.stringify(resp.data));
                        this.searchModel.defaultSearchValue3 && this.$set(this.searchModel.defaultSearchValue3, 'options', this.options);
                    }
                });
            },
            //查询
            searchArticleList() {
                let data = {
                    page: this.currentPage,
                    limit: this.pageSize,
                    ...this.queryDate
                };
                this.$http.queryCmsArticlePage(data).then(res => {
                    this.tableData = [];
                    res.data.forEach(item => {
                        if (item.isSync === "1") {
                            // 已同步
                            item.isAudit = "4"
                        }
                        this.tableData.push(item);
                    })
                    this.total = res.total;
                });
            },
            //翻页
            changePage(v) {
                this.currentPage = v;
                this.searchArticleList();
            },
            handleSizeChange(v) {
                this.currentPage = 0;
                this.pageSize = v;
                this.searchArticleList();
            },
            handleAdd() {
                this.filePreviewList = [];
                this.title = "新增智慧环保";
                this.form = {
                    type: 0,
                    templateType: 0
                }
                this.dialogFormVisible = true;
            },
            moreQuery() {
                this.isClickMoreQuery = !this.isClickMoreQuery;
            },
            //查询回调
            exeQuery(data) {
                this.currentPage = 0;
                this.queryDate = data;
                this.searchArticleList();
            },
            save(data) {
                data.isSync = 0;
                this.$http.addCmsAticle(data).then(res => {
                    if (res.code !== 200) {
                        this.$message.error(res.msg);
                    } else {
                        this.dialogFormVisible = false;
                        this.form = {};
                        this.currentPage = 0;
                        this.searchArticleList();
                        this.$message.success(res.msg);
                    }
                });
            },

            editTop(data) {
                let top = {id: data.id, isTop: data.isTop};
                this.$http.addCmsAticle(top).then(res => {
                    this.searchArticleList();
                });
            },
            cancelModel() {
                this.form = {};
                this.dialogFormVisible = false;
                this.dialogPreviewVisible = false;
            },
            //查询
            handleEditClick(row) {
                this.title = "编辑智慧环保信息";
                // 设置图片数据
                this.filePreviewList = [];
                row.coverImageUrl && this.$set(this.filePreviewList, 0, {url: row.coverImageUrl, id: row['fileImgId']});
                this.form = JSON.parse(JSON.stringify(row));
                this.dialogFormVisible = true;
            },
            deleteClick(row) {
                this.$confirm("此操作将会删除记录, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$http.delCmsArticleById(row.id).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                type: "success",
                                message: "操作成功!"
                            });
                            this.currentPage = 0;
                            this.searchArticleList();
                        }
                        this.$message({
                            type: "info",
                            message: res.msg
                        });
                    });
                })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            sendTips(msg, type) {
                this.$message.closeAll();
                this.$message({
                    message: msg,
                    type: type
                });
            },

        }
    };
</script>
<style lang="less" scoped>
    .CcbTenant-box {
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
            box-sizing: border-box;
            background-color: #ffffff;
            box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.3);
            border-radius: 4px 4px 0px 0px;
            border: solid 1px #dcdcdc;
            padding: 15px;
            display: flex;

            .el-tabs {
                width: 100%;
            }

            .lefttree {
                width: 18%;
            }

            .rightContent {
                width: 100%;
                padding-left: 15px;

                .searchbox {
                    height: 60px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding: 10px 0;
                }

                .moresearch {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding: 10px 0;
                }
            }
        }
    }

    /*.el-dialog__body {*/
    /*  div:nth-child(1) {*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    display: flex;*/
    /*    align-items: center;*/
    /*    justify-content: center;*/
    /*  }*/
    /*}*/
</style>
