<script>
// import the third-party stylesheets directly from your JS
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!

import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { Calendar } from '@fullcalendar/core';
import bootstrapPlugin from '@fullcalendar/bootstrap';
//import "bootswatch/dist/minty/bootstrap.min.css";
import zhCnLocale from '@fullcalendar/core/locales/zh-cn';

export default defineComponent({
    name: "CalendarView",
    components: {
        FullCalendar,
    },
    data() {
        return {
            calendarOptions: {
                plugins: [
                    dayGridPlugin,
                    timeGridPlugin,
                    listPlugin,
                    interactionPlugin, // needed for dateClick
                    bootstrapPlugin,
                ],
                headerToolbar: {
                    left: 'prev,today,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                },
                themeSystem: 'bootstrap',
                initialView: 'dayGridMonth',
                initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
                select: this.handleDateSelect,
                eventClick: this.handleEventClick,
                eventsSet: this.handleEvents,
                handleWindowResize: true,//是否随浏览器窗口大小变化而自动变化
                eventLimit: true,       //数据条数太多时，限制各自里显示的数据条数（多余的以“+2more”格式显示），默认false不限制,支持输入数字设定固定的显示条数
                locale: zhCnLocale // the initial locale
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
        handleWeekendsToggle() {
            this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
        },
        handleDateSelect(selectInfo) {
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
        },
        handleEventClick(clickInfo) {
            if (!this.canUserEdit) return;
            if (confirm(`请确认是否删除事项 '${clickInfo.event.title}'`)) {
                clickInfo.event.remove()
            }
        },
        handleEvents(events) {
            this.currentEvents = events
        },
        addEvent() {
            // 第一种思路： 使用官方提供的方法
            // this.calendarApi.addEvent({
            //    title: 'event 11',
            //    start: '2021-11-28',
            //})

            //第二种：通过vue的双向绑定
            this.calendarOptions.events.push({
                title: 'event 11',
                start: '2023-7-28',
            });
        },
        toggleEdit() {
            this.canUserEdit = !this.canUserEdit;
        },
    }
})

</script>

<template>
    <div class='CalendarView'>
        <div class='mainCalendar'>
            <FullCalendar class='calendar' ref="fullCalendar" :options='calendarOptions'>
                <template v-slot:eventContent='arg'>
                    <b>{{ arg.timeText }}</b>
                    <i>{{ arg.event.title }}</i>
                </template>
            </FullCalendar>
            <br>
            <el-button class='modeChange' type="primary" @click="toggleEdit">
                模式: {{ canUserEdit ? '修改' : '查看' }}
            </el-button>

        </div>

        <div class='sidebar'>
            <div class="top">
                <div class="title">
                    <div class="health-calendar">Health Calendar</div>
                </div>

                <div class="addEvent-button" @click="addEvent">
                    <div class="addEvent-button-base">
                        <svg class="addIcon" width="20" height="20" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6V9H14C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10C15 10.2652 14.8946 10.5196 14.7071 10.7071C14.5196 10.8946 14.2652 11 14 11H11V14C11 14.2652 10.8946 14.5196 10.7071 14.7071C10.5196 14.8946 10.2652 15 10 15C9.73478 15 9.48043 14.8946 9.29289 14.7071C9.10536 14.5196 9 14.2652 9 14V11H6C5.73478 11 5.48043 10.8946 5.29289 10.7071C5.10536 10.5196 5 10.2652 5 10C5 9.73478 5.10536 9.48043 5.29289 9.29289C5.48043 9.10536 5.73478 9 6 9H9V6C9 5.73478 9.10536 5.48043 9.29289 5.29289C9.48043 5.10536 9.73478 5 10 5V5Z"
                                fill="#00BFA8" fill-opacity="0.6" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class='sidebar-section'>
                <h2>说明</h2>
                <ul>
                    <li>选择日期，系统将提示您创建一个新事件</li>
                    <li>拖放和调整事件起止时间</li>
                    <li>单击事件可将其删除</li>
                </ul>
            </div>
            <div class='sidebar-section'>
                <label>
                    <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
                    显示周末
                </label>
            </div>
            <div class='sidebar-section'>
                <div class="TodoList">To-do List【共{{ currentEvents.length }}个待办事项】</div>
                <div class="events" v-for='event in currentEvents' :key='event.id'>
                    <div class="time">
                        <div class="lowPriority"></div>
                        <div class="eventTime">{{ event.startStr }}</div>
                    </div>
                    <div class="eventTodo">{{ event.title }}</div>
                </div>
            </div>
        </div>
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
    color: #3b82f6;
    text-align: left;
    font: 700 13px/20px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    padding: 8px;
}

ul {
    margin: 0;
    padding: 0 0 0 1.5em;
}

li {
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
    padding: 0px 20px 20px 20px;
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
</style>
