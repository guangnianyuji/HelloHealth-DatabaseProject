<template>
    <div class="todo-menu">
        <div class="top">
            <div class="title">
                <div class="health-calendar">Health Calendar</div>
            </div>

            <div class="icon-button">
                <div class="icon-button-base">
                    <svg class="icon" width="20" height="20" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M10 5C10.2652 5 10.5196 5.10536 10.7071 5.29289C10.8946 5.48043 11 5.73478 11 6V9H14C14.2652 9 14.5196 9.10536 14.7071 9.29289C14.8946 9.48043 15 9.73478 15 10C15 10.2652 14.8946 10.5196 14.7071 10.7071C14.5196 10.8946 14.2652 11 14 11H11V14C11 14.2652 10.8946 14.5196 10.7071 14.7071C10.5196 14.8946 10.2652 15 10 15C9.73478 15 9.48043 14.8946 9.29289 14.7071C9.10536 14.5196 9 14.2652 9 14V11H6C5.73478 11 5.48043 10.8946 5.29289 10.7071C5.10536 10.5196 5 10.2652 5 10C5 9.73478 5.10536 9.48043 5.29289 9.29289C5.48043 9.10536 5.73478 9 6 9H9V6C9 5.73478 9.10536 5.48043 9.29289 5.29289C9.48043 5.10536 9.73478 5 10 5V5Z"
                            fill="#00BFA8" fill-opacity="0.6" />
                    </svg>
                </div>
            </div>
        </div>

        <div class="date">
            <div class="title">
                <div class="yearCalendar">2023年</div>

                <div class="monthCalendar">7月</div>
            </div>

            <div class="arrows">
                <svg class="chevron-left" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M15.2484 6.35159C15.4734 6.57662 15.5998 6.88179 15.5998 7.19999C15.5998 7.51818 15.4734 7.82335 15.2484 8.04839L11.2968 12L15.2484 15.9516C15.467 16.1779 15.588 16.481 15.5852 16.7957C15.5825 17.1103 15.4563 17.4113 15.2338 17.6338C15.0113 17.8563 14.7103 17.9825 14.3957 17.9852C14.0811 17.9879 13.7779 17.867 13.5516 17.6484L8.75161 12.8484C8.52665 12.6234 8.40027 12.3182 8.40027 12C8.40027 11.6818 8.52665 11.3766 8.75161 11.1516L13.5516 6.35159C13.7766 6.12662 14.0818 6.00024 14.4 6.00024C14.7182 6.00024 15.0234 6.12662 15.2484 6.35159V6.35159Z"
                        fill="#00BFA8" fill-opacity="0.6" />
                </svg>

                <svg class="chevron-right" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.75161 17.6484C8.52665 17.4234 8.40027 17.1182 8.40027 16.8C8.40027 16.4818 8.52665 16.1766 8.75161 15.9516L12.7032 12L8.75161 8.04839C8.53302 7.82207 8.41207 7.51895 8.4148 7.20431C8.41754 6.88968 8.54374 6.5887 8.76623 6.36621C8.98872 6.14372 9.2897 6.01752 9.60433 6.01479C9.91897 6.01205 10.2221 6.13301 10.4484 6.35159L15.2484 11.1516C15.4734 11.3766 15.5998 11.6818 15.5998 12C15.5998 12.3182 15.4734 12.6234 15.2484 12.8484L10.4484 17.6484C10.2234 17.8734 9.91821 17.9997 9.60001 17.9997C9.28182 17.9997 8.97665 17.8734 8.75161 17.6484Z"
                        fill="#00BFA8" fill-opacity="0.6" />
                </svg>
            </div>
        </div>

        <div class="mini-calendar">
            <div class="header">
                <div class="calendarHeader">
                    <div class="dayOfWeek">SUN</div>
                </div>

                <div class="calendarHeader">
                    <div class="dayOfWeek">MON</div>
                </div>

                <div class="calendarHeader">
                    <div class="dayOfWeek">TUE</div>
                </div>

                <div class="calendarHeader">
                    <div class="dayOfWeek">WED</div>
                </div>

                <div class="calendarHeader">
                    <div class="dayOfWeek">THU</div>
                </div>

                <div class="calendarHeader">
                    <div class="dayOfWeek">FRI</div>
                </div>

                <div class="calendarHeader">
                    <div class="dayOfWeek">SAT</div>
                </div>
            </div>

            <div class="week">
                <div class="dayOfMonth">
                    <div class="dayShadow">25</div>

                    <div class="event-dots">
                        <div class="dot"></div>

                        <div class="dot"></div>

                        <div class="dot"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayShadow">26</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayShadow">27</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayShadow">28</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayShadow">29</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayShadow">30</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">1</div>

                    <div class="event-dots">
                        <div class="dot"></div>

                        <div class="dot"></div>

                        <div class="dot"></div>
                    </div>
                </div>
            </div>

            <div class="week">
                <div class="dayOfMonth">
                    <div class="dayNormal">2</div>

                    <div class="event-dots">
                        <div class="dot"></div>

                        <div class="dot"></div>

                        <div class="dot"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">3</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">4</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">5</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">6</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">7</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">8</div>

                    <div class="event-dots">
                        <div class="dot"></div>

                        <div class="dot"></div>

                        <div class="dot"></div>
                    </div>
                </div>
            </div>

            <div class="week">
                <div class="dayOfMonth">
                    <div class="dayNormal">9</div>

                    <div class="event-dots">
                        <div class="dot"></div>

                        <div class="dot"></div>

                        <div class="dot"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">10</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">11</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">12</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">13</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">14</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="day6">
                    <div class="frame-12">
                        <div class="dayToday">15</div>

                        <div class="event-dots2">
                            <div class="dot4"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="week">
                <div class="dayOfMonth">
                    <div class="dayNormal">16</div>

                    <div class="event-dots">
                        <div class="dot"></div>

                        <div class="dot"></div>

                        <div class="dot"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">17</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">18</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">19</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">20</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">21</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">22</div>

                    <div class="event-dots">
                        <div class="dot"></div>

                        <div class="dot"></div>

                        <div class="dot"></div>
                    </div>
                </div>
            </div>

            <div class="week">
                <div class="dayOfMonth">
                    <div class="dayNormal">23</div>

                    <div class="event-dots2">
                        <div class="dot"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">24</div>

                    <div class="event-dots2">
                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">25</div>

                    <div class="event-dots2">
                        <div class="dot2"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">26</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">27</div>

                    <div class="event-dots2">
                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">28</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">29</div>

                    <div class="event-dots">
                        <div class="dot"></div>

                        <div class="dot"></div>

                        <div class="dot"></div>
                    </div>
                </div>
            </div>

            <div class="week">
                <div class="dayOfMonth">
                    <div class="dayNormal">30</div>

                    <div class="event-dots">
                        <div class="dot"></div>

                        <div class="dot"></div>

                        <div class="dot"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayNormal">31</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayShadow">1</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayShadow">2</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayShadow">3</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>

                        <div class="dot3"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayShadow">4</div>

                    <div class="event-dots2">
                        <div class="dot"></div>

                        <div class="dot2"></div>
                    </div>
                </div>

                <div class="dayOfMonth">
                    <div class="dayShadow">5</div>

                    <div class="event-dots">
                        <div class="dot"></div>

                        <div class="dot"></div>

                        <div class="dot"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="todo-list">
            <div class="days">
                <div class="day-header3">
                    <div class="dayTitle">
                        <div class="todayTitle">今天</div>

                        <div class="todayDate">2023/07/15</div>
                    </div>
                </div>

                <div class="event">
                    <div class="meta">
                        <div class="lowPriority"></div>

                        <div class="time">
                            <div class="startTime">8:30</div>
                            <div class="to">–</div>
                            <div class="endTime">9:00</div>
                            <div class="am-pm">AM</div>
                        </div>
                    </div>

                    <div class="title2">
                        <div class="todoThing">Monthly catch-up</div>
                    </div>
                </div>

                <div class="event">
                    <div class="meta">
                        <div class="highPriority"></div>

                        <div class="time">
                            <div class="startTime">8:30</div>
                            <div class="to">–</div>
                            <div class="endTime">9:00</div>
                            <div class="am-pm">AM</div>
                        </div>
                    </div>

                    <div class="title2">
                        <div class="todoThing">Visit to discuss improvements</div>
                    </div>
                </div>

                <div class="day-header3">
                    <div class="dayTitle">
                        <div class="todoWeek">周一</div>
                        <div class="todoDate">2023/07/16</div>
                    </div>
                </div>

                <div class="event">
                    <div class="meta">
                        <div class="highPriority"></div>

                        <div class="time">
                            <div class="startTime">8:30</div>
                            <div class="to">–</div>
                            <div class="endTime">9:00</div>
                            <div class="am-pm">AM</div>
                        </div>
                    </div>

                    <div class="title2">
                        <div class="todoThing">City Sales Pitch</div>
                    </div>
                </div>

                <div class="day-header3">
                    <div class="dayTitle">
                        <div class="todoWeek">周四</div>

                        <div class="todoDate">2023/07/19</div>
                    </div>
                </div>

                <div class="event">
                    <div class="meta">
                        <div class="mediumPriority"></div>

                        <div class="time">
                            <div class="startTime">8:30</div>
                            <div class="to">–</div>
                            <div class="endTime">9:00</div>
                            <div class="am-pm">AM</div>
                        </div>
                    </div>

                    <div class="title2">
                        <div class="todoThing">Visit to discuss improvements</div>
                    </div>
                </div>

                <div class="event">
                    <div class="meta">
                        <div class="lowPriority"></div>

                        <div class="time">
                            <div class="startTime">8:30</div>
                            <div class="to">–</div>
                            <div class="endTime">9:00</div>
                            <div class="am-pm">AM</div>
                        </div>
                    </div>

                    <div class="title2">
                        <div class="todoThing">Meeting to discuss the new proposal</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TodoMenu",
    components: {},
    props: {},
    data() {
        // quickfix to have components available to pass as props
        return {};
    },
};
</script>
<style scoped>
.todo-menu,
.todo-menu * {
    box-sizing: border-box;
}

.todo-menu {
    background: var(--back, #e8f7f6);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    width: 248px;
    max-width: 300px;
    position: relative;
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

.health-calendar {
    color: var(--board, rgba(0, 191, 168, 0.6));
    text-align: left;
    font: 500 22px/40px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.icon-button {
    background: rgba(0, 191, 168, 0.1);
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
}

.icon-button-base {
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

.icon {
    flex-shrink: 0;
    position: relative;
    overflow: visible;
}

.date {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-self: stretch;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
}

.yearCalendar {
    color: var(--date, rgba(31, 41, 55, 0.6));
    text-align: left;
    font: 500 24px/40px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.monthCalendar {
    color: var(--board, rgba(0, 191, 168, 0.6));
    text-align: left;
    font: 400 24px/40px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.arrows {
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
}

.chevron-left {
    flex-shrink: 0;
    position: relative;
    overflow: visible;
}

.chevron-right {
    flex-shrink: 0;
    position: relative;
    overflow: visible;
}

.mini-calendar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    align-self: stretch;
    flex-shrink: 0;
    height: 192px;
    max-width: 218px;
    position: relative;
    overflow: hidden;
}

.header {
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    position: relative;
}

.calendarHeader {
    padding: 4px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    position: relative;
}

.dayOfWeek {
    color: var(--gray-500, #71717a);
    text-align: center;
    font: 600 9px/16px "Inter", sans-serif;
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.week {
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    position: relative;
}

.dayOfMonth {
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    position: relative;
}

.dayShadow {
    color: rgba(113, 113, 122, 0.5);
    text-align: center;
    font: 600 10px/16px "Inter", sans-serif;
    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
}

.event-dots {
    opacity: 0;
    display: flex;
    flex-direction: row;
    gap: 2px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
}

.dot {
    background: var(--blue-500, #3b82f6);
    border-radius: 50%;
    flex-shrink: 0;
    width: 4px;
    height: 4px;
    position: relative;
}

.event-dots2 {
    display: flex;
    flex-direction: row;
    gap: 2px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
}

.dot2 {
    background: var(--purple-500, #a855f7);
    border-radius: 50%;
    flex-shrink: 0;
    width: 4px;
    height: 4px;
    position: relative;
}

.dot3 {
    background: var(--teal-400, #2dd4bf);
    border-radius: 50%;
    flex-shrink: 0;
    width: 4px;
    height: 4px;
    position: relative;
}

.dayNormal {
    color: var(--date, rgba(31, 41, 55, 0.6));
    text-align: center;
    font: 600 10px/16px "Inter", sans-serif;
    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
}

.day6 {
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
    height: 1px;
    position: relative;
}

.frame-12 {
    background: #3b82f6;
    border-radius: 100px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;
    height: 28px;
    position: relative;
}

.dayToday {
    color: var(--white, #ffffff);
    text-align: center;
    font: 600 10px/16px "Inter", sans-serif;
    position: relative;
    align-self: stretch;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dot4 {
    background: var(--white, #ffffff);
    border-radius: 50%;
    flex-shrink: 0;
    width: 4px;
    height: 4px;
    position: relative;
}

.todo-list {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex: 1;
    max-width: 218px;
    position: relative;
    overflow-y: auto;
}

.days {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    position: relative;
}

.day-header3 {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    position: relative;
}

.dayTitle {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
}

.todayTitle {
    color: var(--blue-500, #3b82f6);
    text-align: left;
    font: 700 13px/20px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.todayDate {
    color: var(--blue-500, #3b82f6);
    text-align: left;
    font: 700 13px/20px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.event {
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    position: relative;
}

.meta {
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
.time {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
}
.startTime {
    color: var(--gray-400, #a1a1aa);
    text-align: left;
    font: 600 11px/16px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.to {
    color: var(--gray-400, #a1a1aa);
    text-align: left;
    font: 600 10px/16px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.endTime {
    color: var(--gray-400, #a1a1aa);
    text-align: left;
    font: 600 11px/16px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.am-pm {
    color: var(--gray-400, #a1a1aa);
    text-align: left;
    font: 600 11px/16px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.title2 {
    padding: 0px 0px 0px 20px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    position: relative;
}
.todoThing {
    color: var(--date, rgba(31, 41, 55, 0.6));
    text-align: left;
    font: var(--text-xs-medium, 600 12px/16px "Inter", sans-serif);
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.highPriority {
    background: var(--pink-500, #ec4899);
    border-radius: 50%;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    position: relative;
}
.todoWeek {
    color: var(--board, rgba(0, 191, 168, 0.6));
    text-align: left;
    font: 700 13px/20px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.todoDate {
    color: var(--board, rgba(0, 191, 168, 0.6));
    text-align: left;
    font: 700 13px/20px "Inter", sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.mediumPriority {
    background: var(--amber-400, #fbbf24);
    border-radius: 50%;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    position: relative;
}
</style>
  