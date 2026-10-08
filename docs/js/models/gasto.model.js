

export class GastoCombustible {
    constructor (gastoViaje) {
        this.id = gastoViaje.id;
        this.vehicleType = gastoViaje.vehicleType;
        this.date = new Date(gastoViaje.date);
        this.kilometers = gastoViaje.kilometers;
        this.precioViaje = gastoViaje.precioViaje;
    }
}

// export class GastoCombustible {
//     constructor (id, vehicleType, date, kilometers, precioViaje) {
//         this.id = id;
//         this.vehicleType = vehicleType;
//         this.date = date;
//         this.kilometers = kilometers;
//         this.precioViaje = precioViaje;
//     }
// }