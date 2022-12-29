// This type declaration must be declared to avoid external files role's errors
export type IRole = "anonymous" | "developer" | "admin" | "user";

type IRoles = { [key: string]: IRole };

// Declare all the system roles here
const roles: IRoles = {
  ANONYMOUS: "anonymous",
  DEVELOPER: "developer",
  ADMIN: "admin",
  USER: "user",
};

// Export 'ALL_ROLES' for policies that doesn't have role filters
// Anonymous is not taken in count in 'ALL_ROLES'
const ALL_ROLES: IRole[] = [];
for (const key in roles) {
  if (roles[key] !== roles.ANONYMOUS) ALL_ROLES.push(roles[key]);
}

export { roles, ALL_ROLES };
