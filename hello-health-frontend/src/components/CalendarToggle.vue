<!--
    描述：年月日视图切换组件
    作者：张恺瑞
-->
<template>
    <div class="Head">
        <div class="back-forword">
            <div class="Arrows">
                <div class="IconButton">
                    <div class="leftButtonBase">
                        <div class="Icon">
                            <i class="fi fi-rr-angle-small-left"></i>
                        </div>
                    </div>
                </div>
                <div class="Button">
                    <div class="ButtonBase">
                        <div class="Today">Today</div>
                    </div>
                </div>
                <div class="IconButton">
                    <div class="rightButtonBase">
                        <div class="Icon">
                            <i class="fi fi-rr-angle-small-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="day-month-year">
            <label class="radio">
                <input type="radio" name="radio" checked="" @click="isMonthSelected = false">
                <span class="name">Day</span>
            </label>
            <label class="radio">
                <input type="radio" name="radio" @click="isMonthSelected = false">
                <span class="name">Week</span>
            </label>

            <label class="radio">
                <input type="radio" name="radio" @click="isMonthSelected = true">
                <span class="name">Month</span>
            </label>
        </div>
    </div>
    <div class="monthCalendar" v-if="isMonthSelected">
        <el-calendar v-model="value">
        </el-calendar>
    </div>
    <!-- 代办任务  日程表 -->

</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import zhCnLocale from '@fullcalendar/core/locales/zh-cn'

export default {
    name: "CalendarToggle",
    data() {
        return {
            value: new Date(),
            isMonthSelected: false // 添加 isMonthSelected 属性
        }
    },

}


</script>

<style scoped>
.Head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* 修改为 space-between */
}

.back-forword {
    display: flex;
    align-items: center;
    margin: 10px;
}

.day-month-year {
    display: flex;
    align-items: center;
    margin: 10px;
}

.Arrows {
    width: 125px;
    height: 28px;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1px;
    display: inline-flex
}

.IconButton {
    justify-content: flex-start;
    align-items: flex-start;
    display: flex;
}

.Button {
    justify-content: flex-start;
    align-items: flex-start;
    display: flex;
}

.leftButtonBase {
    padding: 4px;
    background: #ffffff;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    display: flex;
}

.rightButtonBase {
    padding: 4px;
    background: #ffffff;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    display: flex;
}

.ButtonBase {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 6px;
    padding-bottom: 6px;
    background: #ffffff;
    justify-content: center;
    align-items: center;
    gap: 8px;
    display: flex;
}

.Today {
    color: #18181B;
    font-size: 12px;
    font-family: Inter;
    font-weight: 400;
    line-height: 16px;
    word-wrap: break-word;
}

.Icon {
    width: 20px;
    height: 20px;
    position: relative;
}

.day-month-year {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0.5rem;
    background-color: #ffffff;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.1rem;
    width: 240px;
    font-size: 10px;
}

.day-month-year .radio {
    flex: 1 1 auto;
    text-align: center;
    padding: 0.25rem;
}

.day-month-year .radio input {
    display: none;
}

.day-month-year .radio .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: .5rem 0;
    color: rgba(51, 65, 85, 1);
    transition: all .15s ease-in-out;
}

.day-month-year .radio input:checked+.name {
    background-color: rgba(0, 191, 168, 0.6);
    color: #ffffff;
    font-weight: 600;
}
</style>