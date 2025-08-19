import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-20">
      <div className="customWidth">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="">
            <Link href="/" className="text-xl font-bold" scroll={false}>
              Learnlab
            </Link>

            <div className="flex space-x-4 mt-8">
              <Link
                href="https://www.facebook.com"
                aria-label="Facebook"
                className="text-secondary-600 hover:text-secondary-600/60"
              >
                <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
              </Link>

              <Link
                href="https://www.instagram.com"
                aria-label="Instagram"
                className="text-secondary-600 hover:text-secondary-600/60"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
              </Link>

              <Link
                href="https://www.twitter.com"
                aria-label="Twitter"
                className="text-secondary-600 hover:text-secondary-600/60"
              >
                <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
              </Link>

              <Link
                href="https://www.linkedin.com"
                aria-label="LinkedIn"
                className="text-secondary-600 hover:text-secondary-600/60"
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
              </Link>

              <Link
                href="https://www.youtube.com"
                aria-label="YouTube"
                className="text-secondary-600 hover:text-secondary-600/60"
              >
                <FontAwesomeIcon icon={faYoutube} className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col ">
            <nav className="">
              <ul className="flex font-semibold justify-center space-x-6">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/terms">Terms</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
              </ul>
            </nav>
            <div className="mt-8 text-center text-sm text-gray-500 flex justify-center space-x-4">
              <span>© learnlab. All rights reserved.</span>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/cookies">Cookie Policy</Link>
            </div>
          </div>

          <div>
            <h2 className="font-bold mb-3">GET INVOLVED</h2>
            <div>
              <input
                className="block border w-full rounded border-gray-300 px-4 py-3 placeholder-gray-400 shadow-lg focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter email adress"
                type="email"
                name=""
                id=""
              />

              <button className="cursor-pointer hover:bg-secondary-600 bg-secondary-500 w-full py-2.5 font-semibold transition-all text-white font-Inter duration-300  rounded mt-3">
                SUBSCRIBE{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
