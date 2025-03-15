const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-achieve-green to-achieve-bluepurple  pb-5 flex justify-center items-center relative px-5 overflow-hidden">
      <h1 className="text-achieve-grey text-sm font-bold pt-3 z-10">
        Achieve Your Health Goals, One Step at a Time.
      </h1>
      <img
        src="/icon.svg"
        alt="Logo"
        className="pt-3 absolute right-10 bottom-0 w-40 h-70 transform translate-x-1/2 translate-y-1/2"
      />
    </div>
  );
};

export default Footer;
