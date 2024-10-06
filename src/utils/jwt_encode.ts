import { JwtPayload as JwtDecodePayload } from "jwt-decode";

export function jwt_decode(token: string): JwtDecodePayload {
  const payload = token.split('.')[1]; 
  const decodedPayload = JSON.parse(atob(payload)); 
  return decodedPayload; 
}
