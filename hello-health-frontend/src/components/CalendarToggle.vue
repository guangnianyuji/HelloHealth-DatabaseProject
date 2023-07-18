<!--
描述：年月日视图切换组件
作者：张恺瑞
-->
<template>
    <div class="Head">
        <div class="back-forword">
            <div class="Arrows">
                <div class="IconButton">
                    <div class="IconButtonBase">
                        <div class="Icon">
                            <div class="Vector"></div>
                        </div>
                    </div>
                </div>
                <div class="Button">
                    <div class="ButtonBase">
                        <div class="Today">Today</div>
                    </div>
                </div>
                <div class="IconButton">
                    <div class="IconButtonBase">
                        <div class="Icon">
                            <div class="Vector"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="day-month-year">
            <label class="radio">
                <input type="radio" name="radio" checked="">
                <span class="name">Day</span>
            </label>
            <label class="radio">
                <input type="radio" name="radio">
                <span class="name">Month</span>
            </label>

            <label class="radio">
                <input type="radio" name="radio">
                <span class="name">Year</span>
            </label>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
.Head {
    width: 920px;
    height: 52.50px; 
    justify-content: flex-start; 
    align-items: flex-start; 
    display: inline-flex"
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

.IconButtonBase {
    padding: 4px;
    background: #F4F4F5;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
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
    background: #F4F4F5;
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
    position: relative"

}

.Vector {
    width: 6px;
    height: 9.99px;
    left: 7px;
    top: 5.01px;
    position: absolute;
    background: #18181B;
}

.day-month-year {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0.5rem;
    background-color: #EEE;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.25rem;
    width: 300px;
    font-size: 14px;
}

.day-month-year .radio {
    flex: 1 1 auto;
    text-align: center;
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
    background-color: #fff;
    font-weight: 600;
}</style>