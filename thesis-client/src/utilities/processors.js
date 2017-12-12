import Polyline from "@mapbox/polyline";

export function createPolyline(tripWayPoints) {
  if (tripWayPoints.length > 23) {
    const interval = Math.floor(tripWayPoints.length / 23);
    const indicesToSave = Array(23).fill(interval);

    for (let i = 1; i < indicesToSave.length; i++) {
      indicesToSave[i] = indicesToSave[i - 1] + indicesToSave[i];
    }

    tripWayPoints = tripWayPoints.filter((wayPoint, index) => {
      if (indicesToSave.indexOf(index) > - 1) {
        return true;
      }
      return false;
    });
  }
  return Polyline.encode(tripWayPoints);
}

export function aSecondOne() {

}
