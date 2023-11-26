<script>
import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!

import globalData from "@/global/global"
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import zhCnLocale from '@fullcalendar/core/locales/zh-cn';
import {ElMessage} from "element-plus";
import {computed} from "vue";
import axios from "axios";
import moment from "moment/moment";

export default {
    name: "CalendarView",
    components: {
        FullCalendar,
    },
    data() {
        return {
            dialogVisible: false,
            idMost: 0,
            form: {
                eventID: '',
                title: '',
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: '',
                priority: '',
                finished: false,
                interval: 1,
                notify: true
            },
            rules: {
                title: [
                    { required: true, message: '请输入事项主题', trigger: 'blur' }
                ],
                startDate: [
                    { required: true, message: '请选择开始日期', trigger: 'change' }
                ],
                startTime: [
                    { required: true, message: '请选择开始时间', trigger: 'change' }
                ],
                endDate: [
                    { required: true, message: '请选择结束日期', trigger: 'change' }
                ],
                endTime: [
                    { required: true, message: '请选择结束时间', trigger: 'change' }
                ],
                priority: [
                    { required: true, message: '请填写事项优先级', trigger: 'change' }
                ]
            },
            priorityColorMap: {
                lowPriority: '#3b82f6',
                middlePriority: '#FBBF24',
                highPriority: '#EC4899',
            },
            calendarOptions: {
                plugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    listPlugin,
                    interactionPlugin, // needed for dateClick
                ],
                headerToolbar: {
                    left: 'prev,today,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                },
                height: 'auto',
                initialView: 'timeGridWeek',
                editable: false,
                selectable: true,
                selectMirror: false,
                dayMaxEvents: true,
                weekends: true,
                navLinks: true,
                nowIndicator: true, // 是否显示时间指示器
                //dateClick: this.handleDateClick, // ToDo
                select: this.handleDateSelect,
                eventClick: this.handleEventClick,
                // eventsSet: this.handleEvents,
                eventDrop: this.handleEventDrop,
                handleWindowResize: true,//是否随浏览器窗口大小变化而自动变化
                dayMaxEventRows: true,       //数据条数太多时，限制各自里显示的数据条数（多余的以“+2more”格式显示），默认false不限制,支持输入数字设定固定的显示条数
                locale: zhCnLocale,     // 设置语言
                eventColor: "#78C2AD",  // 修改日程背景色
                // 通过mainEvent来生成日历上能显示的event
                events: computed(()=>{
                    this.eventNameHashMap.clear()
                    let ans = [];
                    for(let mainEvent of this.allEvents){
                        if(mainEvent.interval === 0){
                            // 连续事件
                            let nowUUID = this.getUuid()
                            this.eventNameHashMap.set(nowUUID, mainEvent.id)

                            ans.push({
                                id: nowUUID,
                                title: mainEvent.title,
                                start: mainEvent.start,
                                end: mainEvent.end,
                                color: this.priorityColorMap[mainEvent.priority]
                            })
                        }else{
                            // 每几日发生一次的事件
                            let nowStart = new Date(mainEvent.start)
                            while(nowStart.getTime() < mainEvent.end.getTime()){
                                let nowEnd = new Date(nowStart)
                                nowEnd.setHours(mainEvent.end.getHours(), mainEvent.end.getMinutes())

                                let nowUUID = this.getUuid()
                                this.eventNameHashMap.set(nowUUID, mainEvent.id)
                                ans.push({
                                    id: nowUUID,
                                    title: mainEvent.title,
                                    start: nowStart,
                                    end: nowEnd,
                                    color: this.priorityColorMap[mainEvent.priority]
                                })
                                nowStart = new Date(nowStart);
                                nowStart.setDate(nowStart.getDate() + mainEvent.interval);
                            }
                        }
                    }
                    return ans;
                })
                /* you can update a remote database when these fire:
                eventAdd:
                eventChange:
                eventRemove:
                */
            },
            canUserEdit: false,
            allEvents: [],
            eventNameHashMap: new Map()
        }
    },
    methods: {
        // 日期相关的辅助函数区域
        formatTime(date) {
            const options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };

            return new Intl.DateTimeFormat('zh-CN', options).format(date);
        },
        formatFormDate(date) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        formatFormTime(date) {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        getFormEndDateObj(){
            let ans = new Date(this.form.endDate)
            let time = new Date("1970-1-1 " + this.form.endTime)
            ans.setHours(time.getHours(), time.getMinutes())
            return ans
        },
        getFormStartDateObj(){
            let ans = new Date(this.form.startDate)
            let time = new Date("1970-1-1 " + this.form.startTime)
            ans.setHours(time.getHours(), time.getMinutes())
            return ans
        },
        setFormTime(startDate, endDate){
            this.form.startDate = this.formatFormDate(startDate);
            this.form.startTime = this.formatFormTime(startDate);
            if(endDate){
                this.form.endDate = this.formatFormDate(endDate);
                this.form.endTime = this.formatFormTime(endDate);
            }else{
                this.form.endDate = this.formatFormDate(startDate);
                this.form.endTime = this.formatFormTime(startDate);
            }

        },
        getUuid() {
            let uuid = '' + this.idMost
            this.idMost++

            return uuid;
        },
        // 日期相关的辅助函数区域结束

        toggleEdit() {
            this.canUserEdit = !this.canUserEdit;
        },
        addEvent() {
            // Clear the form fields
            this.form.title = '';
            this.form.eventID = '-1';
            this.setFormTime(new Date(), new Date())
            this.form.priority = '';
            // The selected date is not in the past, toggle the dialog
            this.dialogVisible = true;
        },
        // 删除事件
        deleteEvent(event) {
            // 在 events 数组中查找并删除具有给定 eventID 的事件
            axios.post("/api/List/removeEvent",{id:parseInt(event.id)})
                .then(res => {
                    const index = this.allEvents.findIndex(e => e.id === event.id);
                    if (index !== -1)
                        this.allEvents.splice(index, 1);
                })
                .catch(error => {
                    if(error.network) return;
                    switch (error.errorCode){
                        case 404:
                            ElMessage.error("指定的健康事项未找到");
                            break
                        default:
                            error.defaultHandler("提交健康日历数据失败")
                    }
                })


        },
        // 日历日程点击事件
        handleEventClick(calEvent) {
            this.dialogVisible = true;

            // Set form properties based on the clicked event
            let id = this.eventNameHashMap.get(calEvent.event.id)
            let realEvent = undefined;
            for(let event of this.allEvents){
                if(event.id === id){
                    realEvent = event;
                    break;
                }
            }
            this.form.eventID = realEvent.id
            this.form.title = realEvent.title;
            this.setFormTime(realEvent.start, realEvent.end)
            this.form.priority = realEvent.priority
            this.form.interval = realEvent.interval;
            this.form.notify = realEvent.notify;
        },
        async handleEventDrop(dropEventInfo){
            let success = await this.uploadEventChange(dropEventInfo.event)
            if(!success) dropEventInfo.revert();
        },
        handleDateSelect(selectInfo) {
            if (!this.canUserEdit) return;

            // 判断过去时间不能新增
            const selectedDate = moment(selectInfo.startStr);
            const currentDate = moment();

            if (selectedDate.isBefore(currentDate, 'day')) {
                // The selected date is in the past
                ElMessage.error('过去时间不能进行新增!')
            } else {
                // Clear the form fields
                this.form.eventID = '-1';
                this.form.title = '';
                this.form.startDate = selectInfo.startStr;

                // Extract time parts and keep only hours and minutes
                if (selectInfo.view.type === 'dayGridMonth') {
                    // Set startTime and endTime to 00:00 for month view
                    selectInfo.end.setDate(selectInfo.end.getDate()-1)
                    this.form.endDate = this.formatFormDate(selectInfo.end)
                    this.form.startTime = '10:00';
                    this.form.endTime = '12:00';
                } else {
                    // For other views, extract and set time parts
                    this.form.endDate = selectInfo.endStr;
                    const startTimeParts = selectInfo.startStr.split('T')[1].split('+')[0].split(':');
                    const endTimeParts = selectInfo.endStr.split('T')[1].split('+')[0].split(':');
                    this.form.startTime = startTimeParts.slice(0, 2).join(':');
                    this.form.endTime = endTimeParts.slice(0, 2).join(':');
                }

                this.form.priority = '';
                // The selected date is not in the past, toggle the dialog
                this.dialogVisible = true;
            }
        },
        // 调节事件的完成状态
        async updateEventFinished(event) {
            // 更新事件的 finished 属性
            // await this.uploadEventChange({id:event.id, finished: !event.finished})
        },
        // 提交数据
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.form.startDate = `${this.form.startDate}`;
                    let startDate = new Date(this.form.startDate)
                    let nowDate = new Date()
                    startDate.setHours(0,0,0, 0)
                    nowDate.setHours(0,0,0, 0)
                    console.log(startDate)
                    console.log(nowDate)
                    if(startDate.getTime()<nowDate.getTime()){
                        ElMessage.error('过去时间不能进行新增!')
                        return;
                    }
                    this.form.endDate = `${this.form.endDate}`;
                    if(!this.form.priority) this.form.priority = "lowPriority"
                    let success = await this.uploadEventChange({
                        id: this.form.eventID,
                        title: this.form.title,
                        start: this.getFormStartDateObj().getTime(),
                        end: this.getFormEndDateObj().getTime(),
                        priority: this.form.priority,
                        notify: this.form.notify,
                        interval: this.form.interval
                    })
                    if(success) this.dialogVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 传入事件的id、更改的部分，时间全部要转为时间戳
        async uploadEventChange(updatedEventPart){
            let newCompleteEvent = undefined;
            let oldEvent = undefined;
            if(updatedEventPart.id === "-1"){
                updatedEventPart.id = -1;
                newCompleteEvent = updatedEventPart;
            }else{
                for (let event of this.allEvents) {
                    if(event.id === updatedEventPart.id){
                        oldEvent = event;
                        newCompleteEvent = {
                            id: parseInt(updatedEventPart.id),
                            start: updatedEventPart.start ? updatedEventPart.start : event.start,
                            end: updatedEventPart.end ? updatedEventPart.end : event.end,
                            title: updatedEventPart.title ? updatedEventPart.title : event.title,
                            priority: updatedEventPart.priority ? updatedEventPart.priority : event.priority,
                            notify: typeof updatedEventPart.notify === "undefined" ? event.notify : updatedEventPart.notify,
                            interval: typeof updatedEventPart.interval === "undefined" ? event.interval : updatedEventPart.interval,
                        }
                        break;
                    }
                }
            }
            if(!newCompleteEvent) {
                ElMessage.error("健康事项不存在，请尝试刷新页面");
                return false
            }
            try{
                let res = await axios.post('/api/List/editEvent',newCompleteEvent)
                if(!oldEvent){
                    oldEvent = {id: res.json.new_id}
                    this.allEvents.push(oldEvent)
                }
                oldEvent.start = new Date(newCompleteEvent.start)
                oldEvent.end = new Date(newCompleteEvent.end)
                oldEvent.title = newCompleteEvent.title
                oldEvent.finished = newCompleteEvent.finished
                oldEvent.priority = newCompleteEvent.priority
                oldEvent.interval = newCompleteEvent.interval
                oldEvent.notify = newCompleteEvent.notify
                return true
            }catch(error){
                if(error.network) return false;
                switch (error.errorCode){
                    case 404:
                        ElMessage.error("指定的健康事项未找到");
                        break
                    default:
                        error.defaultHandler("提交健康日历数据失败")
                }
                return false;
            }
        }
    },
    computed: {
        // 表单标题
        dialogTitle() {
            if(!this.canUserEdit)
                return '健康事项详情';
            if(this.form.eventID === '-1')
                return '新增健康事项'
            else
                return '修改健康事项'
        },
        // 事项添加的时间检查
        maxStartTime() {
            if (this.form.startDate === this.form.endDate) {
                return this.form.endTime;
            }
            return null; // No minimum time restriction
        },
        minEndTime() {
            if (this.form.startDate === this.form.endDate) {
                return this.form.startTime;
            }
            return null; // No minimum time restriction
        },

        // 事项排序
        sortedEvents() {
            // 按照规则对事件进行排序
            const unFinishedEvents = this.allEvents.filter(event => !event.finished);
            const finishedEvents = this.allEvents.filter(event => event.finished);

            const compareEvents = (a, b) => {
                // 1. 未完成的排在前，完成的排在末
                if (a.finished !== b.finished) {
                    return a.finished ? 1 : -1;
                }

                // 2. 按照开始时间排序
                const startComparison = a.start - b.start;
                if (startComparison !== 0) {
                    return startComparison;
                }

                // 3. 相同开始时间的事件，按照优先级排序
                const priorityOrder = {
                    highPriority: 0,
                    middlePriority: 1,
                    lowPriority: 2,
                };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            };

            // 判断并返回合适的排序结果
            if (unFinishedEvents.length === 0) {
                return finishedEvents.sort(compareEvents);
            } else if (finishedEvents.length === 0) {
                return unFinishedEvents.sort(compareEvents);
            } else {
                return [...unFinishedEvents, ...finishedEvents].sort(compareEvents);
            }
        },  // end of sortedEvents

        // 统计未完成总数
        unfinishedEvents() {
            return this.allEvents.filter(event => !event.finished);
        }
    },
    created() {
        if(!globalData.login)
        {
            ElMessage.error('请先登录!')
            this.$router.push("/login")
            return;
        }
        axios.get("/api/List/getEvents")
            .then(res => {
                this.allEvents = []
                for(let event of res.json.events){
                    this.allEvents.push({
                        title: event.title,
                        start: new Date(event.start),
                        end: new Date(event.end),
                        id: event.id,
                        priority: event.priority,
                        color: this.priorityColorMap[event.priority],
                        notify: event.notify,
                        interval: event.interval,
                    })
                }
            })
            .catch(error => {
                if(error.network) return;
                error.defaultHandler();
            })
    },
}

</script>

<template>
    <div class='CalendarView'>
        <div class='mainCalendar'>
            <FullCalendar class='calendar' ref="fullCalendar" :options='calendarOptions'>
            </FullCalendar>
            <br>
            <div class="tags-container">
                <el-button class="modeChange" type="primary" @click="toggleEdit">
                    模式:{{ canUserEdit ? '修改' : '查看' }}
                </el-button>
            </div>
        </div>

        <div class='sidebar'>
            <div class="top">
                <div class="title">
                    <div class="health-calendar">Health Calendar</div>
                </div>

                <el-button v-if="canUserEdit" class="addEvent-button" @click="addEvent" type="success" plain>
                    <i class="fi fi-rr-plus"></i>
                </el-button>
            </div>

            <div class='sidebar-section'>
                <div class="health-calendar">健康之路


                
                    <div class="goButton" @click="this.$router.push('/Trajectory')">
                        <i class="fi fi-rr-angle-small-right centerIcon"></i>
                    </div>

                </div>
                
            </div>

            <div class='sidebar-section'>
                <div class="health-calendar">说明</div>
                <ul>
                    <li>选择日期或点击右上角+号，开始创建新事件</li>
                    <li>List列表中可以删除事件或Check事件</li>
                </ul>
            </div>
            <div class='sidebar-section'>
                <div class="TodoList">To-do List【共{{ unfinishedEvents.length }}个待办事项】</div>
                <div class="events" v-if="sortedEvents.length > 0" v-for='event in sortedEvents'>
                    <div class="time">
                        <div
                            :class="[event.priority === 'highPriority' ? 'highPriority' : (event.priority === 'middlePriority' ? 'middlePriority' : 'lowPriority')]">
                        </div>
                        <div class="eventTime">{{ formatTime(event.start) }} - {{ formatTime(event.end) }}</div>
<!--                        <label class="checkboxContainer" :class="{checked: event.finished}" @click="updateEventFinished(event)">-->
<!--                            <span class="checkbox"></span>-->
<!--                        </label>-->
                    </div>
                    <div class="eventTodo" style="display: flex; align-items: center; justify-content: space-between;">
                        <div>{{ event.title }}</div>
                        <el-button type="danger" size="small" @click="deleteEvent(event)" round>删除</el-button>
                    </div>
                </div>
                <div v-else>
                    暂无待办事项
                </div>
            </div>

            


        </div>

        <!--日程新增弹窗start-->
        <el-dialog :title="dialogTitle" v-model='dialogVisible' width="45%">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px" size="small" class="demo-ruleForm">

                <el-form-item label="事项主题" prop="title">
                    <el-input v-model="form.title" :disabled="!canUserEdit"></el-input>
                </el-form-item>

                <el-form-item label="事项日期" required>
                    <el-col :span="11">
                        <el-form-item prop="startDate" style="margin-bottom: 0">
                            <el-date-picker type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD" placeholder="选择日期"
                                v-model="form.startDate" style="width: 100%;" :disabled="!canUserEdit">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>

                    <el-col :span="11">
                        <el-form-item prop="endDate" style="margin-bottom: 0">
                            <el-date-picker type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD" placeholder="选择日期"
                                            v-model="form.endDate" style="width: 100%;" :disabled="!canUserEdit">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="事项时间" required>
                    <el-col :span="11">
                        <el-form-item prop="startTime" style="margin-bottom: 0">
                            <el-time-select placeholder="选择时间" v-model="form.startTime" start="00:00" step="00:30"
                                            end="23:30" :max-time="maxStartTime" style="width: 100%;" :disabled="!canUserEdit">
                            </el-time-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="endTime" style="margin-bottom: 0">
                            <el-time-select placeholder="选择时间" v-model="form.endTime" start="00:00" step="00:30" end="23:30"
                                :min-time="minEndTime" style="width: 100%;" :disabled="!canUserEdit">
                            </el-time-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="优先级" required>
                    <el-select v-model="form.priority" placeholder="请选择事项优先级" :disabled="!canUserEdit">
                        <el-option label="低优先级" value="lowPriority"></el-option>
                        <el-option label="中优先级" value="middlePriority"></el-option>
                        <el-option label="高优先级" value="highPriority"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="重复周期(天)" required>
                    <el-input-number v-model="form.interval" :min="0" :max="7" :disabled="!canUserEdit"/>
                    <span>&nbsp; * 重复周期为0即为连续事件</span>
                </el-form-item>
                <el-form-item label="是否发送短信提醒" required>
                    <el-radio-group v-model="form.notify" class="ml-4" :disabled="!canUserEdit">
                        <el-radio :label="true" size="small">是</el-radio>
                        <el-radio :label="false" size="small">否</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item>
                    <el-button @click="dialogVisible=false">取消</el-button>
                    <el-button v-if="canUserEdit" type="primary" @click="submitForm('form')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--日程新增弹窗end-->
    </div>
</template>

<style scoped>
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

.health-calendar {
    color: rgba(0, 191, 168, 0.6);
    text-align: left;
    font: 500 22px/40px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.addEvent-button {
    background: rgba(0, 191, 168, 0.1);
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
}

.addEvent-button-base {
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

.addIcon {
    flex-shrink: 0;
    position: relative;
    overflow: visible;
}

.TodoList {
    color: rgba(0, 191, 168, 0.6);
    text-align: left;
    font: 700 13px/20px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    padding: 8px;
}

.sidebar-section ul {
    margin: 0;
    padding: 0 0 0 1.5em;
}

.sidebar-section li {
    margin: 1.5em 0;
    padding: 0;
}

.events {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    position: relative;
}

.time {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    position: relative;
}

.line {
    text-align: center;
}

.highPriority {
    background: #EC4899;
    border-radius: 50%;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    position: relative;
}

.middlePriority {
    background: #FBBF24;
    border-radius: 50%;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    position: relative;
}

.lowPriority {
    background: #3b82f6;
    border-radius: 50%;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    position: relative;
}

.eventTime {
    /* used for event dates/times */
    color: #a1a1aa;
    text-align: left;
    font: 600 11px/16px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.eventTodo {
    padding: 0px 0px 20px 20px;
    flex-direction: row;
    gap: 10px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;

    color: rgba(31, 41, 55, 0.6);
    text-align: left;
    font: var(--text-xs-medium, 600 12px/16px "Inter", sans-serif);
    position: relative;
    flex: 1;
    display: flex;
}

.CalendarView {
    display: flex;
    min-height: 100%;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
}

.sidebar {
    width: 300px;
    line-height: 1.5;
    border-left: 1px solid #d3e2e8;
}

.sidebar-section {
    padding: 2em;
}

.mainCalendar {
    flex-grow: 1;
    padding: 3em;
    background-color: white;
    border-left: 1px solid #E8F7F6;
}

.fc {
    /* the calendar root */
    max-width: 1100px;
    margin: 0 auto;
}

el-dialog {
    z-index: 999;
}

.tags-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
}

.btn {
    margin-left: 10px;
    /* Add your desired spacing value here */
}

/* checkbox 设置 */
.checkboxContainer {
    display: block;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.checkboxContainer.checked .checkbox {
    transform: rotate(45deg) scale(0.707);
    width: 14px;
    margin-left: 5px;
    border-color: #24c78e;
    border-width: 5px;
    border-top-color: transparent;
    border-left-color: transparent;
    border-radius: 0;
}

.checkbox {
    display: block;
    width: inherit;
    height: inherit;
    border: solid 3px #2a2a2ab7;
    border-radius: 6px;
    transition: all 0.375s;
}
.modeChange {
    margin: auto;
}

</style>

<style>
:root{
    --fc-button-bg-color: #78c2ad;
    --fc-button-border-color: #78c2ad;
    --fc-button-hover-bg-color: #a9d7ca;
    --fc-button-hover-border-color: #a9d7ca;
    --fc-button-active-bg-color: #609b8a;
    --fc-button-active-border-color: #5a9282;
    --fc-event-bg-color: #3788d8;
    --fc-event-border-color: #3788d8;
}
.fc .fc-button-primary:not(:disabled):focus, .fc .fc-button-primary:not(:disabled):active:focus{
    box-shadow: #5a928280 0 0 0 0.2rem !important;

}

.fc-event, .fc-event-main{
    cursor: pointer;
}


.goButton{
    display: flex;
    align-items: center;
    margin-left: 3px;
}

.goButton:hover i{
    margin: 0;
    transition: 0.3s ease-in-out;
    transform: translateX(5px);
}

</style>