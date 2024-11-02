// hoc/withRole.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { getUser, getUserRole } from "@/utils/user";

interface User {
  role: string;
}

interface WithRoleProps {
  allowedRoles: string[];
}

const withRole = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[],
): React.FC<Omit<P, keyof WithRoleProps>> => {
  const WithRoleComponent: React.FC<Omit<P, keyof WithRoleProps>> = (props) => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchUserRole = async () => {
        const userRole = await getUserRole()
        if (userRole) {
          setUserRole(userRole);
        } else {
          setUserRole(null);
        }
        setLoading(false);
      };

      fetchUserRole();
    }, []);

    if (loading) return <Loader2 className="animate-spin size-5" />;

    if (!allowedRoles.includes(userRole || "")) {
      return null
    }

    return <WrappedComponent {...(props as P)} />;
  };

  // Set displayName for better debugging
  WithRoleComponent.displayName = `withRole(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithRoleComponent;
};

export default withRole;
