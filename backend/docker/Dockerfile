FROM amazoncorretto:17

ARG JAR_FILE=build/libs/christmas-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /christmas-app.jar

ARG SPRING_PROFILE
ENV PROFILE_ENV=${SPRING_PROFILE}
ENTRYPOINT ["sh", "-c", "java -jar -Dspring.profiles.active=${PROFILE_ENV} /christmas-app.jar"]
