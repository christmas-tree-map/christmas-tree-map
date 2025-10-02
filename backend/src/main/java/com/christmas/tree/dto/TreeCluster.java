package com.christmas.tree.dto;

import com.christmas.common.dto.Coordinate;
import com.christmas.tree.repository.TreeEntity;
import java.util.List;

public record TreeCluster(Coordinate center, List<TreeEntity> members) {

}
