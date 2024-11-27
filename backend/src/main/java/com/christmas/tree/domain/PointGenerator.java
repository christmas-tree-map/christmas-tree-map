package com.christmas.tree.domain;

import java.util.Map;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;

import com.christmas.tree.exception.PointOutOfRangeException;
import com.christmas.tree.exception.code.TreeErrorCode;

public class PointGenerator {

    private static final int SRID = 4326;
    private static final int MIN_LATITUDE = -180;
    private static final int MAX_LATITUDE = 180;
    private static final int MIN_LONGITUDE = -90;
    private static final int MAX_LONGITUDE = 90;

    private PointGenerator() {}

    public static Point generate(final Double latitude, final Double longitude) {
        final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), SRID);
        if (latitude < MIN_LATITUDE || latitude > MAX_LATITUDE) {
            throw new PointOutOfRangeException(
                    TreeErrorCode.INVALID_LOCATION,
                    Map.of("latitude", latitude.toString())
            );
        }
        if (longitude < MIN_LONGITUDE || longitude > MAX_LONGITUDE) {
            throw new PointOutOfRangeException(
                    TreeErrorCode.INVALID_LOCATION,
                    Map.of("longitude", longitude.toString())
            );
        }
        return geometryFactory.createPoint(new Coordinate(latitude, longitude));
    }
}
