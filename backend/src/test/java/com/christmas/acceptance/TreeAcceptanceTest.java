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
        final TreeCreateRequest request = new TreeCreateRequest(127.124300, 37.286500, "int_test");
        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)

                .when()
                .body(request)
                .post("/api/tree")

                .then()
                .log()
                .all()
                .statusCode(HttpStatus.CREATED.value());
    }

    @Order(2)
    @DisplayName("2. 트리 조회 api를 호출한다.")
    @Test
    void get_tree() {
        final Double longitude = 127.110800;
        final Double latitude = 37.255000;
        final Double trLongitude = 127.13055655573426;
        final Double trLatitude = 37.29507057088285;
        final Double blLongitude = 127.08715150311343;
        final Double blLatitude = 37.21113323112043;
        final List<TreeGetResponse> response =
                RestAssured
                        .given()
                        .contentType(MediaType.APPLICATION_JSON_VALUE)
                        .param("longitude", longitude)
                        .param("latitude", latitude)
                        .param("tr_longitude", trLongitude)
                        .param("tr_latitude", trLatitude)
                        .param("bl_longitude", blLongitude)
                        .param("bl_latitude", blLatitude)

                        .when()
                        .log()
                        .all()
                        .get("/api/tree/in-bounds")

                        .then()
                        .log()
                        .all()
                        .statusCode(HttpStatus.OK.value())
                        .extract()
                        .as(List.class);
        assertThat(response).hasSize(1);
    }
}
