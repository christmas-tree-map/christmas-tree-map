package com.christmas.common.config;

import java.io.IOException;
import java.net.ServerSocket;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.AnonymousAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import io.findify.s3mock.S3Mock;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@Profile({"local", "test-code"})
public class S3MockConfig {

    @Value("${cloud.aws.region.static}")
    private String region;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private S3Mock s3Mock;
    private int s3MockPort = 0;

    @Bean
    public S3Mock s3Mock() {
        if (s3Mock == null) {
            s3MockPort = findAvailablePort();
            s3Mock = new S3Mock.Builder()
                    .withPort(s3MockPort)
                    .withInMemoryBackend()
                    .build();
        }
        return s3Mock;
    }

    @PostConstruct
    public void start() {
        if (s3Mock == null) {
            s3MockPort = findAvailablePort();
            s3Mock = new S3Mock.Builder()
                    .withPort(s3MockPort)
                    .withInMemoryBackend()
                    .build();
        }
        s3Mock.start();
        log.info("S3 mock 서버 시작");
    }

    private int findAvailablePort() {
        try (ServerSocket socket = new ServerSocket(0)) {
            socket.setReuseAddress(true);
            return socket.getLocalPort();
        } catch (IOException e) {
            throw new IllegalStateException("사용 가능한 포트를 찾을 수 없습니다.", e);
        }
    }

    @PreDestroy
    public void stop() {
        if (s3Mock != null) {
            s3Mock.stop();
            log.info("S3 mock 서버 종료");
        }
    }

    @Bean
    @Primary
    public AmazonS3Client amazonS3Client() throws InterruptedException {
        waitForS3Mock();
        EndpointConfiguration endpoint = new EndpointConfiguration("http://localhost:" + s3MockPort, region);

        AmazonS3 client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(new AnonymousAWSCredentials()))
                .withPathStyleAccessEnabled(true)
                .withEndpointConfiguration(endpoint)
                .build();
        client.createBucket(bucketName);
        return (AmazonS3Client) client;
    }

    private void waitForS3Mock() throws InterruptedException {
        int retries = 10;
        while (retries > 0) {
            try (var socket = new java.net.Socket("localhost", s3MockPort)) {
                log.info("S3Mock 서버가 초기화되었습니다.");
                return;
            } catch (IOException e) {
                log.warn("S3Mock 서버 초기화 대기 중...");
                Thread.sleep(500);
            }
            retries--;
        }
        throw new IllegalStateException("S3Mock 서버가 초기화되지 않았습니다.");
    }
}
