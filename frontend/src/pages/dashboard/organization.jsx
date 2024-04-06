import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";

export default function Dashboard() {
  return(
    <main>
      <Layout>
        <main className="text-dark-brown">
          <h1 className="text-[24px] font-medium mb-[50px]">Organization</h1>
          <Dropdown />
        </main>
      </Layout>
    </main>
  );
}