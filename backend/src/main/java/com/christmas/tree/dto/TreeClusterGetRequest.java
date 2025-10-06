package com.christmas.tree.dto;

import com.christmas.common.dto.Coordinate;

public record TreeClusterGetRequest(int zoom, Coordinate topRight, Coordinate bottomLeft) {
}
