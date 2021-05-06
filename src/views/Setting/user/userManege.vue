<template>
    <div class="user_container-box">
        <div class="Crumb">
            <Crumb></Crumb>
        </div>
        <div class="table-box">
            <Modal :options='options' :dialogFormVisible='dialogFormVisible1' title="用户管理" v-on:ListenChild='hidden1'
                   v-on:ListenChild1='sureSave1' :form='form' :modelP='modelP1'/>
            <div :class="isClickMoreQuery?'moresearch':'searchbox'">
                <Search
                :model='searchModel'
                v-on:exeQuery="exeQuery"
                :moreSearch='moreSearch'
                v-on:creatProject='addOne'
                v-on:moreQuery='moreQuery'/>
           </div>
            <Table
                v-on:delet="deleTClick1"
                v-on:edit="handleClick1"
                :Tpage="Tpage"
                v-on:changePage="changePage"
                v-on:handleSizeChange="handleSizeChange"
                :tableModel="tableModel"
                :tableData="tableData"
            />
        </div>
    </div>
</template>
<script>
    import Crumb from '@/components/crumb.vue'
    import Search from '@/components/search.vue'
    import Table from '@/components/BusinessTable.vue'
    import Modal from '@/components/modal.vue'

    export default {
        data() {
            return {
                paryMemberList: [],
                tableData: [],
                dialogFormVisible1: false,
                options: [],
                pageSize: 5,
                currentPage: 1,
                queryDate: {},
                isClickMoreQuery: false,
                searchModel: {
                    defaultSearchValue1: {
                        key: 'username',
                        label: '用户名'
                    },
                    defaultSearchValue2: {
                        key: 'nickname',
                        label: '姓名'
                    },
                    Import: {isneed: false, button: '自定义传入'},
                    Export: {isneed: false, button: '自定义传入'}
                },
                moreSearch: [
                    {
                        key: 'mobile',
                        label: '电话'
                    },
                ],
                modelP1: [
                    {modelP: 'username', type: 0, title: '用户名',isRequired:true},
                    {modelP: 'nickname', type: 0, title: '姓名',isRequired:true},
                    {modelP: 'isAdmin', type: 1, title: '是否管理员', val: [{label: '是', value: 1}, {label: '否', value: 0}],isRequired:true},
                    {modelP: 'mobile', type: 0.1, min:1, title: '电话'},
                    {modelP: 'birthday', type: 4, min:1, title: '生日'},
                    {modelP: 'roles', type: 2, title: '角色', roles: {value: 'id', label: 'name', multiple: true},isRequired:true},
                ],
                tableModel: [
                    {
                        attribute: "username",
                        width: 200,
                        dontSort: true,
                        type: "normal",
                        title: "用户名"
                    },
                    {
                        attribute: "nickname",
                        dontSort: true,
                        type: "normal",
                        title: "姓名"
                    },
                    {
                        attribute: "birthday",
                        dontSort: true,
                        type: "normal",
                        title: "生日"
                    },
                    {
                        attribute: "isAdmin",
                        width: 80,
                        dontSort: true,
                        type: "dict",
                        title: "是否管理员",
                        opKey: 'value',
                        opName: 'label',
                        dictList: [
                            {label: '是', value: 1}, {label: '否', value: 0}
                        ]
                    },
                    {
                        attribute: "mobile",
                        dontSort: true,
                        type: "normal",
                        title: "电话"
                    },
                    {
                        attribute: "roles",
                        dontSort: true,
                        type: "Multiple",
                        title: "角色",
                        opKey: 'value',
                        opName: 'label',
                        MultipleKey: 'roles'
                    }
                ],
                form: {},
                Tpage: 0,
            }
        },
        components: {
            Crumb,
            Search,
            Table,
            Modal
        },
        mounted() {
            this.getParyMemberList()
            this.getUserList(null)
            this.getRoleList()
        },
        methods: {
            moreQuery() {
                this.isClickMoreQuery = !this.isClickMoreQuery
            },
            handleSizeChange(v) {
                this.currentPage = 0;
                this.pageSize = v;
                this.getUserList();
            },
            getParyMemberList() {

            },
            getUserList() {
                let data = {
                    params: {
                        page: this.currentPage,
                        limit: this.pageSize,
                        ...this.queryDate
                    }

                };
                this.$http.QueryUserList(data)
                    .then(res => {
                        if (res.code === 200) {
                            this.tableData = res.data;
                            this.Tpage = res.total
                        }
                    })
            },
            getRoleList() {
                let data = {
                    page: 0,
                    limit: 100000
                };
                this.$http.QueryRoleList(data)
                    .then(res => {
                        if (res.code === 200) {
                            this.options = res.data
                        }
                    })
            },
            addOne() {
                this.dialogFormVisible1 = true;
                this.form = {}
            },
            goSearch() {

            },
            changePage(v) {
                this.currentPage = v;
                this.getUserList()
            },
            handleClick1(row) {
                this.dialogFormVisible1 = true;
                this.$http.QueryUserById(row.id).then(res => {
                        this.form = res;
                        if (this.form.roles) {
                            this.form.roles = this.form.roles.map((item) => {
                                return item = [item.id]
                            })
                        }
                    })
            },
            deleTClick1(row) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.DeletUserById(row.id).then(res => {
                        if (res.code === 200) {
                            this.getUserList();
                            this.$message({
                                type: 'info',
                                message: '删除成功!'
                            });
                            return;
                        }
                        this.$message({
                            type: 'info',
                            message: res.msg
                        });
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
                if (val.username == null) {
                    this.$message({
                        type: 'info',
                        message: '请填写用户名!'
                    });
                    return;
                }
                if (val.nickname == null) {
                    this.$message({
                        type: 'info',
                        message: '请填写姓名!'
                    });
                    return;
                } else if (!/^[\u4e00-\u9fa5]{0,}$/.test(val.nickname)) {
                    this.$message({
                        type: 'info',
                        message: '姓名只能是汉字!'
                    });
                    return;
                }
                if (val.isAdmin == null) {
                    this.$message({
                        type: 'info',
                        message: '请选择是否为管理员!'
                    });
                    return;
                }
                if (val.mobile == null) {
                    this.$message({
                        type: 'info',
                        message: '请填写电话号码!'
                    });
                    return;
                } else if (!/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(val.mobile)) {
                    this.$message({
                        type: 'info',
                        message: '请正确填写电话号码!'
                    });
                    return;
                }
                if (val.roles) {
                    val.roles = val.roles.map((item) => {
                        item = {...item};
                        return item

                    })
                }
                let keyMap = {
                    "0": "id"
                };
                for (let i = 0; i < val.roles.length; i++) {
                    let obj = val.roles[i];
                    for (let key in obj) {
                        let newKey = keyMap[key];
                        if (newKey) {
                            obj[newKey] = obj[key];
                            delete obj[key];
                        }
                    }
                }
                this.$http.saveUser(val)
                    .then(res => {
                        if (res.code === 200) {
                            this.getUserList();
                            this.hidden1();
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                        }
                    })
            },
            //查询回调
            exeQuery(data) {
                this.currentPage = 0;
                this.queryDate = data;
                this.getUserList()
            }
        },
    }
</script>
<style lang="less" scoped>
    .user_container-box {
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
                margin-bottom: 10px;
            }
        }
    }
</style>