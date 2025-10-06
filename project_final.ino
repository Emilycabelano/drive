#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

#define WIFI_SSID "********"
#define WIFI_PASS "************"

#define ADAFRUIT_IO_USER "*************"
#define ADAFRUIT_IO_KEY  "*********************"

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, ADAFRUIT_IO_USER, ADAFRUIT_IO_KEY);
Adafruit_MQTT_Publish coFeed = Adafruit_MQTT_Publish(&mqtt, ADAFRUIT_IO_USER "/feeds/CO");
Adafruit_MQTT_Publish airFeed = Adafruit_MQTT_Publish(&mqtt, ADAFRUIT_IO_USER "/feeds/AirQuality");


int IR_PIN =1;
int MQ7_PIN =A0;
int MQ135_PIN =5;

int BUZZER_PIN =2;

void MQTT_connect() {
  int8_t ret;
  if (mqtt.connected()) return;
  while ((ret = mqtt.connect()) != 0) {
    mqtt.disconnect();
    delay(2000);
  }
}

void setup() {
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  pinMode(IR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
}

void loop() {
  MQTT_connect();
  if (digitalRead(IR_PIN) == LOW) {
    float co = analogRead(MQ7_PIN);
    float air = analogRead(MQ135_PIN);
 

    coFeed.publish(co);
    airFeed.publish(air);
  

    if (co > 500 || air > 400 ) {
      digitalWrite(BUZZER_PIN, HIGH);
      delay(5000);
    }
    else{
      digitalWrite(BUZZER_PIN, LOW);
    }
  }
  mqtt.processPackets(1000);
  mqtt.ping();
  delay(2000);
}
