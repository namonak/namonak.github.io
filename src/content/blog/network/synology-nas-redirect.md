---
title: "[Synology NAS] 리다이렉트(redirect) 설정"
description: "Synology DSM 6.x에서 nginx 설정으로 HTTP 요청을 HTTPS로 리다이렉트하는 방법을 정리합니다."
publishedAt: 2019-08-26
category: "network"
tags: ["synology", "nas", "nginx", "redirect", "https"]
---

Synology DSM 6.x에서 도메인 포워딩 또는 리다이렉트를 설정하는 방법입니다. 예를 들어 `http://wiki.joannes.kr` 요청을 `https://wiki.joannes.kr`로 보내고 싶을 때 사용할 수 있습니다.

## 설정 파일 열기

`/usr/syno/share/nginx`로 이동한 뒤 `WWWService.mustache` 파일을 편집합니다.

```bash
cd /usr/syno/share/nginx
sudo vi WWWService.mustache
```

원문에는 파일 경로가 `WWWService.musrache`로 표기되어 있었지만, 아래 설정 예시와 DSM nginx 템플릿의 파일명에 맞춰 `WWWService.mustache`를 사용합니다.

## 리다이렉트 서버 블록 추가

대상 도메인에 맞는 server block을 추가합니다.

```nginx
server {
    server_name wiki.joannes.kr;
    return 301 https://$server_name$request_uri;
}
```

`301`은 영구 리다이렉트입니다. `$request_uri`를 함께 사용하므로 도메인뿐 아니라 요청한 경로와 query string도 유지됩니다.

## nginx 다시 시작

설정을 저장한 뒤 nginx 서비스를 다시 시작합니다.

```bash
sudo synoservice --restart nginx
```

설정 적용 후 `http://wiki.joannes.kr`에 접속해 HTTPS 주소로 이동하는지 확인합니다.
