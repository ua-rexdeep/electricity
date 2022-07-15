class HouseHold {
  constructor(id){
    this.id = id;
    this.connectedToPowerPlants = [];
    this.connectedHouseHolds = [];
  }

  addConnectedHouseHold(houseHold){
    this.connectedHouseHolds.push(houseHold);
  }

  connectToPowerPlant(powerPlant){
    this.connectedToPowerPlants.push(powerPlant);
  }

  disconnectFromPowerPlant(powerPlant){
    this.connectedToPowerPlants.splice(this.connectedToPowerPlants.indexOf(powerPlant), 1);
  }

  isHouseholdPoweredFromPowerPlants(){
    return this.connectedToPowerPlants.some(powerPlant => powerPlant.alive);
  }

  // було очікувано, що я впаду в інфініт, тримай кавун :)
  isHouseholdPoweredFromHouseholds(duplicator){
    const searchArr = this.connectedHouseHolds.filter(x=>!duplicator.has(x.id));
    return searchArr.some(houseHold => houseHold.isHouseholdPowered(duplicator));
  }

  // зробив змінну сетом, щоб запобігти падінню в інфініт, та з'єкономити на перевірках ідентичних id
  isHouseholdPowered(duplicator = new Set()){
    duplicator.add(this.id);
    return this.isHouseholdPoweredFromPowerPlants() || this.isHouseholdPoweredFromHouseholds(duplicator);
  }
}

class PowerPlant {
  constructor() {
    this.alive = true;
  }


  kill() {
    this.alive = false;
  }

  repair() {
    this.alive = true;
  }
}

export class World {
  constructor() {
    this.houseHoldNextId = 0;
  }

  createPowerPlant() {
    return new PowerPlant();
  }

  createHousehold() {
    return new HouseHold(this.houseHoldNextId++)
  }

  connectHouseholdToPowerPlant(household, powerPlant) {
    household.connectToPowerPlant(powerPlant);
  }

  connectHouseholdToHousehold(household1, household2) {
    household1.addConnectedHouseHold(household2);
    household2.addConnectedHouseHold(household1);
  }

  disconnectHouseholdFromPowerPlant(household, powerPlant) {
    household.disconnectFromPowerPlant(powerPlant);
  }

  killPowerPlant(powerPlant) {
    powerPlant.kill();
  }

  repairPowerPlant(powerPlant) {
    powerPlant.repair()
  }

  householdHasEletricity(household) {
    return household.isHouseholdPowered();
  }
}
