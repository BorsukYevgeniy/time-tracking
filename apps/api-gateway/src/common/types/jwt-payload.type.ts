import { Role } from "@contracts/users";

export type JwtPayload = {
  id: number;
  role: Role;
}