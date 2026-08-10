# COGNEVANCE_SMART_HOME_AUTOMATION
# Smart Home Automation System

## Cognevance Technologies – Embedded Systems & Internet of Things Internship

A basic IoT-based Smart Home Automation System developed as part of the Cognevance Technologies Embedded Systems & Internet of Things internship.

The system monitors environmental conditions such as temperature, humidity, light intensity, and motion, and provides automated appliance control through relay-based control logic. A web-based dashboard is used for sensor monitoring, visualization, alerts, and appliance status.

---

## 1. Project Overview

The Smart Home Automation System combines embedded-system control, sensors, automation logic, and a web-based monitoring dashboard.

The system is designed to:

- Monitor temperature and humidity.
- Detect ambient light conditions.
- Detect motion in the monitored area.
- Automatically control appliances.
- Display sensor readings through a web dashboard.
- Generate alerts based on sensor conditions.
- Monitor communication status.
- Provide graphical sensor analytics.

The embedded portion of the project is simulated using Wokwi, while the dashboard and communication layer are implemented using web technologies.

---

## 2. Objectives

The main objectives of the project are:

1. To understand basic embedded systems and IoT concepts.
2. To integrate multiple sensors with a microcontroller.
3. To implement relay-based appliance control.
4. To develop automatic control logic based on sensor conditions.
5. To create a web-based dashboard for monitoring sensor data.
6. To implement a structured communication layer between sensor data and the dashboard.
7. To generate alerts for abnormal environmental conditions.
8. To test and document the complete system.

---

## 3. Hardware Components

| Component | Purpose |
|---|---|
| Arduino Uno | Main controller |
| DHT22 | Temperature and humidity sensing |
| LDR Sensor | Light intensity detection |
| PIR Sensor | Motion detection |
| Relay Module | Appliance control |
| Red LED | Status/alert indication |
| Green LED | Normal/status indication |

---

## 4. Software and Tools

- Arduino IDE
- Wokwi
- HTML
- CSS
- JavaScript
- Chart.js
- Visual Studio Code
- GitHub
- Live Server

---

## 5. System Architecture

```text
                 SMART HOME AUTOMATION SYSTEM

                         ┌───────────────┐
                         │   Arduino Uno │
                         │  Controller   │
                         └───────┬───────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
           DHT22               LDR               PIR
       Temperature &        Light Sensor      Motion Sensor
         Humidity
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 │
                                 ▼
                       Sensor Data Processing
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
             Automation Logic          Communication
                    │                         │
                    ▼                         ▼
             Relay / Appliance          JSON Data Layer
                 Control                      │

                                              ▼
                                      Web Dashboard
                                              │
                       ┌──────────────────────┼─────────────────┐
                       │                      │                 │
                       ▼                      ▼                 ▼
                  Monitoring              Graphs             Alerts


6. Sensors and Functions
DHT22

The DHT22 is used to measure:

Temperature
Relative humidity

The measured values are processed by the controller and displayed on the monitoring dashboard.

LDR Sensor

The Light Dependent Resistor is used to detect ambient light intensity.

The system determines whether the environment is:

BRIGHT
DARK

When low light is detected, the room-light control can be activated.

PIR Sensor

The PIR sensor detects movement in the monitored area.

The dashboard displays:

MOTION DETECTED
NO MOTION

A motion alert is generated when movement is detected.

7. Automation Logic

The system uses sensor-based automation rules.

Temperature Control
Temperature ≥ 30°C
        ↓
    Fan ON
        ↓
High Temperature Alert
Light Control
Light intensity < 500
        ↓
     DARK
        ↓
Room Light ON
Motion Detection
Motion = TRUE
        ↓
Motion DETECTED
        ↓
Motion Alert
Humidity Alert
Humidity ≥ 75%
        ↓
High Humidity Alert
8. Web Dashboard

The web dashboard provides:

Real-time temperature display
Humidity monitoring
Light condition monitoring
Motion status
Fan status
Room-light status
Automation status
System connection status
Sensor history graphs
Temperature alerts
Humidity alerts
Motion alerts
Low-light alerts
Dashboard Technologies
HTML
 ↓
CSS
 ↓
JavaScript
 ↓
Chart.js
 ↓
JSON Communication Data
9. Communication Layer

A structured JSON data format is used as the communication layer between the sensor-data source and the web dashboard.

Example:

{
    "device": "Arduino Smart Home Controller",
    "temperature": 25.0,
    "humidity": 55.0,
    "light": 800,
    "motion": false,
    "fan": false,
    "roomLight": false,
    "automation": true,
    "timestamp": "2026-08-10 18:30:00"
}

The JavaScript dashboard reads this data and updates the sensor cards, appliance status, graphs, and alerts.

10. Testing

The system was tested under different operating conditions.

Test ID	Test Condition	Expected Result	Status
T1	Normal environmental condition	Normal monitoring	PASS
T2	Temperature = 32.5°C	Fan ON + high-temperature alert	PASS
T3	Motion = TRUE	Motion detected + alert	PASS
T4	Light intensity = 300	DARK + room light ON	PASS
T5	Humidity = 80%	High-humidity alert	PASS
T6	Communication data unavailable	System OFFLINE + communication error	PASS
11. Communication Failure and Recovery

The communication layer was also tested by temporarily making the sensor-data source unavailable.

Expected behavior:

Communication Available
        ↓
      ONLINE

When the data source becomes unavailable:

Communication Failure
        ↓
      OFFLINE
        ↓
Communication Error

After restoring the data source:

Data Source Restored
        ↓
      ONLINE

The dashboard successfully detected the communication failure and recovered after the data source was restored.

12. Project Workflow
Study IoT Concepts
       ↓
Select Sensors
       ↓
Design Circuit
       ↓
Wokwi Simulation
       ↓
Arduino Programming
       ↓
Sensor Testing
       ↓
Automation Logic
       ↓
Web Dashboard
       ↓
Communication Layer
       ↓
Testing
       ↓
Documentation
       ↓
GitHub Submission
13. Repository Structure
COGNEVANCE_SMART_HOME_AUTOMATION/
│
├── Arduino_Code/
│   └── smart_home.ino
│
├── Dashboard/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Communication/
│   └── sensor_data.json
│
├── Simulation/
│   └── wokwi_project_link.txt
│
├── Circuit_Diagram/
│
├── Screenshots/
│
└── README.md
14. Simulation

The embedded system was developed and tested using the Wokwi online simulation environment.

The simulation includes:

Arduino controller
DHT22
LDR
PIR sensor
Relay module
LEDs

The Wokwi project link is provided in:

Simulation/wokwi_project_link.txt
15. Results

The developed system successfully demonstrates:

Sensor data acquisition
Environmental monitoring
Motion detection
Light condition detection
Temperature and humidity monitoring
Relay-based appliance control
Automatic control logic
Web-based monitoring
Sensor data visualization
Alert generation
Communication status monitoring
Communication failure detection and recovery

All six defined functional tests were successfully completed.

16. Future Improvements

The following improvements can be implemented in future versions:

ESP32-based Wi-Fi connectivity
MQTT communication
Cloud database integration
Mobile application
Remote appliance control
Real-time cloud dashboards
Data logging and historical analysis
User authentication
Voice-controlled appliances
Energy consumption monitoring
17. Internship Project

Organization: Cognevance Technologies

Domain: Embedded Systems & Internet of Things

Project: Smart Home Automation System

Level: Level 1 – Easy

Development Environment: Wokwi + Visual Studio Code

