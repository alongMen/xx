<template>
    <div class="tabel-container">
        <el-table
                :data="tableData"
                style="width: 100%"
                :border="true"
                :default-sort="{prop: 'date', order: 'descending'}"
                @row-dblclick="dbClick"
                @cell-click="previewImg"
        >
            <template>
                <el-table-column
                        show-overflow-tooltip
                        v-for="(item,index) in tableModel"
                        :key='index'
                        :prop="item.attribute"
                        :width="item.width?item.width:''"
                        align="center"
                        :sortable='!item.dontSort'
                        :label="item.title">
                    <template scope="scope">
                        <span v-if="item.type === 'normal'||item.type==null">{{scope.row[item.attribute]}}</span>
                        <div v-if="item.type === 'dict'">
                            <span v-for="(dictItem,index) in item.dictList" :key="index">
                                <span v-if="!item.opKey&&dictItem.code==scope.row[item.attribute]">{{dictItem.dictName}}</span>
                                <span v-else-if="item.opKey&&dictItem[item.opKey]==scope.row[item.attribute]">{{dictItem[item.opLabel]}}</span>
                            </span>
                        </div>
                        <div v-if="item.type === 'data'">
                            <span v-for="(data, index) in item.dataList" :key="index">
                                <span v-if="data.key === scope.row[item.attribute]">{{data.value}}</span>
                            </span>
                        </div>
                        <div :class="item.type" v-if="item.type === 'img'">
                            <span v-if="scope.row[item.attribute]">
                                <!-- <img :src="scope.row[item.attribute]" width="30" height="30" alt="img" /> -->
                                <el-popover
                                        placement="right"
                                        title=""
                                        width="300"
                                        trigger="hover">
                                    <img :src="scope.row[item.attribute]"/>
                                    <img slot="reference" :src="scope.row[item.attribute]"
                                         :alt="scope.row[item.attribute]" style="max-height: 40px;max-width: 40px">
                                </el-popover>
                            </span>
                        </div>
                        <div v-if="item.type=='input'">
                            <span>
                                <el-input v-model='scope.row[item.attribute]' placeholder=""></el-input>
                            </span>
                        </div>
                        <div v-if="item.type==='star'">
                            <i :style="item.color" v-for="(item,index) in setStar(scope.row[item.attribute])"
                               :key="index" :class="item.value"></i>
                        </div>
                    </template>
                </el-table-column>
            </template>
            <el-table-column min-width="300" v-if="needOperationArea" label="操作" class="operationArea">
                <template scope="scope">
                    <el-button v-if="needEdit" @click="handleClick(scope.row,scope.$index)" type="primary" code="M1005"
                               size="small" plain>{{tableEditText}}
                    </el-button>
                    <el-button v-if="needRemove" @click="deleTClick(scope.row,scope.$index)" code="M1006" type="danger"
                               plain size="small">{{tableDeletText}}
                    </el-button>
                    <el-button
                            :key="index" v-for="(item,index) in buttonExpands"
                            @click="functionCallBack(scope.row,item)"
                            :code="item.code"
                            :type="item.type" plain size="small">
                        <span v-if="item.itemType === 'changeEnabled'">
                            {{scope.row.enabled == '1'? '禁用' : '启用'}}
                        </span>
                        <span v-if="item.itemType === 'changeAudit'">
                            {{scope.row.enabled == '1'? '' : '启用'}}
                        </span>
                        <span v-else-if="item.itemType === 'changeShelf'">
                            {{scope.row.shelf == '1'? '下架' : '上架'}}
                        </span>
                        <span v-else-if="item.itemType === 'changeRec'">
                            {{scope.row.rec == '1'? '不置' : '置顶'}}
                        </span>
                        <span v-else>{{item.text}}</span>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                v-if='!needNotPagination'
                @size-change="handleSizeChange"
                background
                style="margin-top:10px;text-align:left;"
                @current-change="currutPage"
                :page-sizes="[5, 10, 20, 50]"
                :page-size='PSize'
                layout="sizes, prev, pager, next,total"
                :total="Tpage"
        />
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        props: {
            //table表头模板
            tableModel: {
                type: Array
            },
            //table数据源
            tableData: {
                type: Array
            },
            //每页条数
            PSize: {
                type: Number
            },
            //总条数
            Tpage: {
                type: Number,
            },
            //是否显示删除按钮
            needRemove: {
                type: Boolean,
                default: () => true
            },
            //是否显示编辑按钮
            needEdit: {
                type: Boolean,
                default: () => true
            },
            //编辑按钮显示文字
            tableEditText: {
                type: String,
                default: () => '编辑查看'
            },
            //删除按钮显示文字
            tableDeletText: {
                type: String,
                default: () => '删除'
            },
            //额外按钮组
            buttonExpands: {
                type: Array,
                default: () => []
            },
            //是否需要操作区
            needOperationArea: {
                type: Boolean,
                default: true
            },
            //是否需要分页
            needNotPagination: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            //操作按钮事件
            handleClick(row, index) {
                this.$emit("edit", row, index)
            },
            //删除按钮事件
            deleTClick(row, index) {
                this.$emit("delet", row, index)
            },
            currutPage(v) {
                this.$emit("changePage", v)
            },
            //点击按钮组事件
            functionCallBack(row, item) {
                this.$emit('clickBtnGroup', row, item)
            },
            //改变页码事件
            handleSizeChange(val) {
                this.$emit('handleSizeChange', val)
            },
            //单击单元格事件
            previewImg(row, column, cell, event) {
                this.$emit('clickCell', row[column.property])
            },
            //双击一行事件
            dbClick(row){
                this.$emit('dblclick',row)
            },
            setStar(data) {
                // 1,2,3,4,5 颗星
                let arr = [];
                if (!data||data==='0.0') {
                    for (let i = 1; i < 6; i++) {
                        arr.push({
                            index: i,
                            value: 'el-icon-star-off',
                            color: 'color:rgba(0,0,0,0.15)',
                        });
                    }
                    return arr;
                }
                let dataInt = parseInt(data);
                let flag = dataInt===parseFloat(data);
                for (let i = 1; i < 6; i++) {
                    if(i>data && i===dataInt+1){
                        !flag && arr.push({index: i,
                            value: 'el-icon-star-on',
                            color: 'color: rgb(247, 239, 118)'
                        });
                        continue;
                    }
                    if (i > data) {
                        arr.push({
                            index: i,
                            value: 'el-icon-star-off',
                            color: 'color:rgba(0,0,0,0.15)',
                        });
                    } else {
                        arr.push({
                            index: i,
                            value: 'el-icon-star-on',
                            color: 'color:rgb(247, 186, 42)',
                        });
                    }
                }
                return arr;
            },
        }
    }
</script>
<style lang="less">
    .tabel-container {
        width: 100%;
        height: 100%;
    }

    .tabel-container .el-table {
        border: 1px solid #dee5e7;

        tbody {
            .el-table__row {
                td:last-child .cell {
                    // display: flex;
                    // align-items: center;
                    // justify-content: flex-start;
                }
            }
        }
    }

    .has-gutter tr {
        background-color: #F0F3F4 !important;
    }

    .has-gutter tr th {
        border-right: 1px solid #dee5e7;
        border-bottom: 1px solid #dee5e7;
    }

    .has-gutter tr th:last-child {
        border-right: none;
        border-bottom: none;
    }

    .el-table th, .el-table tr {
        background-color: #F0F3F4;
        font-size: 12.5px;
    }

    table tr:nth-child(odd) {
        background: #FAFBFC;
    }

    table tr th {
        text-align: center !important;
    }

    table tr td {
        border-right: 1px solid #dee5e7;
        border-bottom: 1px solid #dee5e7;
        height: 42px !important;
        padding: 0 !important;
        text-align: center !important;
    }

    table tr td:last-child {
        border-right: none;
        border-bottom: none;
    }

    .el-table th.gutter {
        display: table-cell !important;
    }

    .el-pagination .selectbox {
        width: 100px !important;
    }

    .el-pagination .el-input__inner {
        width: 100px !important;
    }
</style>
