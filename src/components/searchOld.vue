<template>
    <div class="search-container">
        <div class="search-container-top">
            <div class="search-container-top_basicChose">
                <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="85px">
                    <el-form-item class="formItem" v-for="(item,index) in moreSearch" :key="index" :label="item.label">
                        <el-select
                                clearable
                                class="selectbox" :ref="item.ref"
                                v-if="item.needSelect"
                                v-model="searchForm[item.key]" placeholder="请选择">
                            <el-option
                                    :placeholder="'请选择' + item.label"
                                    v-for="list in item.options"
                                    :key="list.value?list.value:list[item.opKey]"
                                    :label="list.label?list.label:list[item.opLabel]"
                                    :value="list.value?list.value:list[item.opKey]">
                            </el-option>
                        </el-select>
                        <el-date-picker
                                clearable
                                v-if="item.needDate"
                                v-model="searchForm[item.key]"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>

                        <el-input
                                clearable
                                v-if="!item.needSelect&&!item.needDate&&!item.needCascader"
                                v-model="searchForm[item.key]"></el-input>
                        <el-cascader v-if="item.needCascader"
                                     ref="cascader"
                                     clearable
                                     :placeholder="'请选择'+item.label"
                                     v-model="searchForm[item.key]"
                                     :options="item.options"
                                     :props="{ value:item.opKey,label:item.opLabel,emitPath: false,checkStrictly: true }"
                                     :show-all-levels="false"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="query">查询</el-button>
                        <el-button size="small" type="primary" @click="reset()">重置</el-button>
                        <el-button v-if="needAddBtn" class="addBtn" size="small" type="primary" @click="creatProject">新增</el-button>
                        <el-button v-if="needInitMenuBtn" class="primary" size="small" type="primary" @click="InitMenu">初始化商户菜单</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                searchForm: {},
            }
        },
        props: {
            moreSearch: {
                type: Array,
                default: () => []
            },
            needAddBtn:{
                type:Boolean,
                default:true
            },
            needInitMenuBtn:{
                type:Boolean,
                default:false
            }
        },
        beforeUpdate() {
            this.$forceUpdate()
        },
        methods: {
            creatProject() {
                this.$emit('creatProject')
            },
            reset(formName) {
                this.searchForm = {};

            },
            InitMenu(){
                this.$emit('initMenu')
            },
            query() {
                this.$emit('query', this.searchForm)
            }
        },

    }
</script>
<style lang="less">
    .search-container {
        width: 100%;
        height: 100%;
        .selectbox {
            width: 200px !important;
            width: 100% !important;
        }
        .el-form-item {
            margin-bottom: 0;
            display: flex;
            align-items: center;
            // justify-content: center;
        }
        .el-input__inner {
            border-radius: 0 !important;
            height: 34px;
            width: 200px;
            width: 100%;
            font-size: 12px;
        }
        .el-form--inline .el-form-item__label {
            display: inline;
            height: 34px;
            min-width: 80px !important;
            background: linear-gradient(to bottom, #ffffff, #eeeeee);
            border: 1px solid #cfdadd;
            border-right: none;
            padding: 0;
            text-align: center;
            line-height: 32px;
            border-bottom-left-radius: 2px;
            border-top-left-radius: 2px;
            float: left;
            font-size: 12.5px;
            box-sizing: border-box;
        }
        .el-input--suffix{
            display: flex;
        }
        .el-form-item__content {
            line-height: 31px;
            font-size: 12px;
        }
        .el-button + .el-button {
            margin-left: 5px;
            border-radius: 1.5px;
        }
        &-top {
            width: 100%;
            height: 100%;
            &_basicChose {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding-bottom: 10px;
                form {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    .el-form-item {
                        width: 25%;
                        height: 34px;
                        padding-top: 10px;
                        margin-right: 0;
                        display: flex;
                        .el-form-item__label {
                            background-color: #F5F5F5;
                        }
                        .addBtn {
                            background-color: #27c24c;
                            border-color: #27c24c;
                        }
                        .addBtn:hover {
                            opacity: 0.5;
                        }
                    }
                }
            }
        }
        &-notop {
            width: 100%;
            height: 50%;
            display: flex;
            // align-items: center;
            justify-content: flex-start;
        }
        &-bottom {
            width: 100%;
            height: 50%;
            display: flex;
            // align-items: center;
            justify-content: flex-start;
        }
    }

</style>


