import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import RevealSection from "../components/RevealSection";
import { FaArrowRight, FaProjectDiagram } from "react-icons/fa";

// Funkcija za dobijanje PROJEKATA (ne novosti)
async function getProjects() {
  const { data: projects, error } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "project") // <--- OVO JE KLJUČNO: Filtriramo samo projekte
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Greška pri učitavanju projekata:", error);
    return [];
  }
  return projects || [];
}

export const revalidate = 0; // Osigurava da se podaci osvježe pri svakom ulasku

export default async function Projekti() {
  const projekti = await getProjects();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        
        {/* Header */}
        <RevealSection>
            <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Naši Projekti
            </h1>
            <div className="h-1 w-24 bg-green-600 mx-auto rounded"></div>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Pregled humanitarnih akcija, izgradnje i inicijativa koje smo uspješno realizovali.
            </p>
            </div>
        </RevealSection>

        {/* Grid Projekata */}
        <RevealSection>
            {projekti.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projekti.map((project: any) => (
                <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 group flex flex-col">
                    {/* Slika */}
                    <div className="h-56 bg-gray-200 relative overflow-hidden">
                        {project.image_url ? (
                        <img 
                            src={project.image_url} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                        />
                        ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            <FaProjectDiagram className="text-5xl opacity-30" />
                        </div>
                        )}
                        <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            PROJEKAT
                        </div>
                    </div>
                    
                    {/* Sadržaj */}
                    <div className="p-8 flex flex-col flex-grow">
                    <div className="text-xs text-green-600 font-bold mb-2">
                        {new Date(project.created_at).toLocaleDateString('hr-BA')}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition">
                        {project.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 mb-6 flex-grow">
                        {project.content ? project.content.substring(0, 120) + "..." : "..."}
                    </p>
                    
                    {/* Klik vodi na isti template kao blog post, što je OK */}
                    <Link href={`/projekti/${project.slug || project.id}`} className="inline-flex items-center font-bold text-green-700 hover:text-green-900 transition mt-auto">
                        Saznaj više <FaArrowRight className="ml-2 text-sm" />
                    </Link>
                    </div>
                </div>
                ))}
            </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <FaProjectDiagram className="mx-auto text-6xl text-gray-300 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-400">Uskoro</h3>
                    <p className="text-gray-500">Trenutno nemamo objavljenih projekata.</p>
                </div>
            )}
        </RevealSection>

      </div>
    </div>
  );
}