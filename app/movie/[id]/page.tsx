import Navbar from '@/components/navbar';
import MovieDetail from '@/components/movie-detail';
import Footer from '@/components/footer';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  const movieId = parseInt(id) || 1;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <MovieDetail id={movieId} />
      </main>
      <Footer />
    </div>
  );
}
