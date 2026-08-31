---
title: "[Ubuntu 16.04] 고정 IP 설정"
description: "Ubuntu 16.04의 /etc/network/interfaces에서 고정 IP를 설정하고 networking 서비스를 재시작·확인하는 절차를 정리합니다."
publishedAt: 2020-08-21
category: "linux"
tags: ["ubuntu", "networking", "static-ip", "linux"]
draft: false
---

이 글은 `ifupdown`과 `/etc/network/interfaces`를 사용하던 Ubuntu 16.04 환경을 기준으로 고정 IP를 설정한 기록입니다.

## `/etc/network/interfaces` 설정

`/etc/network/interfaces` 파일에 사용할 인터페이스와 IP 정보를 추가합니다.

```conf
# interfaces(5) file used by ifup(8) and ifdown(8)
auto lo
iface lo inet loopback

#### SET Static IP ######
auto eth0
iface eth0 inet static
address 10.50.1.111
netmask 255.255.254.0
gateway 10.50.0.1
dns-nameservers 8.8.8.8 8.8.4.4
```

## networking 서비스 재시작

설정을 저장한 뒤 networking 서비스를 다시 시작합니다.

```bash
sudo systemctl restart networking.service
```

재시작 중 오류가 발생하면 `/etc/network/interfaces`의 인터페이스 이름과 IP 설정을 다시 확인합니다. 서비스 상태와 부팅 시 자동 시작 여부는 다음 명령으로 확인할 수 있습니다.

```bash
sudo systemctl status networking.service
sudo systemctl enable networking.service
```

> 참고: 이후 Ubuntu 버전은 Netplan 또는 다른 네트워크 관리 방식을 사용할 수 있습니다. 이 글의 설정 방식은 Ubuntu 16.04의 `ifupdown` 기반 환경에 해당합니다.
