/**
 * This function checks for invalid annotation shapes.
 * 
 * @param feature containing the video annotation to check
 * @returns true, if a video annotation has an invalid shape, otherwise false.
 * 
 * **/
let isInvalidShape = function (feature) {
    let geometry = feature.getGeometry();
    let points = [];
    switch (geometry.getType()) {
        case 'Circle':
            return parseInt(geometry.getRadius()) === 0;
        case 'LineString':
            points = geometry.getCoordinates();
            return (new Set(points.map(xy => String([xy])))).size < 2;
        case 'Rectangle':
        case 'Ellipse':
            points = geometry.getCoordinates()[0];
            return (new Set(points.map(xy => String([xy])))).size !== 4;
        case 'Polygon':
            points = geometry.getCoordinates()[0];
            return (new Set(points.map(xy => String([xy])))).size < 3;
        default:
            return false;
    }
};

/**
 * Clamps a value in an inclusive interval
 * @param value The value to clamp
 * @param min Lower bound
 * @param max Upper bound
 * @returns Lower or upper bound if the value is outside of the bounds, otherwise just the value
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

export {isInvalidShape, clamp};