export const EventSummary = props => {
  const { title } = props;

  return (
    <section className="w-full h-60 md:h-72">
      <h1 className="text-center md:text-6xl text-4xl font-mono font-normal py-12">{title}</h1>
    </section>
  );
};
