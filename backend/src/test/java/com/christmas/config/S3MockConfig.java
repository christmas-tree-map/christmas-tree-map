package com.christmas.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.AnonymousAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import io.findify.s3mock.S3Mock;

@TestConfiguration
public class S3MockConfig {

    @Value("${cloud.aws.region.static}")
    private String region;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Bean
    public S3Mock s3Mock() {
        return new S3Mock.Builder()
                .withPort(8001)
                .withInMemoryBackend()
                .build();
    }

    @Bean
    @Primary
    public AmazonS3Client amazonS3Client() {
        s3Mock().start();
        EndpointConfiguration endpoint = new EndpointConfiguration("http://localhost:8001", region);

        AmazonS3 client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(new AnonymousAWSCredentials()))
                .withPathStyleAccessEnabled(true)
                .withEndpointConfiguration(endpoint)
                .build();
        client.createBucket(bucketName);
        return (AmazonS3Client) client;
    }
}
