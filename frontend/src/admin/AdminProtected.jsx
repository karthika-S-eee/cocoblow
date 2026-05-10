import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    const verifyAdmin = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/admin/verify",
          {
            withCredentials: true,
          }
        );

        if (res.data.isAdmin) {
          setIsAdmin(true);
        }

      } catch (error) {

        console.log(error);

        setIsAdmin(false);

      } finally {

        setLoading(false);

      }

    };

    verifyAdmin();

  }, []);

  // LOADING
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // NOT ADMIN
  if (!isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  // ADMIN ACCESS
  return children;
};

export default AdminProtected;