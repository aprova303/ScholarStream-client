import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const { user } = useAuth();

  const {
    isLoading: roleLoading,
    data: roleData = {},
    error: roleError,
    isError,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return { role: "Student" };
      }

      try {
        const res = await axios.get(`/users/${user?.email}/role`);
        return res.data;
      } catch (error) {
        console.error("Error fetching user role:", error);
        // Default to Student role on error
        return { role: "Student" };
      }
    },
    enabled: !!user?.email,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });

  const role = roleData?.role || "Student";

  return {
    role,
    roleLoading,
    roleError,
    isError,
  };
};

export default useRole;
