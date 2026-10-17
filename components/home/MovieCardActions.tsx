import MediaAccountActions from "@/components/media/MediaAccountActions";

export default function MovieCardActions({ movieId }: { movieId: number }) {
  return (
    <MediaAccountActions
      mediaType="movie"
      mediaId={movieId}
      compact
    />
  );
}
