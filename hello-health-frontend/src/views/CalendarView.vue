<script>
// import the third-party stylesheets directly from your JS
// import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!

import _ from 'lodash' //导入loadsh插件
import axios from 'axios';
import { defineComponent } from 'vue';
import moment from 'moment';
import { ElMessage, ElMessageBox } from 'element-plus'

import globalData from "@/global/global"
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { Calendar } from '@fullcalendar/core';
// import bootstrapPlugin from '@fullcalendar/bootstrap';
// import "bootswatch/dist/minty/bootstrap.min.css";
import zhCnLocale from '@fullcalendar/core/locales/zh-cn';

export default defineComponent({
    name: "CalendarView",
    components: {
        FullCalendar,
    },
    data() {
        return {
            dialogVisible: false,
            form: {
                eventID: '',
                title: '',
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: '',
                priority: '',
                color: '',
                finished: false,
                eventVisible: true,
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
                    // bootstrapPlugin,
                ],
                headerToolbar: {
                    left: 'prev,today,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                },
                height: 'auto',
                // themeSystem: 'bootstrap',
                //initialDate: moment().format('YYYY-MM-DD'), // 自定义设置背景颜色时一定要初始化日期时间
                initialView: 'dayGridMonth',
                //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
                navLinks: true,
                nowIndicator: true, // 是否显示时间指示器
                //dateClick: this.handleDateClick, // ToDo
                select: this.handleDateSelect,
                eventClick: this.handleEventClick,
                eventsSet: this.handleEvents,
                handleWindowResize: true,//是否随浏览器窗口大小变化而自动变化
                eventLimit: true,       //数据条数太多时，限制各自里显示的数据条数（多余的以“+2more”格式显示），默认false不限制,支持输入数字设定固定的显示条数
                locale: zhCnLocale,     // 设置语言
                eventColor: "#78C2AD",  // 修改日程背景色
                events: [],
                /* you can update a remote database when these fire:
                eventAdd:
                eventChange:
                eventRemove:
                */
            },
            canUserEdit: false,
            currentEvents: [],
        }
    },
    methods: {
        // 日期加1天
        addDate(date, days) {
            let d = new Date(date);
            d.setDate(d.getDate() + days);
            let mon = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
            let endD = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
            return `${d.getFullYear()}-${mon}-${endD}`;
        },
        // 获取事件title
        getTitle(date1, date2) {
            let start = date1.substring(11, 16);
            let end = date2.substring(11, 16);
            return `${start}~${end}`;
        },
        getShowTime(beginDate, endDate) {
            this.form.startDate = this.dealWithTime(beginDate);
            this.form.startTime = this.getHoursMin(beginDate);
            this.form.endDate = this.dealWithTime(endDate);
            this.form.endTime = this.getHoursMin(endDate);
        },
        // 获取时分时间
        getHoursMin(value) {
            return value.substring(11, 16);
        },
        // 处理时间格式
        dealWithTime(date) {
            let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(date)[0];
            return newDate;
        },
        /*
        handleDateSelect(selectInfo) {
            if (!this.canUserEdit) return;
            let title = prompt('请输入提醒事项的标题：')
            let calendarApi = selectInfo.view.calendar

            calendarApi.unselect() // clear date selection

            if (title) {
                calendarApi.addEvent({
                    id: createEventId(),
                    title,
                    start: selectInfo.startStr,
                    end: selectInfo.endStr,
                    allDay: selectInfo.allDay
                })
            }
        },*/

        // 日历日程点击事件
        handleEventClick(calEvent) {
            if(!globalData.login)
            {
                ElMessage.error('请先登录!')
                return;
            }
            console.log(calEvent, '事件2');
            this.dialogVisible = true;

            // Set form properties based on the clicked event
            this.form.title = calEvent.event.title;
            this.form.startDate = this.formatFormDate(calEvent.event.start);
            this.form.startTime = this.formatFormTime(calEvent.event.start);
            this.form.endDate = this.formatFormDate(calEvent.event.end);
            this.form.endTime = this.formatFormTime(calEvent.event.end);
            this.form.priority = calEvent.event.priority;
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

        handleEvents(events) {
            if(!globalData.login)
            {
                ElMessage.error('请先登录!')
                return;
            }
            console.log(events, '事件3');
        },
        handleDateSelect(selectInfo) {
            if(!globalData.login)
            {
                ElMessage.error('请先登录!')
                return;
            }
            if (!this.canUserEdit) return;
            console.log(selectInfo, '事件4');

            // 判断过去时间不能新增
            const selectedDate = moment(selectInfo.startStr);
            const currentDate = moment();

            if (selectedDate.isBefore(currentDate, 'day')) {
                // The selected date is in the past
                ElMessage.error('过去时间不能进行新增!')
            } else {
                // Clear the form fields
                this.form.title = '';
                this.form.startDate = selectInfo.startStr;
                
                // Extract time parts and keep only hours and minutes
                if (selectInfo.view.type === 'dayGridMonth') {
                    // Set startTime and endTime to 00:00 for month view
                    console.log(selectInfo.end)
                    selectInfo.end.setDate(selectInfo.end.getDate()-1)
                    console.log(selectInfo.end)
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

        // 右上角+号添加事件
        addEvent() {
            if(!globalData.login)
            {
                ElMessage.error('请先登录!')
                return;
            }
            const currentDate = moment().startOf('day'); // Get the current date without time
            // Clear the form fields
            this.form.title = '';
            this.form.startDate = currentDate.format('YYYY-MM-DD');
            this.form.endDate = currentDate.format('YYYY-MM-DD');
            // Extract time parts and keep only hours and minutes
            this.form.startTime = '10:00';
            this.form.endTime = '12:00';
            this.form.priority = '';
            // The selected date is not in the past, toggle the dialog
            this.dialogVisible = true;
        },

        /*
        handleEventClick(clickInfo) {
            if (!this.canUserEdit) return;
            if (confirm(`请确认是否删除事项 '${clickInfo.event.title}'`)) {
                clickInfo.event.remove()
            }
        },
        
        handleEvents(events) {
            this.currentEvents = events;
            console.log(events, '事件3');
        },
        */
        toggleEdit() {
            this.canUserEdit = !this.canUserEdit;
        },

        // 从表单提取信息添加为事件
        addEventFromForm() {
            // Get the maximum existing eventID
            const existingEventIDs = this.calendarOptions.events.map(event => event.eventID);
            const maxEventID = existingEventIDs.length > 0 ? Math.max(...existingEventIDs) : 0;

            // Generate the new eventID based on the maximum existing eventID
            const newEventID = maxEventID + 1;

            const event = {
                eventID: newEventID,
                title: this.form.title,
                start: new Date(`${this.form.startDate} ${this.form.startTime}`),
                end: new Date(`${this.form.endDate} ${this.form.endTime}`),
                priority: this.form.priority,
                color: this.form.priority === 'lowPriority' ? '#3b82f6' : (this.form.priority === 'middlePriority' ? '#FBBF24' : '#EC4899'),
                eventVisible: true,
                finished: false,
                // You can add other properties as needed
            };
            this.calendarOptions.events.push(event);
        },

        // 格式化时间
        formatTime(date) {
            console.log(date);
            const options = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };

            return new Intl.DateTimeFormat('en-US', options).format(date);
        },

        // 交换日期或时间
        swapStartEnd() {
            const tempDate = this.form.startDate;
            const tempTime = this.form.startTime;
            this.form.startDate = this.form.endDate;
            this.form.startTime = this.form.endTime;
            this.form.endDate = tempDate;
            this.form.endTime = tempTime;
        },
        swapStartEndTimes() {
            const tempTime = this.form.startTime;
            this.form.startTime = this.form.endTime;
            this.form.endTime = tempTime;
        },

        // 
        updateEventFinished(event) {
            // 更新事件的 finished 属性
            event.finished = !event.finished;
            // 可以在这里执行其他逻辑，比如保存更新到数据库等
        },

        // 提交数据
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.form.startDate = `${this.form.startDate}`;
                    this.form.endDate = `${this.form.endDate}`;
                    if(!this.form.priority) this.form.priority = "lowPriority"

                    try {
                        const response = await axios.post('https://mock.apifox.cn/m1/2961538-0-default/api/events', this.form);
                        if (response.data.errorCode === 200) {
                            this.dialogVisible = false;
                            this.addEventFromForm(); // 调用添加事件的方法
                            // ...
                        } else {
                            console.error('Failed to create event:', response.data);
                        }
                    } catch (error) {
                        console.error('API Error:', error);
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //关闭弹窗，重置表单
        resetForm(formName) {
            this.dialogVisible = false;
            this.$refs[formName].resetFields();
        },
        //关闭弹窗，重置表单
        close() {
            this.dialogVisible = false;
            this.$refs.form.resetFields();
        },

        // 删除事件
        deleteEvent(eventID) {
            // 在 events 数组中查找并删除具有给定 eventID 的事件
            const index = this.calendarOptions.events.findIndex(event => event.eventID === eventID);
            if (index !== -1) {
                this.calendarOptions.events.splice(index, 1);
            }
        },
    },  // end of methods
    computed: {
        // 表单标题
        dialogTitle() {
            return this.canUserEdit ? '健康事项新增' : '健康事项';
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
            const unFinishedEvents = this.calendarOptions.events.filter(event => !event.finished);
            const finishedEvents = this.calendarOptions.events.filter(event => event.finished);

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
            return this.calendarOptions.events.filter(event => !event.finished);
        },
    },  // end of computed
    watch: {
        'form.startDate': function (newStartDate) {
            // If endDate is earlier than newStartDate, swap them
            if (this.form.endDate && this.form.endDate < newStartDate) {
                this.swapStartEnd();
            }
            // If dates are the same but startTime is later than endTime, swap them
            if (this.form.endDate === newStartDate && this.form.endTime < this.form.startTime) {
                this.swapStartEndTimes();
            }
        },
        'form.endDate': function (newEndDate) {
            const currentDate = moment().startOf('day'); // Get the current date without time
            const selectedEndDate = moment(newEndDate);
            // If newEndDate is earlier than currentDate, set it to currentDate
            if (selectedEndDate.isBefore(currentDate, 'day')) {
                this.form.endDate = currentDate.format('YYYY-MM-DD');
            } else {
                // If newEndDate is earlier than startDate, swap them
                if (this.form.startDate > newEndDate) {
                    this.swapStartEnd();
                }
                // If dates are the same but endTime is earlier than startTime, swap them
                if (this.form.startDate === newEndDate && this.form.startTime > this.form.endTime) {
                    this.swapStartEndTimes();
                }
            }
        },
    },  // end of watch
})

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

                <el-button class="addEvent-button" @click="addEvent" type="success" plain>
                    <i class="fi fi-rr-plus"></i>
                </el-button>
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
                <div class="events" v-if="sortedEvents.length > 0" v-for='event in sortedEvents' :key='event.eventID'>
                    <div class="time">
                        <div
                            :class="[event.priority === 'highPriority' ? 'highPriority' : (event.priority === 'middlePriority' ? 'middlePriority' : 'lowPriority')]">
                        </div>
                        <div class="eventTime">{{ formatTime(event.start) }} - {{ formatTime(event.end) }}</div>
                        <label class="checkboxContainer">
                            <input :checked="event.finished" type="checkbox" @change="updateEventFinished(event)">
                            <span class="checkbox"></span>
                        </label>
                    </div>
                    <div class="eventTodo" style="display: flex; align-items: center; justify-content: space-between;">
                        <div>{{ event.title }}</div>
                        <el-button type="danger" size="small" @click="deleteEvent(event.eventID)" round>删除</el-button>
                    </div>
                </div>
                <div v-else>
                    暂无待办事项
                </div>
            </div>
        </div>

        <!--日程新增弹窗start-->
        <el-dialog :title="dialogTitle" v-model='dialogVisible' :before-close="close" width="45%">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px" size="small" class="demo-ruleForm">

                <el-form-item label="事项主题" prop="title">
                    <el-input v-model="form.title" :disabled="!canUserEdit"></el-input>
                </el-form-item>

                <el-form-item label="开始时间" required>
                    <el-col :span="11">
                        <el-form-item prop="startDate" style="margin-bottom: 0">
                            <el-date-picker type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD" placeholder="选择日期"
                                v-model="form.startDate" style="width: 100%;" :disabled="!canUserEdit">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item prop="startTime" style="margin-bottom: 0">
                            <el-time-select placeholder="选择时间" v-model="form.startTime" start="00:00" step="00:30"
                                end="23:30" :max-time="maxStartTime" style="width: 100%;" :disabled="!canUserEdit">
                            </el-time-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="结束时间" required>
                    <el-col :span="11">
                        <el-form-item prop="endDate" style="margin-bottom: 0">
                            <el-date-picker type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD" placeholder="选择日期"
                                v-model="form.endDate" style="width: 100%;" :disabled="!canUserEdit">
                            </el-date-picker>
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
                <el-form-item>
                    <el-button @click="resetForm('form')">取消</el-button>
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
    color: var(--board, rgba(0, 191, 168, 0.6));
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
    color: var(--board, rgba(0, 191, 168, 0.6));
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
    background: var(--blue-500, #EC4899);
    border-radius: 50%;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    position: relative;
}

.middlePriority {
    background: var(--blue-500, #FBBF24);
    border-radius: 50%;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    position: relative;
}

.lowPriority {
    background: var(--blue-500, #3b82f6);
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

input[type='checkbox'] {
    position: absolute;
    transform: scale(0);
}

input[type='checkbox']:checked~.checkbox {
    transform: rotate(45deg);
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
</style>