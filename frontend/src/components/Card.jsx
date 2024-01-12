import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";

const Card = ({ data }) => {
  const { company, logo, role, pay, location, skills, xp, degree, applyLink } = data;

  return (
    <section className="text-primary m-5 border-2 border-solid border-gray-300 p-2 cursor-pointer relative">
      <Link to={"/"} className="flex gap-4 flex-col sm:flex-row items-start">
        <img src={logo} alt="" className="h-20 w-20" />

        <div className="">
          <h4 className="mb-1 font-semibold text-left">{company}</h4>
          <h3 className="font-semibold mb-2 text-left">{role}</h3>
          <h2 className=" text-left flex items-center gap-2">
            <GiMoneyStack /> {pay}
          </h2>
          <div className="flex flex-wrap gap-4 mb-2">
            {xp && <span className="flex items-center gap-2"><IoBriefcaseOutline /> {xp}</span>}
            <span className="flex items-center gap-2"><IoBriefcaseOutline /> {degree}</span>
            <span className="flex items-center gap-2"><CiLocationOn /> {location} </span>
          </div>
        </div>
      </Link>

      {/* Apply Button */}
      <a href={applyLink} className="absolute top-8 transform -translate-y-1/2 right-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-spark hover:text-black">
        Apply
      </a>
    </section>
  );
};

export default Card;
