#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <Wire.h>
#include <Adafruit_MLX90614.h>
#include <TinyGPS++.h>
#include <HardwareSerial.h>
#include <pulseSensor.h>

#define EEPROM_SIZE 128
#define WIFI_TIMEOUT_MS 20000
#define RXD0 3
#define TXD0 1

Adafruit_MLX90614 mlx = Adafruit_MLX90614(); //temperature sensor object
TinyGPSPlus gps;                             //gps object
HardwareSerial SerialGPS(0);                 // Initializing GPS serial data on UART0
AsyncWebServer server(80);                   // Create AsyncWebServer object on port

//Pulse sensor variables
int pulsePin = 33; // Pulse Sensor wire connected to analog pin 33
int blinkPin = 2;  // pin to blink led at each beat
int fadeRate = 0;  // used to fade LED on with PWM on blink led

// Volatile Variables, used in the interrupt service routine!
volatile int BPM = 0;           // raw analog data from sensor updated every 2mS
volatile int Signal;            // holds the incoming raw data
volatile int IBI = 600;         // time interval between beats
volatile boolean Pulse = false; // check pulse=true
volatile boolean QS = false;    // true when ESP32 finds a beat.

//MPU6050 sensor variables
const int MPU_addr = 0x68;                                       // I2C address of the MPU-6050
int16_t rawAccX, rawAccY, rawAccZ, rawGyroX, rawGyroY, rawGyroZ; //raw accelerometer and gyroscope values
float ax = 0, ay = 0, az = 0, gx = 0, gy = 0, gz = 0;            //accelerometer and gyroscope variables for processing the data

String checkFall = " - ";
uint32_t softTimer;

//WI-FI variables

//const char* WIFI_SSID ="Orange-H37W"; //wifi1 192.168.100.16
//const char* WIFI_PASS = "wB5D24Fb";

const char *WIFI_SSID = "Caramida"; //wifi2 192.168.1.102
const char *WIFI_PASS = "28287612";

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML><html>
<head>
  <title>ESP Web Server</title>
</head>
<body>
  <h1> Web Server </h1>
  <h2> Licenta </h2>
  <p>
    <span id="receivedData">  </span>
  </p>
 </body>
  <script>
  setInterval(function ( ) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("receivedData").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "/receivedData", true);
    xhttp.send();
  }, 1000 ) ;
  </script>
</html>)rawliteral";

String requestFormat(String data1, String data2, String data3, String data4, String data5);

void connectToWiFi()
{
  unsigned long startAttemptTime = millis();

  Serial.print("WiFi connecting to ");
  Serial.println(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < WIFI_TIMEOUT_MS)
  {
    Serial.println("WiFi not connected");
    delay(100);
  }

  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("WiFi connected");
    Serial.println(WiFi.localIP());
  }

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/html", index_html);
  });
  server.on("/receivedData", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/plain", requestFormat(String(BPM), String(mlx.readObjectTempC()), String(gps.location.lat(), 6), String(gps.location.lng(), 6), checkFall).c_str());
  });

  server.begin();
}

String requestFormat(String data1, String data2, String data3, String data4, String data5)
{
  return "BPM: " + data1 + " Temp: " + data2 + " Lat: " + data3 + " Long " + data4 + " fall " + data5;
}

void checkI2C()
{ //funciton to scan the I2C data bus and get the sensors adresses
  byte error, address;
  int nDevices;
  Serial.println("Scanning...");
  nDevices = 0;
  for (address = 1; address < 127; address++)
  {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();
    if (error == 0)
    {
      Serial.print("I2C device found at address 0x");
      if (address < 16)
      {
        Serial.print("0");
      }
      Serial.println(address, HEX);
      nDevices++;
    }
    else if (error == 4)
    {
      Serial.print("Unknow error at address 0x");
      if (address < 16)
      {
        Serial.print("0");
      }
      Serial.println(address, HEX);
    }
  }
  if (nDevices == 0)
  {
    Serial.println("No I2C devices found\n");
  }
  else
  {
    Serial.println("done\n");
  }
}

void initMPU6050()
{
  Wire.begin();
  Wire.beginTransmission(MPU_addr); //begin transmission to the I2C slave
  Wire.write(0x6B);                 // PWR_MGMT_1 register
  Wire.write(0);                    // set to zero (wakes up the MPU-6050)
  Wire.endTransmission(true);
}

//read MPU6050 data
void mpu_read()
{
  Wire.beginTransmission(MPU_addr);
  Wire.write(0x3B); // starting with register 0x3B (ACCEL_XOUT_H)
  Wire.endTransmission(false);
  Wire.requestFrom(MPU_addr, 14, true);      // request a total of 14 registers
  rawAccX = Wire.read() << 8 | Wire.read();  // 0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)
  rawAccY = Wire.read() << 8 | Wire.read();  // 0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)
  rawAccZ = Wire.read() << 8 | Wire.read();  // 0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)
  rawGyroX = Wire.read() << 8 | Wire.read(); // 0x43 (GYRO_XOUT_H) & 0x44 (GYRO_XOUT_L)
  rawGyroY = Wire.read() << 8 | Wire.read(); // 0x45 (GYRO_YOUT_H) & 0x46 (GYRO_YOUT_L)
  rawGyroZ = Wire.read() << 8 | Wire.read(); // 0x47 (GYRO_ZOUT_H) & 0x48 (GYRO_ZOUT_L)
}

String mpuFallDetection()
{

  mpu_read(); //set accelerometer domain +-2g => using 14 bits  //set gyroscope domain 250grades/s => 131.07

  //accelerometer and gryoscope processed data each for 3 axis
  ax = (rawAccX - 2050) / 16384.00;
  ay = (rawAccY - 77) / 16384.00;
  az = (rawAccZ - 1947) / 16384.00;
  gx = (rawGyroX + 270) / 131.07;
  gy = (rawGyroY - 351) / 131.07;
  gz = (rawGyroZ + 136) / 131.07;

  // calculating Amplitute vactor for 3 axis
  if (ax >= 1.1)
  {                       //if acceleration breaks lower threshold
    softTimer = millis(); //start counter
    while (millis() - softTimer < 10000)
    {
      checkFall = "FALL DETECTED"; //FALL DETECTED for 5 seconds
    }
    checkFall = " - ";
  }

  return checkFall;
  delay(100);
}

void sendGpsData()
{
  if (SerialGPS.available())
  {
    char cIn = SerialGPS.read();
    gps.encode(cIn);
    if (gps.location.isUpdated())
    {
      Serial.print("Latitude= ");
      Serial.print(gps.location.lat(), 6);
      Serial.print(" Longitude= ");
      Serial.println(gps.location.lng(), 6);
    }
  }
}





void setup()
{
  pinMode(blinkPin, OUTPUT); // pin that will blink to your heartbeat!

  Serial.begin(9600);
  SerialGPS.begin(9600, SERIAL_8N1, RXD0, TXD0); //gps baud

  Serial.println("Serial Tx is on pin: " + String(TX));
  Serial.println("Serial Rx is on pin: " + String(RX));

  mlx.begin();
  mlx.writeEmissivity(0.98); // set skin emissivity

  initMPU6050();
  //checkI2C();
  connectToWiFi();
  interruptSetup(); // sets up to read Pulse Sensor signal every 2mS
}

void loop()
{
  sendGpsData();
  mpuFallDetection();
}
