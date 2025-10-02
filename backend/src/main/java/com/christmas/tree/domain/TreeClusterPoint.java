package com.christmas.tree.domain;

import com.christmas.tree.repository.TreeEntity;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.commons.math3.ml.clustering.Clusterable;

@Getter
@RequiredArgsConstructor
public class TreeClusterPoint implements Clusterable {

    private final TreeEntity treeEntity;
    private final double[] point; // [latitude, longitude]

    public TreeClusterPoint(TreeEntity treeEntity) {
        this.treeEntity = treeEntity;
        this.point = new double[]{
                treeEntity.getLocation().getY(),
                treeEntity.getLocation().getX()
        };
    }

    @Override
    public double[] getPoint() {
        return point;
    }
}
