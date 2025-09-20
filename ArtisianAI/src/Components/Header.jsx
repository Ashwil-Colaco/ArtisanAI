export default function Header(){
    return(
    <div>
        
      <div className="flex items-center bg-black h-18 w-9/4 px-4 cursor-pointer text-white">
      <div className="text-xl font-bold text-shadow-xl/20 text-white px-10">Artisian AI</div>
        <ul className="flex px-100 font-sans max-sm:pl-[1.5rem]">
          <li className="hover:text-[violet]  transition-all p-5">Home</li>
          <li className="hover:text-[violet]  transition-all p-5">Services</li>
          <li className="hover:text-[violet]  transition-all p-5">Contact</li>
        </ul>
      </div>
      </div>
    );
}