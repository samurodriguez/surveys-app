import { Survey } from "../components/Survey";
import { useSurveys } from "../hooks/use-surveys";

function HomePage() {
  const surveys = useSurveys();

  return (
    <main>
      <h2>Encuestas</h2>

      <ul>
        {surveys.map((survey) => {
          return (
            <li key={survey.id}>
              <Survey survey={survey} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export { HomePage };
