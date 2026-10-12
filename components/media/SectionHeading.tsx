export default function SectionHeading({
  title,
  detail,
  id,
}: {
  title: string;
  detail?: string;
  id?: string;
}) {
  return (
    <header className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-border-hairline pb-3">
      <h2 id={id} className="font-headline text-headline-md text-content-bone">
        {title}
      </h2>
      {detail && (
        <p className="metadata text-[10px] text-content-fog">{detail}</p>
      )}
    </header>
  );
}
