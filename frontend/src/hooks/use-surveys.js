import { useEffect, useState } from "react";

function useSurveys() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      const res = await fetch("http://localhost:3000/surveys");
      const body = await res.json();
      setSurveys(body.data.surveys);
    };

    fetchSurveys();
  }, []);

  return surveys;
}

export { useSurveys };
