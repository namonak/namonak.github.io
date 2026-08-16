---
title: "[Software Development] CI/CD 모범 사례"
description: "CI/CD 파이프라인을 구축하고 운영할 때의 21가지 모범 사례를 정리합니다."
publishedAt: 2024-01-11
category: "software-development"
tags: ["ci-cd", "devops", "automation", "deployment"]
---

> 원문: [CI/CD Best Practices](https://medium.com/@sushantkapare1717/ci-cd-best-practices-9c4164f65421)

1. **자동화(Automate Everything)**: 빌드, 테스트, 배포 과정 전체를 자동화합니다.
2. **버전 관리(Version Control)**: 코드베이스 관리를 위해 버전 관리 시스템(예: Git)을 사용합니다.
3. **단일 저장소(Single Repository)**: 관련 코드와 설정 파일을 단일 저장소에 유지합니다.
4. **빌드 자동화(Build Automation)**: 자동 빌드를 트리거하는 빌드 자동화 도구(예: Jenkins, Travis CI, GitLab CI)를 사용합니다.
5. **자동화된 테스팅(Automated Testing)**: 자동으로 실행되는 유닛, 통합, 종단간 테스트를 포함한 종합적인 테스트 스위트를 구현합니다.
6. **병렬 테스팅(Parallel Testing)**: 테스트 시간을 단축하고 개발자에게 빠른 피드백을 제공합니다.
7. **빠른 빌드와 테스트(Fast Builds and Tests)**: 빠른 피드백 루프를 통해 문제를 빠르게 식별하고 해결합니다.
8. **아티팩트 관리(Artifact Management)**: 빌드 아티팩트를 중앙 저장소에서 관리합니다.
9. **환경 일치(Environment Parity)**: 개발, 테스트, 생산 환경을 가능한 유사하게 유지합니다.
10. **코드로서의 인프라(Infrastructure as Code, IaC)**: 인프라를 코드로 정의합니다.
11. **구성 관리(Configuration Management)**: 환경 구성을 관리하는 도구를 사용합니다.
12. **지속적 배포 vs. 지속적 전달(Continuous Delivery vs. Continuous Deployment)**: 두 접근법을 이해하고 자신의 출시 프로세스에 가장 적합한 방법을 선택합니다.
13. **점진적 배포(Incremental Deployment)**: 작은 변경 사항을 배포하여 버그 도입 위험을 줄입니다.
14. **기능 플래그(Feature Flags)**: 런타임에 기능을 활성화하거나 비활성화합니다.
15. **모니터링 및 로깅(Monitoring and Logging)**: 테스트 및 생산 환경에서 강력한 모니터링과 로깅을 구현합니다.
16. **보안 스캐닝(Security Scanning)**: CI/CD 파이프라인에 보안 스캔을 통합합니다.
17. **롤백 전략(Rollback Strategies)**: 생산에 문제를 일으킨 배포를 빠르고 안전하게 이전 버전으로 롤백할 수 있어야 합니다.
18. **보안 고려사항(Security Considerations)**: CI/CD 파이프라인에 보안 검사를 통합합니다.
19. **문서화(Documentation)**: CI/CD 파이프라인 문서를 최신 상태로 유지합니다.
20. **협업 및 커뮤니케이션(Collaboration and Communication)**: 협업과 커뮤니케이션 문화를 촉진합니다.
21. **재해 복구 계획(Disaster Recovery Plan)**: 배포 과정에서 예상치 못한 실패로부터 빠르게 회복할 수 있는 재해 복구 계획을 마련합니다.

## 핵심 요약

- **자동화의 중요성**: CI/CD 프로세스의 모든 단계(빌드, 테스트, 배포)를 자동화하여 효율성과 속도를 높입니다.
- **환경 일치 및 보안**: 개발, 테스트, 생산 환경을 유사하게 유지하고, 보안 스캔과 검사를 통합하여 보안 취약점을 조기에 식별 및 수정합니다.
- **협업 및 지속적인 개선**: 팀원 간의 협업과 커뮤니케이션을 강화하고, 지속적인 모니터링과 피드백을 통해 지속적으로 CI/CD 파이프라인을 개선합니다.

## 용어 정리

- **CI/CD**: 지속적 통합(Continuous Integration) 및 지속적 배포(Continuous Deployment)의 약어로, 소프트웨어 개발 프로세스에서 코드 변경사항을 자동으로 빌드, 테스트, 배포하는 접근법을 의미합니다.
- **아티팩트(Artifact)**: 소프트웨어 빌드 과정에서 생성된 파일(예: 컴파일된 바이너리, 라이브러리)을 의미합니다.
- **IaC(Infrastructure as Code)**: 인프라 구성 요소를 코드 형태로 관리하여, 인프라의 배포와 관리를 자동화하는 방식입니다.
- **기능 플래그(Feature Flags)**: 소프트웨어의 특정 기능을 켜거나 끌 수 있는 설정을 의미합니다.
