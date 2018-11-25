class Parcel {
  constructor(id, location, destination, presentLocation, length, width, height, ownerId, status,
    createdDate, modifiedDate) {
    this.id = id;
    this.location = location;
    this.destination = destination;
    this.presentLocation = presentLocation;
    this.length = length;
    this.width = width;
    this.height = height;
    this.ownerId = ownerId;
    this.status = status;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
  }
}

export default Parcel;
