FROM zenika/alpine-chrome

# Java 17 설치
RUN apk add --no-cache openjdk17

ARG JAR_FILE=build/libs/christmas-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /treesmas-app.jar

ARG SPRING_PROFILE
ENV PROFILE_ENV=${SPRING_PROFILE}
ENTRYPOINT ["sh", "-c", "java -jar -Dspring.profiles.active=$PROFILE_ENV /treesmas-app.jar"]
