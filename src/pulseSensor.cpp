#include <App.h>

volatile int rate[10];                    // last 10 IBI values for average calculus
volatile boolean firstBeat = true;        // average array flag so we startup with reasonable BPM
volatile boolean secondBeat = false;      // average array flag so we startup with reasonable BPM
volatile unsigned long sampleCounter = 0; // used to determine pulse timing
volatile unsigned long lastBeatTime = 0;  // used to find IBI
volatile int P = 512;                     // pulse peak
volatile int T = 512;                     // pulse trough
volatile int thresh = 530;                // instant moment of heart beat
volatile int amp = 0;                     // amplitude of pulse waveform
volatile int sensorValOld = 0;            // old Signal value

hw_timer_t *timer = NULL;
volatile SemaphoreHandle_t timerSemaphore; //timer

portMUX_TYPE timerMux = portMUX_INITIALIZER_UNLOCKED;
portMUX_TYPE intr = portMUX_INITIALIZER_UNLOCKED;

void ledFadeToBeat()
{
    fadeRate -= 15;                         //  set LED fade value
    fadeRate = constrain(fadeRate, 0, 255); //  keep LED fade value from going into negative numbers
}
//void ledFadeToBeat();

int getPulse()
{
    Signal = analogRead(pulsePin) / 4; // ESP32 ADC: 12bits -> set 10bits ADC value

    sampleCounter += 2;                   // timer variable in mS
    int N = sampleCounter - lastBeatTime; // monitor the time since the last beat to avoid noise

    // Peak and Trough of the pulse wave
    if (Signal < thresh && N > (IBI / 5) * 3)
    { // avoid dichrotic noise by waiting 3/5 of last IBI
        if (Signal < T)
        {
            T = Signal; // Lowest point in pulse wave
        }
    }

    if (Signal > thresh && Signal > P)
    {               // Threshold condition to avoid noise
        P = Signal; // Highest point in pulse wave
    }

    if ((Signal - sensorValOld) > 600)
    { // if the HRV variation between IBI is greater than 600ms
        BPM = 0;
    }
    if (Signal > 800)
    {
        BPM = 0;
    }

    if (N > 300) // Pulse
    {            // avoid high frequency noise
        if ((Signal > thresh) && (Pulse == false) && (N > (IBI / 5) * 3))
        {
            word runningTotal = 0; // total of IBI values

            Pulse = true;                       // Set Pulse flag
            digitalWrite(blinkPin, HIGH);       // pin2 LED = HIGH
            IBI = sampleCounter - lastBeatTime; // measure time between beats in mS
            lastBeatTime = sampleCounter;       // keep track of time for next pulse

            if (secondBeat)
            {                       // if secondBeat == TRUE
                secondBeat = false; // clear secondBeat flag
                for (int i = 0; i <= 9; i++)
                { // average of BPM values to get a realisitic BPM at startup
                    rate[i] = IBI;
                }
            }

            if (firstBeat)
            {                      // if firstBeat == TRUE
                firstBeat = false; // clear firstBeat flag
                secondBeat = true; // set the secondBeat flag
                sei();             // enable interrupts
                return 0;          // IBI value is unreliable
            }

            // keep a running total of the last 10 IBI values
            for (int i = 0; i <= 8; i++)
            {                            // shift data in the rate array
                rate[i] = rate[i + 1];   // and drop the oldest IBI value
                runningTotal += rate[i]; // add up the 9 oldest IBI values
            }

            rate[9] = IBI;              // add the latest IBI to the rate array
            runningTotal += rate[9];    // add the latest IBI to runningTotal
            runningTotal /= 10;         // average the last 10 IBI values
            BPM = 60000 / runningTotal; // BPM

            QS = true; // set Quantified Self flag
        }
    }

    sensorValOld = Signal;

    if (Signal < thresh && Pulse == true)
    {                                // Decreasing values => the beat is over
        digitalWrite(blinkPin, LOW); // turn off pin 2 LED
        Pulse = false;               // reset the Pulse flag
        amp = P - T;                 // get amplitude of the pulse wave
        thresh = amp / 2 + T;        // set threshold at 50% of the amplitude
        P = thresh;                  // Reset peak & trough
        T = thresh;
    }

    if (N > 2500)
    {                                 // if 2.5 seconds go by without a beat
        thresh = 530;                 // set thresh default
        P = 512;                      // set P default
        T = 512;                      // set T default
        lastBeatTime = sampleCounter; // bring the lastBeatTime up to date
        firstBeat = true;             // set flags to avoid noise when we get the heartbeat back
        secondBeat = false;
    }

    if (QS == true)
    {                   // BPM and IBI have been Determined
        fadeRate = 255; // Makes the LED Fade Effect Happen
        QS = false;     // reset the Quantified Self flag for next time
        ledFadeToBeat();
        return BPM;
    }
}

void IRAM_ATTR isr()
{
    portENTER_CRITICAL_ISR(&intr); // disable interrupts
    getPulse();
    portEXIT_CRITICAL_ISR(&intr);                // enable interrupts
    xSemaphoreGiveFromISR(timerSemaphore, NULL); //uncheck timer semaphore
}

void interruptSetup()
{
    attachInterrupt(digitalPinToInterrupt(pulsePin), isr, RISING);
    // Serial.println("start timer");

    timerSemaphore = xSemaphoreCreateBinary();
    //     // Initializes Timer1 to throw an interrupt every 2S.
    //  // Use 1st timer of 4 (counted from zero).
    //  // Set 80 divider for prescaler (see ESP32 Technical Reference Manual for more
    //  // info).
    timer = timerBegin(0, 80, true);         //prescaler set to obtain 1ms
    timerAttachInterrupt(timer, &isr, true); //attach interrupt to timer
    timerAlarmWrite(timer, 1000, true);      //5000? set alarm to call onTimer function every 1mS
    timerAlarmEnable(timer);                 //start alarm
}

void serialOutputWhenBeatHappens(int BPM)
{
    Serial.print("BPM: ");
    Serial.println(BPM);
}
