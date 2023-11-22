
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { BiLogoPinterestAlt } from "react-icons/bi";
import logo from "../assets/logo.jpeg";

function Footer() {
  const iconsTab = [
    { icon: <FaFacebookF /> },
    { icon: <AiOutlineTwitter /> },
    { icon: <AiFillYoutube /> },
    { icon: <BiLogoPinterestAlt /> },
  ];
  return (
    <>
      <footer className="bg-white">
        <div className="container mx-auto  py-[10rem]">
          {/* footer div all */}
          <div className="flex justify-between flex-col md:flex-row  items-center md:items-start  md:gap-[5rem] text-left">
            {/* logo side */}
            <div className="flex flex-col w-1/2 md:p-0 py-4 gap-8">
              <img
                src={ logo}
                alt="footer_logo"
                className="w-[18rem]  rounded-full"
              />
              <p className="text-[15px] font-medium text-[#646464]">
                Order delicious food online with Eat Ease. Explore a variety of
                cuisines and satisfy your cravings with our fast and reliable
                food delivery service.
              </p>
              {/* socials */}
              <div className="flex gap-7 text-[18px] text-[#646464] justify-center md:justify-start">
                {iconsTab.map(({ icon }, index) => {
                  return (
                    <div
                      key={index}
                      className="text-2xl bg-[#efefef] p-2 rounded-full hover:bg-[#ff7403] hover:text-white"
                      style={{ transition: "all 0.3s" }}
                    >
                      {icon}
                    </div>
                  );
                })}
              </div>
              <p className="text-[16px] font-medium text-[#646464]">
                Privacy Policy | © {new Date().getFullYear()} Eat Ease <br />{" "}
                {/* Design by{" "} */}
                {/* <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.radiustheme.com/"
                >
                  RadiusTheme
                </a> */}
              </p>
            </div>

            {/* middle div */}
            <div className="flex flex-col gap-8 relative">
              <p className="text-[22px] font-bold footer-main">Our Food Categories</p>

              <span className="top-[33px] absolute w-[7rem] h-[4px] bg-[#ff7403]"></span>

              <p className="text-[16px] hover:text-[#ff7403] cursor-pointer text-[#646464] font-medium hover:font-bold">
                Fast Food
              </p>
              <p className="text-[16px] hover:text-[#ff7403] cursor-pointer text-[#646464] font-medium hover:font-bold">
                Italian Cuisine
              </p>
              <p className="text-[16px] hover:text-[#ff7403] cursor-pointer text-[#646464] font-medium hover:font-bold">
                Asian Delights
              </p>
              <p className="text-[16px] hover:text-[#ff7403] cursor-pointer text-[#646464] font-medium hover:font-bold">
                Healthy Options
              </p>
              <p className="text-[16px] hover:text-[#ff7403] cursor-pointer text-[#646464] font-medium hover:font-bold">
                Desserts and Sweets
              </p>
            </div>

            {/* right div */}
            <div className="flex flex-col gap-8 relative">
              <p className="text-[22px] font-bold footer-main">Delivery Hours</p>

              <span className="top-[33px] absolute w-[7rem] h-[4px] bg-[#ff7403]"></span>

              <p className="text-[16px]  text-[#646464] font-bold">
                Monday - Sunday:
              </p>
              <p className="text-[16px] text-[#646464] font-medium">
                10:00am - 10:00pm
              </p>
            </div>

            {/* middle div */}
            <span></span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
