import getDate from "./getDate";

export const UserRole = {
    Admin: "ADMIN",
    Volunteer: "VOLUNTEER",
    Student: "STUDENT",
};

export const REQUEST_TYPE = {
    Medical: "MEDICAL",
    Monetary: "MONETARY",
};

export const REQUIREMENT = {
    Beds: "Hospital Beds",
    Plasma: "Plasma",
    Medicine:"Medicine",
    Oxygen:"Oxygen"
};

export const DomainMap = {
    Student :"smail.iitm.ac.in",
    Faculty: "iitm.ac.in",
    Alumni:"alumni.iitm.ac.in"
}

export { getDate };
