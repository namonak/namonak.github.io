---
title: "MPEG-2 TS(Transport Stream)"
description: "MPEG-2 시스템의 TS·PS, 다중화와 동기화, 디지털 방송 Channel Search의 흐름을 원문 도식과 함께 정리합니다."
publishedAt: 2021-11-30
category: "mpeg"
tags: ["mpeg-2", "transport-stream", "digital-broadcasting", "multiplexing"]
draft: false
---

## MPEG-2 시스템 개요

MPEG(Moving Picture Experts Group)-2 시스템은 비디오와 오디오 Elementary Stream(ES)을 저장하거나 전송하기 위해, 단일 또는 다중 스트림의 멀티미디어 정보를 다중화하는 방식을 규정한 표준입니다(ISO/IEC 13818-1). 용도에 따라 Transport Stream(TS)과 Program Stream(PS) 두 형태의 스트림을 제공합니다.

| 구분 | 특징 |
| --- | --- |
| **TS (Transport Stream)** | 전송용 스트림입니다. 전송 오류가 있을 수 있는 매체에 쓰며, 188 byte 고정 길이 packet과 27 MHz 단위 PCR(Program Clock Reference)을 사용합니다. |
| **PS (Program Stream)** | 저장용 스트림입니다. 전송 오류가 없는 매체를 전제로 하며, 가변 길이 pack과 27 MHz 단위 SCR(System Clock Reference)을 사용합니다. |

### PSI / SI / Section

서비스 정보에는 수신기가 Transport Stream을 복호화할 수 있게 하는 PSI(Program Specific Information, ISO/IEC 13818-1)와 프로그램 안내의 기반이 되는 SI(Service Information, DVB EN 300 468)가 포함됩니다.

Section은 PES에 담긴 오디오·비디오 데이터를 제외한 정보를 가리킵니다. PSI, SI, 그 밖의 일반 데이터가 여기에 해당하며, 여러 Section을 모아 하나의 Table을 구성해야 유효한 정보를 얻을 수 있습니다. `section_number`, `last_section_number`, `table_id` 같은 값은 수신기가 packet을 재조립하고 Table의 종류를 구분하는 데 사용됩니다.

## MPEG 다중화

![MPEG 다중화 과정](/images/mpeg-2-ts/multiplexing.png)

*그림 1 — MPEG 다중화*

Encoder가 만든 비디오·오디오 ES는 가변 길이로 나뉜 뒤 header가 붙어 PES(Packetized Elementary Stream) packet이 됩니다. PES header에는 영상·오디오 동기화 정보(DTS, PTS) 등이 들어갑니다. 이 PES packet을 고정 길이 payload로 나누고 header를 붙여 TS packet으로 만든 뒤, 하나의 TS stream으로 다중화합니다.

### PES / TS / PS

![PES, TS, PS의 상관 관계](/images/mpeg-2-ts/pes-ts-ps.png)

*그림 2 — PES, TS, PS의 상관 관계*

TS와 PS의 큰 차이는 기본 단위의 길이입니다. 저장용 PS는 오류가 적은 매체를 전제로 하므로 가변 길이 pack을 사용할 수 있습니다. 전송용 TS는 오류 가능성이 있는 매체에서 손실을 줄이고 재동기를 돕기 위해 packet 길이를 188 byte로 고정합니다.

수신기는 기본 4 byte TS header를 해석하고 나머지 184 byte payload를 재조립합니다. 필요에 따라 adaptation field가 추가될 수 있습니다.

![TS packet 구조](/images/mpeg-2-ts/transport-packet.png)

*그림 3 — ITU-T Rec. H.222.0 / ISO/IEC 13818 transport packet*

- **`sync_byte` (8 bit)**: `0x47`로 고정된 값이며 TS packet의 시작을 표시합니다.
- **`transport_error_indicator` (1 bit)**: 전송 packet에 오류가 있는지를 표시합니다.
- **`payload_unit_start_indicator` (1 bit)**: 현재 packet에 원본 데이터의 시작이 포함됐는지 표시하며, `continuity_counter`와 함께 재조립에 쓰입니다.
- **`transport_priority_indicator` (1 bit)**: packet의 전송 우선순위를 표시합니다.
- **`PID` (13 bit)**: payload가 어떤 데이터인지 식별해 수신기가 필요한 데이터를 구분하게 합니다.

![PID Table](/images/mpeg-2-ts/pid-table.png)

*그림 4 — PID Table*

- **`transport_scrambling_control` (2 bit)**: payload의 scrambling 여부를 표시합니다.

![Scrambling control values](/images/mpeg-2-ts/scrambling-control-values.png)

*그림 5 — Scrambling control values*

- **`adaptation_field_control` (2 bit)**: adaptation field의 유무를 표시합니다.

![Adaptation field control values](/images/mpeg-2-ts/adaptation-field-control-values.png)

*그림 6 — Adaptation field control values*

- **`continuity_counter` (4 bit)**: 같은 PID의 packet에서 1씩 증가하며, 15를 넘으면 0으로 돌아갑니다. adaptation field만 전송하는 packet에서는 증가하지 않습니다.

### ATM & TS Packet

![ATM packet으로 구성되는 TS packet](/images/mpeg-2-ts/atm-ts-packet.png)

*그림 7 — ATM packet으로 구성되는 TS packet*

TS는 ATM(Asynchronous Transfer Mode) 방식으로도 전송될 수 있습니다. ATM은 한 회선을 여러 channel로 나누어 동시에 통신하는 다중화 방식입니다. ATM packet은 5 byte header와 1 byte AAL(ATM Adaptation Layer) header, 47 byte payload로 구성되므로 TS packet 하나는 네 개의 ATM packet에 담을 수 있습니다.

## MPEG 동기화

![MPEG 동기화](/images/mpeg-2-ts/synchronization.png)

*그림 8 — MPEG 동기화*

MPEG 시스템에서 decoder의 system time은 27 MHz oscillator를 기준으로 동작합니다. 이 기준은 STC(System Time Clock)이며, 수신기는 PCR 또는 SCR을 이용해 송신 측의 기준 시각과 동기를 맞춥니다.

### STC

STC는 audio·video decoder가 공통 시간 축에서 동작하도록 하는 27 MHz 기준 시각입니다. decoder는 packet에 담긴 동기 정보를 이용해 STC를 보정합니다.

### PCR / SCR

PCR은 TS에서, SCR은 PS에서 사용하는 system clock reference입니다. 수신기는 이 값을 이용해 송신기와 수신기의 시간 차이를 보정합니다.

### DTS / PTS

DTS(Decoding Time Stamp)는 decoder가 ES를 복호화할 시점을, PTS(Presentation Time Stamp)는 화면이나 스피커에 출력할 시점을 나타냅니다. B picture처럼 복호화 순서와 출력 순서가 다른 경우 이 둘을 함께 사용합니다.

## 디지털 방송 Channel Search

### 디지털 방송 수신 과정

![위성방송 데이터 수신 구조](/images/mpeg-2-ts/broadcast-reception.png)

*그림 9 — 위성방송 데이터 수신 구조*

수신기는 tuner로 신호를 잡은 뒤 demodulator와 demultiplexer를 거쳐 TS를 얻습니다. Channel Search는 이 TS 안의 PSI/SI Table을 파싱하여 서비스와 관련 PID 정보를 구성하는 과정입니다.

### Channel Search 방법

![위성방송 서비스 Channel Search 과정](/images/mpeg-2-ts/channel-search.png)

*그림 10 — 위성방송 서비스 Channel Search 과정*

#### Tuner Locking

위성의 transponder(TP) 정보 또는 미리 저장된 TP 정보로 tuner를 설정하고, lock이 되면 TS 수신을 시작합니다.

#### PAT 파싱

PAT(Program Association Table)는 program number와 PMT PID의 연결을 제공합니다.

![Program association section](/images/mpeg-2-ts/program-association-section.png)

*그림 11 — Program association section*

#### PMT 파싱

PMT(Program Map Table)는 하나의 program에 포함된 ES와 PID, PCR PID 등의 정보를 제공합니다.

![TS program map section](/images/mpeg-2-ts/program-map-section.png)

*그림 12 — TS program map section*

#### SDT 파싱

SDT(Service Description Table)는 service name과 provider name 등 서비스 설명 정보를 제공합니다.

![Service description section](/images/mpeg-2-ts/service-description-section.png)

*그림 13 — Service description section*

### Channel Search 의사 코드

원문의 탐색 흐름은 다음과 같습니다.

```text
위성_TP_정보 = NIT_파싱 || 미리 저장된 TP정보

for (i = 0; i < 위성_TP_정보.위성_TP_개수; i++) {
    PMT_Table_개수 = PAT가 갖고 있는 PMT_Table의 개수

    for (j = 0; j < PMT_Table_개수; j++) {
        for (k = 0; k < 해당 서비스의 ES PID 개수; k++) {
            방송_PID_데이터베이스_구성();
        }
    }

    방송_PID_데이터베이스_구성();
}
```

## References

1. ISO/IEC 13818-1, *Information technology — Generic coding of moving pictures and associated audio information — Part 1: Systems*.
2. DVB EN 300 468, *Specification for Service Information (SI) in DVB systems*.
3. TTA의 디지털 방송 및 MPEG 시스템 관련 자료.
4. MPEG 시스템과 Transport Stream을 다루는 원문 참고 자료.
5. TS와 PS의 특성을 비교한 MPEG-2 System 참고 자료.
6. MPEG-2 system 관련 강의 자료.
7. Channel Search 및 PSI/SI Table 관련 원문 참고 자료.
8. 통신·방송 용어 참고 자료.
