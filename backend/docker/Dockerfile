FROM amazoncorretto:17

# 크롬 및 유틸리티 설치
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    curl \
    gnupg \
    && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt install -y ./google-chrome-stable_current_amd64.deb \
    && rm google-chrome-stable_current_amd64.deb

# 크롬드라이버 설치
RUN CHROME_DRIVER_VERSION=$(curl -sSL https://chromedriver.storage.googleapis.com/LATEST_RELEASE) \
    && curl -sSL https://chromedriver.storage.googleapis.com/${CHROME_DRIVER_VERSION}/chromedriver_linux64.zip -o chromedriver.zip \
    && unzip chromedriver.zip \
    && mv chromedriver /usr/local/bin/chromedriver \
    && chmod +x /usr/local/bin/chromedriver \
    && rm chromedriver.zip

ARG JAR_FILE=build/libs/christmas-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /treesmas-app.jar

ARG SPRING_PROFILE
ENV PROFILE_ENV=${SPRING_PROFILE}
ENTRYPOINT ["sh", "-c", "java -jar -Dspring.profiles.active=$PROFILE_ENV /treesmas-app.jar"]
