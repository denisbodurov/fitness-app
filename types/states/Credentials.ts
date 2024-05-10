export interface Credentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: "male" | "female" | "";
    dob: Date;
    weight: number,
    height: number,
}