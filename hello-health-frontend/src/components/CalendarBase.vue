<template>
    <div class="calendar-base">
        <div class="header">
            <div class="head">
                <div class="arrows">
                    <div class="icon-button">
                        <div class="icon-button-base">
                            <svg class="icon" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M12.707 5.293C12.8945 5.48053 12.9998 5.73484 12.9998 6C12.9998 6.26516 12.8945 6.51947 12.707 6.707L9.41403 10L12.707 13.293C12.8892 13.4816 12.99 13.7342 12.9877 13.9964C12.9854 14.2586 12.8803 14.5094 12.6948 14.6948C12.5094 14.8802 12.2586 14.9854 11.9964 14.9877C11.7342 14.99 11.4816 14.8892 11.293 14.707L7.29303 10.707C7.10556 10.5195 7.00024 10.2652 7.00024 10C7.00024 9.73484 7.10556 9.48053 7.29303 9.293L11.293 5.293C11.4806 5.10553 11.7349 5.00021 12 5.00021C12.2652 5.00021 12.5195 5.10553 12.707 5.293V5.293Z"
                                    fill="#18181B" />
                            </svg>
                        </div>
                    </div>

                    <div class="button">
                        <div class="button-base">
                            <div class="text">Today</div>
                        </div>
                    </div>

                    <div class="icon-button">
                        <div class="icon-button-base2">
                            <svg class="icon2" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M7.29303 14.707C7.10556 14.5195 7.00024 14.2652 7.00024 14C7.00024 13.7348 7.10556 13.4805 7.29303 13.293L10.586 10L7.29303 6.70701C7.11087 6.51841 7.01008 6.26581 7.01236 6.00361C7.01463 5.74141 7.1198 5.4906 7.30521 5.30519C7.49062 5.11978 7.74143 5.01461 8.00363 5.01234C8.26583 5.01006 8.51843 5.11085 8.70703 5.29301L12.707 9.29301C12.8945 9.48054 12.9998 9.73485 12.9998 10C12.9998 10.2652 12.8945 10.5195 12.707 10.707L8.70703 14.707C8.5195 14.8945 8.26519 14.9998 8.00003 14.9998C7.73487 14.9998 7.48056 14.8945 7.29303 14.707Z"
                                    fill="#18181B" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="day-toggle">
                    <div class="button">
                        <div class="button-base2">
                            <div class="text2">Day</div>
                        </div>
                    </div>

                    <div class="button">
                        <div class="button-base3">
                            <div class="text3">Week</div>
                        </div>
                    </div>

                    <div class="button">
                        <div class="button-base2">
                            <div class="text2">Month</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="week-days">
                <div class="days">
                    <div class="day">
                        <div class="sun">SUN</div>

                        <div class="_9">9</div>
                    </div>

                    <div class="day">
                        <div class="sun">MON</div>

                        <div class="_9">10</div>
                    </div>

                    <div class="day">
                        <div class="sun">TUE</div>

                        <div class="_9">11</div>
                    </div>

                    <div class="day">
                        <div class="sun">WED</div>

                        <div class="_9">12</div>
                    </div>

                    <div class="day">
                        <div class="sun">THU</div>

                        <div class="_9">13</div>
                    </div>

                    <div class="day">
                        <div class="sun">FRI</div>

                        <div class="_9">14</div>
                    </div>

                    <div class="day2">
                        <div class="sun">SAT</div>

                        <div class="_9">15</div>
                    </div>
                </div>

                <div class="est-gmt-8">EST<br />GMT-8</div>
            </div>
        </div>

        <div class="calendar-board">
            <div class="hour-row">
                <div class="hour-row2">
                    <div class="time">6 AM</div>

                    <div class="blocks">
                        <div class="_60-block">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">6 AM</div>
                </div>

                <div class="hour-row2">
                    <div class="time">7 AM</div>

                    <div class="blocks">
                        <div class="_60-block">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">7 AM</div>
                </div>

                <div class="hour-row2">
                    <div class="time">8 AM</div>

                    <div class="blocks">
                        <div class="_60-block">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">8 AM</div>
                </div>

                <div class="hour-row2">
                    <div class="time">9 AM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">9 AM</div>
                </div>

                <div class="hour-row2">
                    <div class="time">10 AM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">10 AM</div>
                </div>

                <div class="hour-row2">
                    <div class="time">11 AM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">11 AM</div>
                </div>

                <div class="hour-row2">
                    <div class="time">12 AM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">12 AM</div>
                </div>

                <div class="hour-row2">
                    <div class="time">1 PM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">1 PM</div>
                </div>

                <div class="hour-row2">
                    <div class="time">2 PM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">2 PM</div>
                </div>

                <div class="hour-row2">
                    <div class="time">3 PM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">3 PM</div>
                </div>

                <div class="hour-row2">
                    <div class="time">4 PM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">4 PM</div>
                </div>

                <div class="hour-row3">
                    <div class="time">5 PM</div>

                    <div class="blocks2">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">5 PM</div>
                </div>

                <div class="hour-row4">
                    <div class="time">6 PM</div>

                    <div class="blocks2">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">6 PM</div>
                </div>

                <div class="hour-row5">
                    <div class="time">7 PM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">7 PM</div>
                </div>

                <div class="hour-row6">
                    <div class="time">8 PM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">8 PM</div>
                </div>

                <div class="hour-row7">
                    <div class="time">9 PM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">9 PM</div>
                </div>

                <div class="hour-row8">
                    <div class="time">10 PM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">10 PM</div>
                </div>

                <div class="hour-row9">
                    <div class="time">11 PM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">11 PM</div>
                </div>

                <div class="hour-row10">
                    <div class="time">12 PM</div>

                    <div class="blocks">
                        <div class="_60-block5">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block3">
                            <div class="_30-block5"></div>

                            <div class="_30-block6"></div>
                        </div>

                        <div class="_60-block2">
                            <div class="_30-block3"></div>

                            <div class="_30-block4"></div>
                        </div>

                        <div class="_60-block4">
                            <div class="_30-block"></div>

                            <div class="_30-block2"></div>
                        </div>
                    </div>

                    <div class="time">12 PM</div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "CalendarBase",
    components: {},
    props: {},
    data() {
        // quickfix to have components available to pass as props
        return {};
    },
};
</script>
  
<style scoped>
.calendar-base,
.calendar-base * {
    box-sizing: border-box;
}

.calendar-base {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    height: 1034px;
    min-width: 950px;
    position: relative;
}

.header {
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex: 1;
    position: relative;
}

.head {
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    height: 52.5px;
    position: relative;
    overflow: hidden;
}

.arrows {
    display: flex;
    flex-direction: row;
    gap: 1px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
}

.icon-button {
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
}

.icon-button-base {
    background: var(--gray-100, #f4f4f5);
    border-radius: 6px 0px 0px 6px;
    padding: 4px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
}

.icon {
    flex-shrink: 0;
    position: relative;
    overflow: visible;
}

.button {
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: relative;
}

.button-base {
    background: var(--gray-100, #f4f4f5);
    padding: 6px 16px 6px 16px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
}

.text {
    color: var(--gray-900, #18181b);
    text-align: left;
    font: var(--text-xs-regular, 400 12px/16px "Inter", sans-serif);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.icon-button-base2 {
    background: var(--gray-100, #f4f4f5);
    border-radius: 0px 6px 6px 0px;
    padding: 4px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
}

.icon2 {
    flex-shrink: 0;
    position: relative;
    overflow: visible;
}

.day-toggle {
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-end;
    align-self: stretch;
    flex: 1;
    position: relative;
}

.button-base2 {
    border-radius: 8px;
    padding: 4px 16px 4px 16px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
}

.text2 {
    color: var(--gray-500, #71717a);
    text-align: left;
    font: var(--text-sm-medium, 500 14px/20px "Inter", sans-serif);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.button-base3 {
    background: var(--board, rgba(0, 191, 168, 0.6));
    border-radius: 8px;
    padding: 4px 16px 4px 16px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
}

.text3 {
    color: #ffffff;
    text-align: left;
    font: var(--text-sm-medium, 500 14px/20px "Inter", sans-serif);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.week-days {
    padding: 0px 0px 0px 48px;
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    width: 918px;
    height: 52.5px;
    max-width: 920px;
    position: relative;
    overflow: hidden;
}

.days {
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    max-width: 920px;
    position: relative;
}

.day {
    background: var(--back, #e8f7f6);
    padding: 4px 8px 16px 8px;
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    max-width: 120px;
    position: relative;
    box-shadow: inset -1px -1px 0px 0px rgba(224, 224, 224, 1);
}

.sun {
    color: var(--gray-500, #71717a);
    text-align: left;
    font: 700 10px/12px "Inter", sans-serif;
    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

._9 {
    color: #000000;
    text-align: left;
    font: 500 22px/32px "Inter", sans-serif;
    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.day2 {
    background: var(--back, #e8f7f6);
    padding: 4px 8px 16px 8px;
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    max-width: 120px;
    position: relative;
    box-shadow: inset 0px -1px 0px 0px rgba(224, 224, 224, 1);
    overflow: hidden;
}

.est-gmt-8 {
    color: var(--gray-500, #71717a);
    text-align: left;
    font: var(--text-xs-medium, 600 12px/16px "Inter", sans-serif);
    position: relative;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.calendar-board {
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    width: 920px;
    height: 881px;
    max-width: 920px;
    position: relative;
    overflow: hidden;
}

.hour-row {
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: center;
    justify-content: flex-start;
    align-self: stretch;
    flex: 1;
    position: relative;
}

.hour-row2 {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    max-width: 920px;
    position: relative;
}

.time {
    color: var(--gray-500, #71717a);
    text-align: left;
    font: var(--text-xs-medium, 600 12px/16px "Inter", sans-serif);
    position: relative;
    width: 36px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.blocks {
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex: 1;
    position: relative;
}

._60-block {
    background: var(--gray-50, #fafafa);
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    max-width: 120px;
    position: relative;
    box-shadow: inset -1px -1px 0px 0px rgba(224, 224, 224, 1);
}

._30-block {
    background: var(--gray-50, #fafafa);
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    height: 36px;
    position: relative;
    box-shadow: inset 0px -1px 0px 0px rgba(247, 247, 247, 1);
}

._30-block2 {
    background: var(--gray-50, #fafafa);
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    height: 36px;
    position: relative;
}

._60-block2 {
    background: var(--white, #ffffff);
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    position: relative;
    box-shadow: inset -1px -1px 0px 0px rgba(224, 224, 224, 1);
}

._30-block3 {
    background: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    height: 36px;
    position: relative;
    box-shadow: inset 0px -1px 0px 0px rgba(247, 247, 247, 1);
}

._30-block4 {
    background: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    height: 36px;
    position: relative;
}

._60-block3 {
    background: var(--blue-50, #eff6ff);
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    position: relative;
    box-shadow: inset -1px -1px 0px 0px rgba(224, 224, 224, 1);
}

._30-block5 {
    background: var(--blue-50, #eff6ff);
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    height: 36px;
    position: relative;
    box-shadow: inset 0px -1px 0px 0px rgba(247, 247, 247, 1);
}

._30-block6 {
    background: var(--blue-50, #eff6ff);
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    height: 36px;
    position: relative;
}

._60-block4 {
    background: var(--gray-50, #fafafa);
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    position: relative;
    box-shadow: inset 0px -1px 0px 0px rgba(224, 224, 224, 1);
}

._60-block5 {
    background: var(--gray-50, #fafafa);
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    position: relative;
    box-shadow: inset -1px -1px 0px 0px rgba(224, 224, 224, 1);
}

.hour-row3 {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    position: absolute;
    left: 0px;
    top: 792px;
}

.blocks2 {
    display: flex;
    flex-direction: row;
    gap: 0px;
    align-items: flex-start;
    justify-content: flex-start;
    align-self: stretch;
    flex-shrink: 0;
    width: 824px;
    position: relative;
}

.hour-row4 {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    max-width: 920px;
    position: absolute;
    left: 0px;
    top: 864px;
}

.hour-row5 {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    width: 920px;
    position: absolute;
    left: 0px;
    top: 936px;
}

.hour-row6 {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    width: 920px;
    position: absolute;
    left: 0px;
    top: 1008px;
}

.hour-row7 {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    width: 920px;
    position: absolute;
    left: 0px;
    top: 1080px;
}

.hour-row8 {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    width: 920px;
    position: absolute;
    left: 0px;
    top: 1152px;
}

.hour-row9 {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    width: 920px;
    position: absolute;
    left: 0px;
    top: 1224px;
}

.hour-row10 {
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 0;
    width: 920px;
    position: absolute;
    left: 0px;
    top: 1296px;
}
</style>