import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full flex justify-center mb-4">
      <p className="flex items-center flex-wrap justify-center">&copy; 2024, Npm Checker is a free tool made with
        <Heart className="text-[#C12127] h-5 w-5 mx-1" fill="#C12127" />  by
        <Link className="text-[#C12127] ml-1" href="https://www.linkedin.com/in/ian-duhamel/">{" "} Ian Duhamel</Link>
      </p>
    </footer>
  )
}
