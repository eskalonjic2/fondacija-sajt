export default function Kontakt() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Kontaktirajte nas</h1>
      <form className="flex flex-col gap-4 max-w-md">
        <input type="text" placeholder="Vaše ime" className="border p-2" />
        <input type="email" placeholder="Vaš email" className="border p-2" />
        <textarea placeholder="Poruka" className="border p-2" rows={4}></textarea>
        <button className="bg-blue-600 text-white p-2">Pošalji</button>
      </form>
    </div>
  );
}