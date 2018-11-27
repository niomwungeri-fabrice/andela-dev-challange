class Parcel {
  constructor(id, location, destination, presentLocation, weight, ownerId, status,
    createdDate, modifiedDate) {
    this.id = id;
    this.location = location;
    this.destination = destination;
    this.presentLocation = presentLocation;
    this.weight = weight;
    this.ownerId = ownerId;
    this.status = status;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
  }
}

export default Parcel;
