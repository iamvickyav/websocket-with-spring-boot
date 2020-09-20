# WebSocket-Sample

Developed based on https://github.com/only2dhir/spring-websocket-without-stomp

This code is developed on top of  SpringBoot Websocket sample developed by Spring Official Team - https://spring.io/guides/gs/messaging-stomp-websocket/

Added posting of messages using @RestController instead of @SendTo annotation

## How to run

### Build the application

```java
> ./mvnw clean package
> ./mvnw spring-boot:run
```

### Connect with the socket

Once application go started, visit http://localhost:8080

### ws Connection URL

```java
ws://localhost:8080/orderStatus
```

