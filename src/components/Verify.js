import { useEffect } from "react";
import { verify } from "../utils/API";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const code = searchParams.get("code");

  useEffect(() => {
    setLoading(true);
    verify(code).then((res) => {
      if (res.error) {
        setError(true);
        setLoading(false);
        return;
      }
      setSuccess(true);
      setLoading(false);
      return;
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      if (error) {
        navigate({
          pathname: "/",
          search: `?verify=false`,
        });
        return;
      }

      if (success) {
        navigate({
          pathname: "/",
          search: `?verify=true`,
        });
        return;
      }
    }
  }, [loading]);

  return <div />;
};

export default Verify;
