<template>
    <div class="menu-box">
        <div class="Crumb">
            <Crumb></Crumb>
        </div>
        <div class="table-box">
                    <Modal :dialogFormVisible='dialogFormVisible1' title="菜单管理" v-on:ListenChild='hidden1'
                           v-on:ListenChild1='sureSave1' :form='form1' :modelP='modelP1'/>
                    <!-- <div style="width:100%;height:40px" class="addone"><el-button style="float:right" type="primary" size="small" @click="addOne">新建菜单</el-button></div> -->
                    <el-tree ref="trees"
                             :check-on-click-node="true"
                             :expand-on-click-node="false"
                             @check-change="getCheckedNodes"
                             :data="data"
                             node-key="uid"
                             :default-expand-all="true"
                             :props="props"
                    >
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>
                                <el-button
                                        type="danger"
                                        class="editBtn"
                                        icon="iconfont icon-dangjian_zengjia"
                                        plain
                                        size="mini"
                                        @click="addChild(node, data)">
                                </el-button>
                                <el-button
                                        type="danger"
                                        class="editBtn"
                                        icon="iconfont icon-dangjian_xiugai"
                                        plain
                                        size="mini"
                                        @click="editorNode(node, data)">
                                </el-button>
                                <el-button
                                        v-if='data.pid!=0'
                                        type="danger"
                                        class="editBtn"
                                        icon="iconfont icon-dangjian_shanchu"
                                        plain
                                        size="mini"
                                        @click="() => remove(node, data)">
                                        <!-- {{node}} -->
                                </el-button>
                            </span>
                        </span>
                    </el-tree>
        </div>
    </div>
</template>
<script>
    import Crumb from '@/components/crumb.vue'
    import Modal from '@/components/modal.vue'
    export default {
        data() {
            return {
                data: [],
                dialogFormVisible1: false,
                form1: {},
                modelP1: [
                    {modelP: 'name', type: 0, title: '名称',isRequired:true},
                    {modelP: 'path', type: 0, title: '路径',isRequired:true},
                    {modelP: 'sort', type: 0, title: '排序',isRequired:true},
                    {modelP: 'hidden', type: 1, title: '是否启用', val: [{label: '是', value: 0}, {label: '否', value: 1}],isRequired:true}
                ],
                props: {label: 'label', children: 'children'}
            }
        },
        components: {
            Crumb,
            Modal,
        },
        mounted() {
            this.getMenuData()
        },
        methods: {
            remove(node, data) {
                this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.DeletMenuById(data.uid).then(res => {
                        if (res.code === 200) {
                            this.getMenuData();
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
            getCheckedNodes(val) {
            },
            getMenuData() {
                this.$http.QueryMenu().then((res) => {
                    this.data = res;
                })
            },
            addOne() {
                this.dialogFormVisible1 = true;
            },
            hidden1() {
                this.dialogFormVisible1 = false;
                this.form1 = {}
            },
            addChild(i, j) {
                this.addOne();
                this.form1.parentId = j.uid
            },
            editorNode(i, j) {
                this.addOne();
                this.$http.QueryMenuById(j.uid)
                    .then(res => {
                        this.form1 = res
                    })
            },
            sureSave1(val) {
                if (val.name == null) {
                    this.$message({
                        type: 'info',
                        message: '请填写菜单名称!'
                    });
                    return;
                }
                if (val.path == null) {
                    this.$message({
                        type: 'info',
                        message: '请填写路径!'
                    });
                    return;
                }
                if (val.sort == null) {
                    this.$message({
                        type: 'info',
                        message: '请填写排序号!'
                    });
                    return;
                } else if (!/^\d+$|^\d+[.]?\d+$/.test(val.sort)) {
                    this.$message({
                        type: 'info',
                        message: '排序号只能是数字!'
                    });
                    return;
                }
                if (val.hidden == null) {
                    this.$message({
                        type: 'info',
                        message: '请选择是否启用!'
                    });
                    return;
                }
                this.$http.AddMenu(val)
                    .then(res => {
                        if (res.code === 200) {
                            this.hidden1();
                            this.getMenuData();
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
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
            padding-top: 30px;
            width: 100%;
            min-height: 93%;
            box-sizing: border-box;
            background-color: #ffffff;
            box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.3);
            border-radius: 4px 4px 0px 0px;
            border: solid 1px #dcdcdc;
            padding: 10px 20px;

            .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                background-color: #AF413B;
                border-color: #AF413B;
            }

            .el-tree-node__label {
                white-space: pre-wrap !important;
                outline: 0;
            }

            .el-tree-node__content {
                display: flex;
                height: 35px;
                align-items: flex-start;

                .el-tree-node__label {
                    font-size: 20px;
                    color: #333333;

                }
            }

            .el-tree-node__children {
                margin-top: 20px;

                .el-tree-node {
                    // is-focusable
                    .el-tree-node__content {
                        height: 35px;

                        .el-tree-node__label {
                            display: flex;
                            align-items: flex-start;
                            font-size: 18px;
                            color: #666666;
                        }
                    }

                    .is-checked {
                        color: #333333;
                    }
                }
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

        .editBtn {
            border: none;
            background-color: inherit;
            color: #666666;

            i {
                font-size: 22px;
            }
        }

        .editBtn:hover {
            color: #2a58ad;
            background-color: #F5F7FA;

            i {
                font-size: 24px;
            }
        }
    }
</style>