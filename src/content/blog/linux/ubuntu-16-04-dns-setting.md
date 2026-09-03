---
title: "[Ubuntu 16.04] DNS 설정"
description: "Ubuntu 16.04에서 resolvconf의 base 파일로 DNS 서버를 설정하고 변경사항을 반영하는 방법을 정리합니다."
publishedAt: 2020-08-09
category: "linux"
tags: ["ubuntu", "ubuntu-16-04", "dns", "resolvconf", "network"]
draft: false
---

일반적인 Linux 환경에서는 `/etc/resolv.conf` 파일에 DNS 주소를 설정합니다. 그러나 Ubuntu는 12.04부터 `/etc/resolvconf` 디렉터리와 `/etc/network/interfaces` 등의 설정을 종합하여 `/etc/resolv.conf`를 덮어씁니다.

따라서 아래처럼 `/etc/resolvconf` 디렉터리에 있는 `base` 파일에 DNS 서버를 설정하면 `/etc/resolv.conf`에도 해당 설정이 반영됩니다.

```text
$ cat /etc/resolvconf/resolv.conf.d/base
nameserver 208.67.222.222
```

수정 후에는 다음 명령으로 DNS 변경사항을 시스템에 반영합니다.

```bash
sudo resolvconf -u
```

> 참고: 이 방법은 Ubuntu 16.04 환경을 기준으로 한 기록입니다. 이후 Ubuntu 릴리스에서는 `systemd-resolved`나 Netplan 등 다른 DNS 관리 방식을 사용할 수 있습니다.
