FROM amazonlinux:2023

# 크롬 및 유틸리티 설치
RUN dnf install -y wget unzip gzip shadow-utils \
 && wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm \
 && dnf install -y ./google-chrome-stable_current_x86_64.rpm \
 && rm -f google-chrome-stable_current_x86_64.rpm

# 크롬드라이버 설치
RUN LATEST=$(wget -qO- https://chromedriver.storage.googleapis.com/LATEST_RELEASE) \
 && wget https://chromedriver.storage.googleapis.com/${LATEST}/chromedriver_linux64.zip \
 && unzip chromedriver_linux64.zip \
 && mv chromedriver /usr/local/bin/ \
 && chmod +x /usr/local/bin/chromedriver \
 && rm chromedriver_linux64.zip

ARG JAR_FILE=build/libs/christmas-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} /treesmas-app.jar

ARG SPRING_PROFILE
ENV PROFILE_ENV=${SPRING_PROFILE}
ENTRYPOINT ["sh", "-c", "java -jar -Dspring.profiles.active=$PROFILE_ENV /treesmas-app.jar"]
