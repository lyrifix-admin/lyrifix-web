import MultipleSelector from "~/components/ui/multiselect";
import type { Option } from "~/components/ui/multiselect";
import type { Artist } from "~/schemas/artist";

type MultiselectArtistsProps = {
  data: Artist[];
  name?: string;
  id?: string;
  placeholder?: string;
  className?: string;
};

export default function MultiselectArtists({
  data,
  placeholder,
  className,
}: MultiselectArtistsProps) {
  const options: Option[] = data.map((artist) => ({
    value: artist.id,
    label: artist.name,
  }));

  return (
    <div className="*:not-first:mt-2">
      <MultipleSelector
        className={className}
        placeholder={placeholder || "Select artists"}
        defaultOptions={options}
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
        commandProps={{ label: "Select artists" }}
      />
    </div>
  );
}
