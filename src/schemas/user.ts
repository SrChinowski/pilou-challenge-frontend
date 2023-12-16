export enum BloodTypes {
    A_POSITIVE = "A+",
    A_NEGATIVE = "A-",
    B_POSITIVE = "B+",
    B_NEGATIVE = "B-",
    AB_POSITIVE = "AB+",
    AB_NEGATIVE = "AB-",
    O_POSITIVE = "O+",
    O_NEGATIVE = "O-"
}

export interface UserI{
    _id: String; // id de mongo
    username: String; // Nombre de usuario para el login
    name: String;
    last_name: String;
    emergency_contact: {
        name: String;
        phone: String
    };
    blood_type?: BloodTypes;
    active: Boolean;  // Estatus parta borrado lógico
    created_at?: Date; 
    metadata?: Record<string, any>;
}