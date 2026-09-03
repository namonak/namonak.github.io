---
title: "[Linux] Process Address"
description: "Linux 프로세스 주소 공간의 코드·데이터·힙·스택 영역과 VmSize·VmRSS를 확인하는 C 예제를 정리합니다."
publishedAt: 2020-08-10
category: "linux"
tags: ["linux", "process", "virtual-memory", "memory", "thread", "c"]
draft: false
---

프로그램은 실행 가능한 바이너리와, 바이너리 실행에 필요한 라이브러리 같은 데이터로 구성됩니다. 사용자가 프로그램을 실행하면 커널은 CPU와 메모리 자원을 할당하고, 프로그램은 프로세스로 실행됩니다.

프로세스에는 [Process Address Space 구조](https://jhnyang.tistory.com/32)에 따라 코드·데이터·힙·스택 영역으로 나뉜 메모리 영역이 할당됩니다.

## 스레드와 주소 공간

프로세스가 실행 중 스레드를 생성하면 코드·데이터·힙 메모리 영역은 공유합니다. 각 스레드에는 별도의 스택 메모리만 생성됩니다.

Linux 커널은 프로세스가 요청한 메모리에 가상 메모리 주소 공간을 할당하고, 실제 메모리는 사용하는 시점에 할당합니다. 아래 `memory.c` 예제로 프로세스의 가상 메모리 크기(`VmSize`)와 실제 메모리 사용량(`VmRSS`)을 확인할 수 있습니다.

스레드가 과도하게 생성되거나, 사용이 끝난 스레드 자원이 정리되지 않으면 실제 시스템 메모리가 충분하더라도 스택 메모리를 할당할 가상 메모리 주소 공간이 부족할 수 있습니다. 이 경우 JVM은 `java.lang.OutOfMemoryError: thread creation failed`를 출력하고 새 스레드를 위한 스택 메모리를 할당하지 못합니다.

## VmSize와 VmRSS 확인 예제

```c
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <string.h>

#define MEGA_BYTE 1048576

int checkMemory(int *pVmSize, int *pVmRss) {
    char buf[1024];

    sprintf(buf, "/proc/%d/status", getpid());
    FILE *  fp = fopen(buf, "r");
    if (fp == NULL) {
        return -1;
    }

    while (fgets(buf, 1024, fp) != NULL) {
        if (strstr(buf,"VmSize")) {
            char tmp[32];
            char size[32];
            sscanf(buf, "%s%s", tmp, size);
            *pVmSize = atoi(size);
        }
        else if (strstr(buf,"VmRSS")) {
            char tmp[32];
            char size[32];
            sscanf(buf, "%s%s", tmp, size);
            *pVmRss = atoi(size);
            break;
        }
    }

    fclose(fp);

    return 0;
}

int main(void) {
    int *ptr = NULL;
    int *pVmSize = NULL, *pVmRss = NULL;
    int i = 1;

    pVmSize = (int *)malloc(sizeof(int));
    pVmRss = (int *)malloc(sizeof(int));
    ptr = (int *)malloc(100 * MEGA_BYTE);

    while(1) {
        checkMemory(pVmSize, pVmRss);
        printf(" VmSize : %dn", *pVmSize);
        printf(" VmRSS : %dn", *pVmRss);
        if (*pVmRss < 100 * MEGA_BYTE / 1024) {
            memset(ptr, 0x00, i * 10 * MEGA_BYTE);
            i++;
        } else {
            free(ptr);
            ptr = (int *)malloc(100 * MEGA_BYTE);
            i = 0;
        }
        sleep(1);
    }

    free(pVmSize);
    free(pVmRss);
    free(ptr);

    return 0;
}
```

> 참고: 위 코드는 원문에 기록된 형태를 보존한 예제입니다. 특히 출력 문자열의 `n`은 줄바꿈 이스케이프인 `\n`이 아니라 원문 그대로입니다.
