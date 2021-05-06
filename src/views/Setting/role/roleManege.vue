<template>
    <div class="roles-box">
        <div class="Crumb">
            <Crumb></Crumb>
        </div>
        <div class="table-box">
            <el-tabs>
                <el-tab-pane label="角色管理">
                    <div class="addone" style="float:right;margin-bottom:5px;height:40px;width:100%">
                        <Search :model='searchModal' :justNeedAdd='true' v-on:creatProject="addOne"/>

                    </div>
                    <Modal :dialogFormVisible='dialogFormVisible1' title="角色管理"
                           v-on:ListenChild='hidden1' v-on:ListenChild1='sureSave1' :form='form' :modelP='modelP'/>
                    <Table
                            :needMultiple='true'
                            v-on:delet="deleTClick"
                            v-on:edit="handleClick1"
                            v-on:changePage="changePage"
                            v-on:handleSizeChange="handleSizeChange"
                            v-on:choseWhich='choseWhich'
                            :tableModel="tableModel"
                            :tableData="tableData"
                            :Tpage='total'
                            :PSize='pageSize'
                    />
                </el-tab-pane>
            </el-tabs>
            <el-tabs style='margin-top:15px'>
                <el-tab-pane label="角色关联菜单">
                    <div style="width:100%;height:40px" class="addone">
                        <el-button style="float:right" type="primary" size="small" :disabled="!roleId" @click="OnSave">
                            保存
                        </el-button>
                    </div>
                    <el-tree
                            check-strictly
                            ref="trees"
                            :check-on-click-node="true"
                            @check-change="getCheckedNodes"
                            :data="data"
                            show-checkbox
                            node-key="uid"
                            default-expand-all
                            v-bind:default-checked-keys='defaultArray'
                    />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import Crumb from '@/components/crumb.vue'
    import Table from '@/components/BusinessTable.vue'
    import Modal from '@/components/modal.vue'
    import Search from '@/components/search.vue'

    export default {
        data() {
            return {
                tableData: [],
                data: [],
                tableModel: [
                    {
                        attribute: "code",
                        dontSort: true,
                        type: "normal",
                        title: "角色代码"
                    },
                    {
                        attribute: "name",
                        dontSort: true,
                        type: "normal",
                        title: "角色名"
                    }
                ],
                modelP: [
                    {modelP: 'name', type: 0, title: '角色名',isRequired:true}
                ],
                searchModal: {},
                form: {},
                dialogFormVisible1: false,
                defaultArray: [],
                roleId: '',
                pageSize: 5,
                currentPage: 1,
                total: ''
            }
        },
        components: {
            Crumb,
            Table,
            Modal,
            Search
        },
        mounted() {
            this.GetRoleList();
            this.getMenuData();
        },
        methods: {
            choseWhich(val) {
                this.defaultArray = [];
                this.getMenuData();
                if (!val) {
                    this.roleId = null;
                    return;
                }
                this.roleId = val.id;
                this.$http.QueryMenuByRoleId(val.id).then(res => {
                    if (res) {
                        this.defaultArray = res.map((item) => {
                            return item.id
                        })
                    } else {
                        this.defaultArray = []
                    }

                });
            },
            changePage(val) {
                this.currentPage = val;
                this.GetRoleList();
            },
            OnSave() {
                let data = {
                    roleId: this.roleId,
                    menuIds: this.defaultArray
                };
                this.$http.GiveMenuByRole(data).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '保存成功！',
                            type: 'success'
                        });
                    }
                })
            },
            getMenuData() {
                this.$http.QueryMenu().then((res) => {
                    this.data = res
                })
            },
            handleSizeChange(v) {
                this.currentPage = 1;
                this.pageSize = v;
                this.GetRoleList();
            },
            getCheckedNodes(val) {
                let array = this.$refs.trees.getCheckedNodes()
                array = array.map((item) => {
                    item = item.uid
                    return item
                })
                this.defaultArray = array
            },
            GetRoleList() {
                let data = {
                    page: this.currentPage,
                    limit: this.pageSize
                };
                this.$http.QueryRoleList(data).then(res => {
                    this.tableData = res.data;
                    this.total = res.total
                })
            },
            addOne() {
                this.form = {}
                this.dialogFormVisible1 = true
            },
            handleClick1(row) {
                this.addOne()
                this.$http.QueryRoleById(row.id).then(res => {
                    this.form = res
                })
            },
            deleTClick(row) {
                this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.DeletRoleById(row.id).then(res => {
                        if (res.code === 200) {
                            this.GetRoleList()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        } else {
                            this.$message({
                                type: 'info',
                                message: res.msg
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
            hidden1() {
                this.dialogFormVisible1 = false
            },
            sureSave1(val) {
                if (val.name == null) {
                    this.$message({
                        type: 'info',
                        message: '请填写角色名称!'
                    });
                    return;
                }
                this.$http.saveRole(val)
                    .then(res => {
                        if (res.code === 200) {
                            this.GetRoleList()
                            this.hidden1()
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                        }
                    })
            }
        },
    }
</script>
<style lang="less">
    .roles-box {
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
            padding: 10px 20px;
        }

        .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: #2a58ad;
            border-color: #2a58ad;
        }

        .el-tree-node__label {
            white-space: pre-wrap !important;
            outline: 0;
        }

        .el-tree-node__content {
            display: flex;
            align-items: flex-start;

            .el-tree-node__label {
                font-size: 16px;
                color: #333333;

            }
        }

        .el-tree-node__children {
            margin-top: 20px;

            .el-tree-node {
                // is-focusable
                .el-tree-node__content {
                    .el-tree-node__label {
                        display: flex;
                        align-items: flex-start;
                        font-size: 15px;
                        color: #666666;
                    }
                }

                .is-checked {
                    color: #333333;
                }
            }
        }

        .el-checkbox {
            margin-bottom: 0 !important;
        }
    }
</style>