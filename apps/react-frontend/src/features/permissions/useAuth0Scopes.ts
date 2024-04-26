import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import namespacedClaim from "./namespacedClaim";

/** An effect that returns the Auth0 roles of the authenticated user, if there are any. */
export default function useAuth0Roles() {
  const [roles, setRoles] = useState<string[]>([]);
  const { getIdTokenClaims, isAuthenticated } = useAuth0();
  const roleKey = namespacedClaim("roles");

  useEffect(() => {
    const fetchRoles = async () => {
      console.log("Fetching");
      const token = await getIdTokenClaims();
      if (!token || !(roleKey in token)) {
        console.log("nothin");
        setRoles([]);
        return;
      }

      console.log(`Found ${JSON.stringify(token)}`);
      console.log(`Found ${token[roleKey]}`);
      setRoles(token[roleKey]);
    };
    fetchRoles();
  }, [getIdTokenClaims, roleKey, isAuthenticated]);

  return { roles };
}
