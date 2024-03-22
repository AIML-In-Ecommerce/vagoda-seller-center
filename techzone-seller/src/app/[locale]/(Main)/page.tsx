import Image from "next/image";
import logo from "../../../../public/asset/logo.png";
export default function Home() {
  return (
    <div className=" text-red underline font-bold text-center">
      <Image
        src={logo}
        width={1500}
        height={1500}
        alt="Logo"
        className="rounded-full m-1"
      />
      <Image
        src={logo}
        width={1500}
        height={1500}
        alt="Logo"
        className="rounded-full m-1"
      />
    </div>
  );
}
