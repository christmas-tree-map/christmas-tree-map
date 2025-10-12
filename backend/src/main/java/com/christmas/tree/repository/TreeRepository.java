package com.christmas.tree.repository;

import com.christmas.tree.dto.TreeWithDistanceProjection;
import java.util.List;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TreeRepository extends JpaRepository<TreeEntity, Long> {

    @Query(value = """
        SELECT 
            t.id AS id,
            ST_Distance_Sphere(t.location, ST_GeomFromText(:point, 4326)) AS distance,
            ST_Y(t.location) AS longitude,
            ST_X(t.location) AS latitude,
            t.image_code AS imageCode
        FROM tree t
        WHERE ST_X(t.location) BETWEEN :blLatitude AND :trLatitude
              AND ST_Y(t.location) BETWEEN :blLongitude AND :trLongitude
        ORDER BY distance ASC
        """, nativeQuery = true)
    List<TreeWithDistanceProjection> getWithinBoundsOrderByAscWithDistance(@Param("point") String point, @Param("trLongitude") double trLongitude, @Param("trLatitude") double trLatitude,
                                                                           @Param("blLongitude") double blLongitude, @Param("blLatitude") double blLatitude);

    default List<TreeWithDistanceProjection> findByLocationWithinBoundsOrderByAscWithDistance(Point now, Point topRight, Point bottomLeft) {
        final String wktPoint = "POINT(" + now.getY() + " " + now.getX() + ")";
        return getWithinBoundsOrderByAscWithDistance(wktPoint, topRight.getX(), topRight.getY(), bottomLeft.getX(), bottomLeft.getY());
    }

    @Query(value = """
            SELECT * FROM tree
            WHERE ST_X(location) BETWEEN :blLatitude AND :trLatitude
              AND ST_Y(location) BETWEEN :blLongitude AND :trLongitude;
            """, nativeQuery = true)
    List<TreeEntity> findAllWithinBounds(@Param("trLongitude") double trLongitude, @Param("trLatitude") double trLatitude,
                                         @Param("blLongitude") double blLongitude, @Param("blLatitude") double blLatitude);
}
