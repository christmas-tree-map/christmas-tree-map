package com.christmas.acceptance;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.christmas.tree.dto.TreeCreateRequest;
import com.christmas.tree.dto.TreeGetResponse;

import io.restassured.RestAssured;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TreeAcceptanceTest extends AcceptanceFixture {

    @Order(1)
    @DisplayName("1. 트리 생성 api를 호출한다.")
    @Test
    void post_tree() {
        final TreeCreateRequest request = new TreeCreateRequest(127.11, 37.51, "int_test");
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)

                .when()
                .body(request)
                .post("/tree")

                .then()
                .log()
                .all()
                .statusCode(HttpStatus.CREATED.value());
    }

    @Order(2)
    @DisplayName("2. 트리 조회 api를 호출한다.")
    @Test
    void get_tree() {
        final Double longitude = 127.1;
        final Double latitude = 37.5;
        final List<TreeGetResponse> response =
                RestAssured
                        .given()
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .param("longitude", longitude)
                        .param("latitude", latitude)

                        .when()
                        .log()
                        .all()
                        .get("/tree/filter")

                        .then()
                        .log()
                        .all()
                        .statusCode(HttpStatus.OK.value())
                        .extract()
                        .as(List.class);
        assertThat(response).hasSize(1);
    }
}
