//#include <StringArray.h>
#include <ESPAsyncWebServer.h>

String requestFormat(String data1, String data2, String data3, String data4, String data5);
void connectToWiFi();
void checkI2C();
void initMPU6050();
void mpu_read();
String mpuFallDetection();
void sendGpsData();


extern volatile int Signal;
extern volatile int IBI;
extern volatile int BPM;
typedef bool boolean;
extern volatile boolean Pulse;
extern volatile boolean QS;
extern int pulsePin;
extern int blinkPin;
extern int fadeRate;