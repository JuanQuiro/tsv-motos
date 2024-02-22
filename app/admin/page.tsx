import Admin from "../../components/admin-client";
import { auth } from '@clerk/nextjs';


const Home = () => {
  const { userId }: { userId: string | null } = auth();

  return (
    <Admin auth={userId} />
  );
};

export default Home;