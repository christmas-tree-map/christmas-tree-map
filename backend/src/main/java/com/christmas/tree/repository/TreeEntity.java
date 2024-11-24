package com.christmas.tree.repository;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import org.locationtech.jts.geom.Point;

import com.christmas.common.application.TimestampEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "tree")
public class TreeEntity extends TimestampEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "location", nullable = false, columnDefinition = "GEOMETRY")
    private Point location;

    @Column(name = "image_code", nullable = false)
    private String imageCode;

    public TreeEntity(final Point location, final String imageCode) {
        this.location = location;
        this.imageCode = imageCode;
    }
}
