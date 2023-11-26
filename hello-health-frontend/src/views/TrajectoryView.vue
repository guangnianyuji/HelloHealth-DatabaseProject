<template>
    <div class='TrajectoryView'>
        <div class='mainTrajectory'>
            <div class="title">
                    <div class="health-trajectory">健康曲线</div>
             </div>
            <el-select
                        class="Selector"
                        v-model="SelectedType"
                        
                        placeholder="选择统计图的健康指标种类"
                        style="width: 240px"
                        
                        :filterable="true"
                        prop="Type"
                    >
                        <el-option
                            v-for="item in Types"
                            :key="item"
                            :label="item"
                            :value="item"
                        />
                </el-select>
            <Chart
            :size="{ width: 500, height: 420 }"
            :data="select"
            :margin="margin"
            :direction="direction"
            :axis="axis">

            <template #layers>
            <Grid strokeDasharray="2,2" />
            <Line :dataKeys="['date', 'value']" />
             
            </template>

            <!-- <template #widgets>
            <Tooltip
                borderColor="#48CAE4"
                :config="{
                name: { hide: true },
                pl: { color: '#0077b6' },
                avg: { label: 'averange', color: 'red' },
                inc: { hide: true }
                }"
            />
            </template> -->

         </Chart>

        </div>
          
        <div class='sidebar'>
            <div class="top">
                <div class="title">
                    <div class="health-trajectory">Health Trajectory</div>
                </div>

                <el-button  class="addIndex-button" @click="addIndex" type="success" plain>
                    <i class="fi fi-rr-plus"></i>
                </el-button>
            </div>

       

        <div class='sidebar-section'>
        <el-table :data="TrajectoryIndices" stripe style="width: 100%">
            <el-table-column  label="记录时间"  sortable>
                <template v-slot:default="scope">
                        {{scope.row.date.toLocaleDateString()}}
                </template>
            </el-table-column>
            <el-table-column prop="type" label="指标类型"   :filters="Tfilter"  :filter-method="filterHandler" filter-placement="bottom-end"/>
            <el-table-column prop="value" label="记录数值" />
            <el-table-column label="操作">
                        <template v-slot:default="scope">
                            <el-button type="danger" size="small" @click="deleteIndex(scope.row.id)" round>删除</el-button>
                        </template>
            </el-table-column>
        </el-table>
        </div>

        </div>
    </div>
    
            <!--日程新增弹窗start-->
            <el-dialog title="新增健康指标记录" v-model='dialogVisible' width="45%">
            <el-form :model="form"  ref="form" label-width="120px" size="small" class="demo-ruleForm">

                <el-form-item label="指标种类" required>
                    <el-form-item>
                    <el-select
                        class="Selector"
                        v-model="form.Type"
                        
                        placeholder="选择健康指标种类"
                        style="width: 240px"
                        :allow-create="true"
                        :filterable="true"
                        prop="Type"
                    >
                        <el-option
                            v-for="item in Types"
                            :key="item"
                            :label="item"
                            :value="item"
                        />
                    </el-select>
                    </el-form-item>
                </el-form-item>

                <el-form-item label="记录日期" required>
                    <el-col :span="11">
                        <el-form-item prop="Date" style="margin-bottom: 0">
                            <el-date-picker type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD" placeholder="选择日期"
                                v-model="form.Date" style="width: 100%;" >
                            </el-date-picker>
                        </el-form-item>
                    </el-col> 
                </el-form-item>
 
                <el-form-item label="指标数值" required>
                    <el-input-number  prop="Value" v-model="form.Value"  :precision="2" :step="1"  />
                     
                </el-form-item>
      

                <el-form-item>
                    <el-button @click="dialogVisible=false">取消</el-button>
                    <el-button   type="primary" @click="submitForm('form')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--日程新增弹窗end-->


</template>

<script>
import globalData from "@/global/global"
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from "axios"
 
import { Chart, Grid, Line } from 'vue3-charts'
 
export default {
    name: "TrajectoryView",
    components: { Chart, Grid, Line },
    data() {
        return {
            TrajectoryIndices:[],
            SelectedType:'体重',
            Tfilter:[],
            Types:[],
            form: {
                Type: '',
                Date: '',
                Value:0,
            },
            
            dialogVisible: false,

            direction:'horizontal',
            margin:{
                left: 0,
                top: 20,
                right: 20,
                bottom: 0
            },
            axis:{
                primary: {
                    type: 'band',
                    format: (val) => {
                        return val.toLocaleDateString()
                    }   
                },
                secondary: {
                    domain: ['dataMin', 'dataMax + 100'],
                    type: 'linear',
                    ticks: 8
                }
            }
        }

    },
    computed:{
        
        select(){
            //console.log("se")
           let data=this.TrajectoryIndices.filter(item=>item['type']==this.SelectedType)
           
            data.sort((a, b) => {
            return a.date - b.date 
            });

           //console.log(data)
           return data
        },
    },
    methods:{

        addIndex() {
            // Clear the form fields
            this.form.Type = '';
            this.form.IndexId = '-1';
            this.form.Value = 0;
            //this.setFormTime(new Date(), new Date())
 
            // The selected date is not in the past, toggle the dialog
            this.dialogVisible = true;
        },
        deleteIndex(id){
             
            ElMessageBox.confirm(
             '确认删除此条记录?',
             '确认删除',
                {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: '确认删除',
                }
            )
            .then(() => {
                axios.post("/api/Trajectory/removeIndices",{id:id})
                .then(res=>{
                    if(res.data.errorCode===200){
                        ElMessage({
                        type: 'success',
                        message: '成功删除',
                        })
                        created();
                    }
                 }

                )
                .catch(error => {
                    if(error.network) return;
                    switch (error.errorCode){
                        case 404:
                            ElMessage.error("指定的健康记录未找到");
                            break
                        default:
                            error.defaultHandler("提交健康记录数据失败")
                    }
                })
           
                })
                .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消删除',
                })
                })
            },
        filterHandler( value,row,column){
        const property = column['property']
        return row[property] === value
        },

        submitForm(formName) {
            if(this.form.Type==''){
                ElMessage.error('请输入指标种类。');
                return;
            }

            if(this.form.Date==''){
                ElMessage.error('请输入记录日期。');
                return;
            }
            let numDate = new Date(this.form.Date)
           // console.log(this.form.Date)
            // console.log(numDate)
            // console.log(numDate.getTime())        
            axios.post('/api/Trajectory/addIndices',{type:this.form.Type,date:numDate.getTime(),value:this.form.Value})
            .then(res=>{
                ElMessage.success('添加健康记录成功！');
                this.dialogVisible = false;
                created();
                 
            })
            .catch(error=>{
                if(error.network) return false;
                switch (error.errorCode){
                    case 404:
                        ElMessage.error("添加健康记录失败，请重试");
                        break
                    default:
                        error.defaultHandler("添加健康记录失败，请重试")
                }
                this.dialogVisible = false;
                return false;
            })
        },

    },
    
    created() {
        if(!globalData.login)
        {
            ElMessage.error('请先登录!')
            this.$router.push("/login")
            return;
        }
        this.form.Type = '';
        //this.form.IndexId = '-1';
        this.form.Value = 0;
        this.form.Date='';
        axios.post("/api/Trajectory/getIndices")
        .then(
            res => {
                console.log(res.data.data)
                this.TrajectoryIndices=res.data.data.index
                let s = new Set();
                this.Tfilter=[];
                this.Types=[];
                let l=this.TrajectoryIndices.length 
                for (let i=0;i<l;i++) {
                    console.log(i)
                    this.TrajectoryIndices[i]['date']=new Date(this.TrajectoryIndices[i]['date'])
    	            s.add(this.TrajectoryIndices[i].type) 
	            }
                for (let i of s){
                    this.Tfilter.push({text: i, value: i,});
                    this.Types.push(i)
                }
                 
            }
        )
    }
}
</script>


<style scoped>
.Selector{
    width: 100% !important;
}
.addIndex-button {
    background: rgba(0, 191, 168, 0.1);
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
}

.addIndex-button-base {
    background: #ffffff;
    border-radius: 4px;
    padding: 4px 6px 4px 6px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    box-shadow: var(--shadow-base-box-shadow,
            0px 1px 2px 0px rgba(31, 41, 55, 0.08));
}

.TrajectoryView {
    display: flex;
    min-height: 100%;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
}

.sidebar {
    width: 450px;
    line-height: 1.5;
    border-left: 1px solid #d3e2e8;
}

.sidebar-section {
    padding: 2em;
}
.sidebar-section ul {
    margin: 0;
    padding: 0 0 0 1.5em;
}

.sidebar-section li {
    margin: 1.5em 0;
    padding: 0;
}
.mainTrajectory {
    flex-grow: 1;
    padding: 3em;
    background-color: white;
    border-left: 1px solid #E8F7F6;
}

.top {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    flex-shrink: 0;
    height: 60px;
    position: relative;
}
.title {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
}

.health-trajectory {
    color: rgba(0, 191, 168, 0.6);
    text-align: left;
    font: 500 22px/40px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>