import { auth } from "@clerk/nextjs";
import Admin from "../../components/admin-client-yummy";


const Home = () => {
  const { userId }: { userId: string | null } = auth();


  return (
    <Admin userId={userId} />
  );
};

export default Home;