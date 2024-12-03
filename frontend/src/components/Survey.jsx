function Survey({ survey }) {
  return (
    <article>
      <h3>{survey.title}</h3>

      <ul>
        {survey.options.map((option) => {
          return <li key={option.id}>{option.text}</li>;
        })}
      </ul>
    </article>
  );
}

export { Survey };
