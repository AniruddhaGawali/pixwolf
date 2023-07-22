import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between">
      <img
        src="https://images.unsplash.com/photo-1685209170962-eae093d26379?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
        alt="bg"
        className="absolute -z-10 object-cover w-full h-full"
      />

      <Navbar/>


    </main>
  );
}
