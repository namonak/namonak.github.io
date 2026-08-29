---
title: "[macOS, Big Sur] VirtualBox Kernel driver not installed (rc=-1908) 해결"
description: "macOS Big Sur에서 VirtualBox 실행 시 Kernel driver not installed (rc=-1908) 오류를 해결한 방법입니다."
publishedAt: 2021-03-05
category: "macos"
tags: ["macos", "big-sur", "virtualbox"]
---

macOS Big Sur 에서 Virtual Box를 이용해 Ubuntu 16.04 LTS를 설치하는 중에 다음과 같은 에러가 발생하였습니다.

`Kernel driver not installed (rc=-1908)`

`Make sure the kernel module has been loaded successfully.`

`where: suplibOsInit what: 3 VERR_VM_DRIVER_NOT_INSTALLED (-1908) - The support driver is not installed. On linux, open returned ENOENT.`

![](/images/virtualbox-kernel-driver-not-installed.png)

위 문제를 해결하기 위해서는 '시스템 환경 설정 > 보안 및 개인 정보 보호 > 일반 탭'으로 이동하여 'Oracle America, Inc'에 대한 허용을 선택하고 시스템을 재시작 해야 합니다.

![](/images/virtualbox-security-privacy-allow.png)

다만, 허용 옵션을 활성화 하기 위해서는 Virtual Box의 재설치가 필요합니다.

> <https://download.virtualbox.org/virtualbox/6.1.18/VirtualBox-6.1.18-142142-OSX.dmg>

> **Note:** This option is available only for roughly 30 minutes after a fresh install of VirtualBox. If this message does not appear, uninstall VirtualBox by opening your “Applications” folder and then dragging the VirtualBox app to the Trash. Remove any leftover files, reinstall a fresh copy of VirtualBox, and immediately open the Security & Privacy menu to see this option.
>
> **Reference**: [How to Fix VirtualBox’s “Kernel Driver Not Installed (rc=-1908)” Error on a Mac](https://www.howtogeek.com/658047/how-to-fix-virtualboxs-%E2%80%9Ckernel-driver-not-installed-rc-1908-error/)

시스템 재시작이 완료되면 Virtual Box를 실행 후 가상 머신이 정상적으로 실행되는지 확인합니다.
