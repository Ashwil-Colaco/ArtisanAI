export default function Header(){
    return(
    <div>
        
      <div className="flex items-center bg-[#353D4B] h-18 w-9/4 px-4 cursor-pointer text-[#6e7488]">
      <div className="text-xl font-bold text-shadow-xl/20 text-white px-10"><e className="hover:text-[#2ca4fa]">A</e>rtisi<e className="hover:text-[#2ca4fa]">a</e>n <e className="hover:text-[#2ca4fa]">A</e>I</div>
        <ul className="flex px-100 font-sans max-sm:pl-[1.5rem]">
          <li className="hover:text-[violet]  transition-all p-5">Home</li>
          <li className="hover:text-[violet]  transition-all p-5">Services</li>
          <li className="hover:text-[violet]  transition-all p-5">Contact</li>
        </ul>
      </div>
      </div>
    );
}