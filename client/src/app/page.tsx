import DataRender from "./datarender";
import SignOut from "./signout";
import Ping from "./ping";
import Signin from "./signin";
import RefreshToken from "./refreshtoken";

export default async function Home() {
  return (
    <main className="p-5 flex flex-col justify-center gap-2 ">
      <Signin />
      <SignOut />
      <RefreshToken />
      <Ping />

      <div className="bg-blue-500 p-5">
        <DataRender />
      </div>
    </main>
  );
}
