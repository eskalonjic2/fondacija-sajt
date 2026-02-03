export default function Tim() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Prvi dio: O našoj kulturi i organizaciji */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Ljudi iza misije</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Naša snaga nije samo u donacijama, već u ljudima koji svakodnevno rade na terenu. 
          Spojili smo stručnjake iz različitih oblasti sa jednim ciljem – napraviti stvarnu promjenu. 
          Ovo je ekipa koja pretvara viziju u djela.
        </p>
      </section>

      {/* Drugi dio: Prikaz članova tima */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-2">Naš Tim</h2>
        
        {/* Ovdje ćemo kasnije ubacivati ljude iz baze, sada je ovo samo primjer izgleda (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Primjer kartice člana tima (ovo je samo vizuelni placeholder) */}
          <div className="bg-white shadow-lg rounded-lg p-6 border text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div> {/* Mjesto za sliku */}
            <h3 className="font-bold text-lg">Ime Prezime</h3>
            <p className="text-blue-600 text-sm">Direktor fondacije</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 border text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold text-lg">Ime Prezime</h3>
            <p className="text-blue-600 text-sm">Projekt menadžer</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 border text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 className="font-bold text-lg">Ime Prezime</h3>
            <p className="text-blue-600 text-sm">Volonter</p>
          </div>

        </div>
      </section>
    </div>
  );
}