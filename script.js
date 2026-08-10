// =====================================================
// SMART HOME AUTOMATION DASHBOARD
// JSON COMMUNICATION VERSION
// =====================================================


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let fanState = false;
let lightState = false;

const maxDataPoints = 15;

let timeLabels = [];
let temperatureData = [];
let humidityData = [];
let lightData = [];


// =====================================================
// CREATE TEMPERATURE CHART
// =====================================================

const temperatureChart = new Chart(
    document.getElementById("temperatureChart"),
    {
        type: "line",

        data: {
            labels: timeLabels,

            datasets: [
                {
                    label: "Temperature (°C)",
                    data: temperatureData,
                    borderWidth: 2,
                    tension: 0.3,
                    fill: false
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,

            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    }
);


// =====================================================
// CREATE HUMIDITY CHART
// =====================================================

const humidityChart = new Chart(
    document.getElementById("humidityChart"),
    {
        type: "line",

        data: {
            labels: timeLabels,

            datasets: [
                {
                    label: "Humidity (%)",
                    data: humidityData,
                    borderWidth: 2,
                    tension: 0.3,
                    fill: false
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,

            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    }
);


// =====================================================
// CREATE LIGHT CHART
// =====================================================

const lightChart = new Chart(
    document.getElementById("lightChart"),
    {
        type: "line",

        data: {
            labels: timeLabels,

            datasets: [
                {
                    label: "Light Intensity",
                    data: lightData,
                    borderWidth: 2,
                    tension: 0.3,
                    fill: false
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,

            scales: {
                y: {
                    beginAtZero: true,
                    max: 1000
                }
            }
        }
    }
);


// =====================================================
// READ SENSOR DATA FROM JSON
// =====================================================

async function readSensorData() {

    try {

        const response =
            await fetch("../Communication/sensor_data.json");

        if (!response.ok) {
            throw new Error("Unable to read sensor_data.json");
        }

        const data = await response.json();


        // =============================================
        // UPDATE SENSOR CARDS
        // =============================================

        document.getElementById("temperature")
            .innerText =
            data.temperature + " °C";


        document.getElementById("humidity")
            .innerText =
            data.humidity + " %";


        // Light

        if (data.light < 500) {

            document.getElementById("light")
                .innerText = "DARK";

        } else {

            document.getElementById("light")
                .innerText = "BRIGHT";
        }


        // Motion

        if (data.motion) {

            document.getElementById("motion")
                .innerText = "DETECTED";

        } else {

            document.getElementById("motion")
                .innerText = "NO MOTION";
        }


        // =============================================
        // UPDATE APPLIANCE STATUS
        // =============================================

        fanState = data.fan;

        lightState = data.roomLight;


        document.getElementById("fanStatus")
            .innerText =
            fanState ? "ON" : "OFF";


        document.getElementById("lightStatus")
            .innerText =
            lightState ? "ON" : "OFF";


        // =============================================
        // AUTOMATION STATUS
        // =============================================

        document.getElementById("automationStatus")
            .innerText =
            data.automation ? "ACTIVE" : "MANUAL";


        // =============================================
        // CONNECTION STATUS
        // =============================================

        document.getElementById("connection")
            .innerText = "ONLINE";


        document.getElementById("systemStatus")
            .innerText = "ONLINE";


        // =============================================
        // ADD DATA TO GRAPHS
        // =============================================

        const currentTime =
            new Date().toLocaleTimeString();


        timeLabels.push(currentTime);

        temperatureData.push(
            Number(data.temperature)
        );

        humidityData.push(
            Number(data.humidity)
        );

        lightData.push(
            Number(data.light)
        );


        // =============================================
        // KEEP LAST 15 VALUES
        // =============================================

        if (timeLabels.length > maxDataPoints) {

            timeLabels.shift();

            temperatureData.shift();

            humidityData.shift();

            lightData.shift();
        }


        // =============================================
        // UPDATE CHARTS
        // =============================================

        temperatureChart.update();

        humidityChart.update();

        lightChart.update();


        // =============================================
        // UPDATE ALERTS
        // =============================================

        updateAlerts(data);


    } catch (error) {

        console.error(error);


        // ---------------------------------------------
        // CONNECTION ERROR
        // ---------------------------------------------

        document.getElementById("connection")
            .innerText = "OFFLINE";


        document.getElementById("systemStatus")
            .innerText = "OFFLINE";


        showConnectionError();
    }
}


// =====================================================
// ALERT SYSTEM
// =====================================================

function updateAlerts(data) {

    const alertContainer =
        document.getElementById("alertContainer");


    let alerts = [];


    // HIGH TEMPERATURE

    if (data.temperature >= 30) {

        alerts.push({

            type: "danger",

            icon: "!",

            title: "High Temperature",

            message:
                "Temperature is " +
                data.temperature +
                " °C. Fan is activated."
        });
    }


    // HIGH HUMIDITY

    if (data.humidity >= 75) {

        alerts.push({

            type: "warning",

            icon: "!",

            title: "High Humidity",

            message:
                "Humidity level is " +
                data.humidity +
                "%."
        });
    }


    // MOTION

    if (data.motion) {

        alerts.push({

            type: "warning",

            icon: "!",

            title: "Motion Detected",

            message:
                "Movement detected in the monitored area."
        });
    }


    // LOW LIGHT

    if (data.light < 500) {

        alerts.push({

            type: "normal",

            icon: "✓",

            title: "Low Light",

            message:
                "Low light detected. Room light is ON."
        });
    }


    // NO ALERTS

    if (alerts.length === 0) {

        alerts.push({

            type: "normal",

            icon: "✓",

            title: "System Normal",

            message:
                "All monitored parameters are within normal limits."
        });
    }


    // DISPLAY

    alertContainer.innerHTML = "";


    alerts.forEach(function(alert) {

        const element =
            document.createElement("div");


        element.className =
            "alert " + alert.type;


        element.innerHTML = `

            <span class="alert-icon">
                ${alert.icon}
            </span>

            <div>

                <strong>
                    ${alert.title}
                </strong>

                <p>
                    ${alert.message}
                </p>

            </div>

        `;


        alertContainer.appendChild(element);

    });
}


// =====================================================
// CONNECTION ERROR
// =====================================================

function showConnectionError() {

    const alertContainer =
        document.getElementById("alertContainer");


    alertContainer.innerHTML = `

        <div class="alert danger">

            <span class="alert-icon">
                !
            </span>

            <div>

                <strong>
                    Communication Error
                </strong>

                <p>
                    Unable to receive sensor data.
                    Check the communication file.
                </p>

            </div>

        </div>

    `;
}


// =====================================================
// MANUAL FAN CONTROL
// =====================================================

function toggleFan() {

    fanState = !fanState;


    document.getElementById("fanStatus")
        .innerText =
        fanState ? "ON" : "OFF";
}


// =====================================================
// MANUAL LIGHT CONTROL
// =====================================================

function toggleLight() {

    lightState = !lightState;


    document.getElementById("lightStatus")
        .innerText =
        lightState ? "ON" : "OFF";
}


// =====================================================
// START SYSTEM
// =====================================================

readSensorData();


// =====================================================
// READ DATA EVERY 2 SECONDS
// =====================================================

setInterval(
    readSensorData,
    2000
);