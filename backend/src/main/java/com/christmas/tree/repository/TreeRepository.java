package com.christmas.tree.repository;

import java.util.List;

import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TreeRepository extends JpaRepository<TreeEntity, Long> {

    @Query(value = "SELECT t FROM TreeEntity AS t " +
                   "WHERE ST_CONTAINS(ST_BUFFER(:location, :range), t.location)" +
                   "ORDER BY ST_DISTANCE(t.location, :location) ASC")
    List<TreeEntity> findByLocationInRangeOrderByAsc(@Param("location") Point location, @Param("range") int range);
}
