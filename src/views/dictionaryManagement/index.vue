<template>
    <div class="dictionnary-container">
        <div class="Crumb">
            <Crumb></Crumb>
        </div>

        <div class="diretionary-box">
            <el-tabs>
                <el-tab-pane label="字典类型管理">
                    <div class="diretionary-box_tabone">
                        <div style='margin-bottom:10px'>
                            <Search :model='searchModel' v-on:exeQuery='exeQuery'  v-on:creatProject='creatProject'/>
                        </div>
                        <div class="diretionary-box_tabone-table">
                            <Tabel
                                    :tableModel='tableModel'
                                    :tableData='tableData'
                                    v-on:edit='edit'
                                    :needOperation="true"
                                    :tableOperationText="'编辑字典'"
                                    :Tpage="total"
                                    :PSize='pageSize'
                                    v-on:clickBtnGroup='openApp'
                                    v-on:handleSizeChange='handleSizeChange'
                                    v-on:changePage='handleCurrentChange'
                                    v-on:delet='delet'/>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-tabs v-show="isShowTable">
                <el-tab-pane label="字典数据管理">
                    <div class="userList-container_list">
                        <div style='margin-bottom:10px'>
                            <Search ref="searchTwo" :model='search2' v-on:exeQuery='query2'
                                    v-on:creatProject='creatProject2'/>
                        </div>
                        <div class="userList-container_list-table">
                            <Tabel
                                    :tableModel='tableModel2'
                                    :tableData='tableData2'
                                    v-on:edit='edit2'
                                    :Tpage="total2"
                                    :PSize='pageSize2'
                                    v-on:handleSizeChange='handleSizeChange2'
                                    v-on:changePage='handleCurrentChange2'
                                    v-on:delet='delet2'/>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>


        <Modal
                :title="'字典类型管理'"
                :model='model'
                :modelForm='form'
                :isShowModal='isShowModal'
                v-on:modalCancel='modalCancel'
                v-on:modalSure='modalSure'/>
        <Modal
                :title="'字典数据管理'"
                :model='model2'
                :modelForm='form2'
                :isShowModal='isShowModal2'
                v-on:modalCancel='modalCancel2'
                v-on:modalSure='modalSure2'/>
    </div>
</template>
<script>

    import Crumb from '@/components/crumb.vue'
    import Search from "@/components/search.vue"
    import Tabel from "@/components/BusinessTable.vue"
    import Modal from "@/components/modalOld.vue"

    export default {
        data() {
            return {
                isShowModal: false,
                isShowModal2: false,
                isShowTable: false,
                queryDate: {},
                queryDate2: {},
                dictType: "",
                form: {},
                form2: {},
                total: 0,
                total2: 0,
                pageSize: 5,
                pageSize2: 5,
                currentPage: 0,
                currentPage2: 0,
                model: [
                    {
                        label: '类别名称',
                        key: 'name',
                        required: true
                    },
                    {
                        label: '类别编码',
                        key: 'code',
                        required: true,
                    }
                ],
                model2: [
                    {
                        label: '字典类别',
                        key: 'dictType',
                        required: true
                    },
                    {
                        label: '字典名称',
                        key: 'dictName',
                        required: true,
                    },
                    {
                        label: '字典值',
                        key: 'code',
                        required: true,
                    },
                    {
                        label: '排序',
                        key: 'sort',
                        required: false
                    }
                ],
                searchModel: {
                    defaultSearchValue1: {
                        key: 'name',
                        label: '类别名称'
                    },
                    defaultSearchValue2: {
                        key: 'code',
                        label: '类别编码',
                    },
                    notNeedMoreQuery: true,
                    Import: {isneed: false, button: '自定义传入'},
                    Export: {isneed: false, button: '自定义传入'}
                },
                tableModel: [
                    {
                        attribute: 'name',
                        title: '类别名称',
                        dontSort: false,
                        type: 'normal'
                    },
                    {
                        attribute: 'code',
                        title: '类别编码',
                        dontSort: false,
                        type: 'normal'
                    }
                ],
                search2: {
                    defaultSearchValue1: {
                        key: 'dictName',
                        label: '字典名称'
                    },
                    notNeedMoreQuery: true,
                    Import: {isneed: false, button: '自定义传入'},
                    Export: {isneed: false, button: '自定义传入'}
                },
                tableModel2: [
                    {
                        attribute: 'dictName',
                        title: '字典名称',
                        dontSort: false,
                        type: 'normal'
                    },
                    {
                        attribute: 'code',
                        title: '字典值',
                        dontSort: false,
                        type: 'normal'
                    }
                ],
                tableData: [],
                tableData2: []
            }
        },
        components: {
            Crumb,
            Search,
            Tabel,
            Modal
        },
        mounted() {
            this.queryDictionaryTypeList()
        },
        methods: {
            //查询按钮回调
            exeQuery(data) {
                this.queryDate = data;
                this.pageSize = 5;
                this.currentPage = 0;
                this.queryDictionaryTypeList();
            },
            //数据字典查询按钮回调
            query2(data) {
                this.queryDate2 = data;
                this.pageSize2 = 5;
                this.currentPage2 = 0;
                this.queryDictionaryList();
            },
            //新增按钮回调函数打开模态框
            creatProject() {
                this.isShowModal = true
            },
            //新增按钮回调函数打开字典数据模态框
            creatProject2() {
                this.isShowModal2 = true
                this.form2.dictType = this.dictType;
            },
            //监听按钮组事件并回调按钮事件
            clickBtnGroup(row, item) {
                this[item.event](row)
            },
            //编辑字典数据按钮
            openApp(row) {
                this.isShowTable = true;
                this.dictType = row.code;
                this.$refs.searchTwo.searchForm = {}
                this.queryDictionaryList();
            },
            //获取table数据源
            queryDictionaryTypeList() {
                let that = this;
                let data = {
                    limit: that.pageSize,
                    page: that.currentPage,
                    ...that.queryDate
                };
                this.$http.queryDictionaryTypeList(data).then(
                    resp => {
                        this.tableData = resp.data;
                        this.total = resp.total
                    }
                )
            },
            //获取字典数据table数据源
            queryDictionaryList() {
                let that = this;
                let data = {
                    limit: that.pageSize2,
                    page: that.currentPage2,
                    dictType: that.dictType,
                    ...that.queryDate2
                };
                this.$http.queryDictionaryList(data).then(
                    resp => {
                        this.tableData2 = resp.data;
                        this.total2 = resp.total
                    }
                )
            },
            //改变表格显示条数
            handleSizeChange(v) {
                this.currentPage = 0
                this.pageSize = v
                this.queryDictionaryTypeList()
            },
            //改变字典数据表格显示条数
            handleSizeChange2(v) {
                this.currentPage2 = 0
                this.pageSize2 = v
                this.queryDictionaryList()
            },
            //页码变换重新获取列表数据
            handleCurrentChange(v) {
                this.currentPage = v
                this.queryDictionaryTypeList()
            },
            //页码变换重新获取列表数据
            handleCurrentChange2(v) {
                this.currentPage2 = v
                this.queryDictionaryList()
            },
            //确认按钮回调函数
            modalSure(e) {
                this.$http.addDictionaryType(e).then(resp => {
                        if (resp.code == 200) {
                            this.queryDictionaryTypeList()
                            this.sendTips(resp.msg, 'success')
                            this.modalCancel()
                            this.resetForm()
                            this.getAllDictionaryType()
                        } else {
                            this.$message({
                                type: 'error',
                                message: resp.msg
                            });
                        }
                    }
                )
            },
            //字典数据确认按钮回调函数
            modalSure2(e) {
                this.$http.addDictionary(e).then(
                    resp => {
                        if (resp.code == 200) {
                            this.queryDictionaryList()
                            this.sendTips(resp.msg, 'success')
                            this.modalCancel2()
                            this.resetForm()
                            this.getAllDictionaryType()
                        }
                    }
                )
            },
            //重置form为空
            resetForm() {
                this.form = {};
                this.form2 = {};
            },
            //提示函数msg为提示消息，type为提示类型：'success'成功;'warning'警告;'error'错误
            sendTips(msg, type) {
                this.$message({
                    message: msg,
                    type: type
                });
            },
            //取消按钮回调函数，隐藏模态框
            modalCancel() {
                this.isShowModal = false
                this.resetForm()
            },
            //取消按钮回调函数，隐藏模态框
            modalCancel2() {
                this.isShowModal2 = false
                this.resetForm()
            },
            //编辑查看
            edit(e) {
                this.$http.queryDictionaryTypeById(e.id).then(
                    resp => {
                        if (resp.data) {
                            this.form = resp.data
                            this.creatProject()
                        }
                    }
                )
            },
            //字典数据编辑查看
            edit2(e) {
                this.$http.queryDictionaryById(e.id).then(
                    resp => {
                        if (resp.data) {
                            this.form2 = resp.data
                            this.creatProject2()
                        }
                    }
                )
            },
            //删除
            delet(e) {
                this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.deletDictionaryType(e.id).then(
                        resp => {
                            if (resp.code == 200) {
                                this.queryDictionaryTypeList()
                                this.isShowTable = false
                                this.sendTips(resp.msg, 'success')
                            }
                        }
                    )
                })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            },
            //删除字典数据
            delet2(e) {
                this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.deletDictionary(e.id).then(
                        resp => {
                            if (resp.code == 200) {
                                this.queryDictionaryList()
                                this.sendTips(resp.msg, 'success')
                            }
                        }
                    )
                })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            },
            //缓存数据字典
            getAllDictionaryType() {
                this.$http.getAllDictionaryType().then(
                    resp => {
                        if (resp != null) {
                            resp.map((item, index) => {
                                window.localStorage.setItem('store', JSON.stringify(resp))
                                this.$http.getDictionarysByDictType(item.code).then(
                                    dicResp => {
                                        let midValue = []
                                        dicResp.data.map((dicItem, dicIndex) => {
                                            midValue[dicIndex] = {
                                                dictName: dicItem.dictName,
                                                code: dicItem.code
                                            }
                                        })
                                        window.localStorage.setItem(item.code, JSON.stringify(midValue))
                                    }
                                )
                            })
                        }

                    }
                )
            }
        }
    }
</script>
<style lang="less">
    .dictionnary-container {
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        .Crumb {
            width: 100%;
            height: 50px;
            box-sizing: border-box;
        }
        .diretionary-box {
            width: 100%;
            min-height: 93%;
            box-sizing: border-box;
            background-color: #ffffff;
            box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.3);
            border-radius: 4px 4px 0px 0px;
            border: solid 1px #dcdcdc;
            padding:10px 20px;
            background-color: #ffffff;
            .addone {
                button {
                    float: right;
                    margin-right: 10px;
                }
            }
        }
    }

    // .el-dialog__headerbtn {
    //     display: none !important;
    // }

</style>
