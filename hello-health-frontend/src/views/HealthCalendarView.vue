<template>
    <div class="calendarContainer">
        <div class="calendar">
            <CalendarBase />
        </div>
        <div class="todo">
            <TodoMenu />
        </div>
    </div>
</template>


<script>
import CalendarBase from '@/components/CalendarBase.vue';
import TodoMenu from '@/components/TodoMenu.vue';

export default {
    name: "HealthCalendarView",
    components: {
        CalendarBase,
        TodoMenu,
    }
}
</script>

<style>
.calendarContainer {
    display: flex;
    justify-content: space-between;
    position: relative;
}

.calendar {
    width: 80%;
}

.todo {
    width: 20%;
}
</style>
