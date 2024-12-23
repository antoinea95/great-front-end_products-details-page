export const FooterLinksSection = ({
  item,
}: {
  item: { title: string; links: { url: string; name: string }[] };
}) => {
  return (
    <div className="space-y-4">
      <h4 className="uppercase text-neutral-500">{item.title}</h4>
      <ul className="space-y-2">
        {item.links.map((link) => (
          <li key={link.name} className="text-neutral-600 font-medium text-base">
            <a href={link.url}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
