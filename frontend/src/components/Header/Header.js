function Header() {
  return (
    <div className="w-full bg-black flex justify-center items-center p-3 border-b border-white/10">
      <img src="/logoRD.ico" alt="RD Station Logo" className="h-6" />
      <span className="text-white text-lg font-bold ml-2 ">RD Station</span>
    </div>
  );
}

export default Header;