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
    <footer className="border-t border-gray-200 py-12 xl:py-20">
      <div className="customWidth">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:justify-between xl:items-start">
          {/* Brand & Social */}
          <div className="text-center xl:text-left">
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold inline-block"
              scroll={false}
            >
              LearnLab
            </Link>

            <div className="flex justify-center xl:justify-start space-x-4 mt-4 md:mt-6">
              <Link
                href="https://www.facebook.com"
                aria-label="Facebook"
                className="text-secondary-600 hover:text-secondary-600/60 transition-colors"
              >
                <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
              </Link>

              <Link
                href="https://www.instagram.com"
                aria-label="Instagram"
                className="text-secondary-600 hover:text-secondary-600/60 transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
              </Link>

              <Link
                href="https://www.twitter.com"
                aria-label="Twitter"
                className="text-secondary-600 hover:text-secondary-600/60 transition-colors"
              >
                <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
              </Link>

              <Link
                href="https://www.linkedin.com"
                aria-label="LinkedIn"
                className="text-secondary-600 hover:text-secondary-600/60 transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
              </Link>

              <Link
                href="https://www.youtube.com"
                aria-label="YouTube"
                className="text-secondary-600 hover:text-secondary-600/60 transition-colors"
              >
                <FontAwesomeIcon icon={faYoutube} className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="text-center order-3 xl:order-2 px-4">
            <nav>
              <ul className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-y-3 sm:gap-x-6 sm:gap-y-2 font-medium text-sm">
                <li className="w-full sm:w-auto">
                  <Link
                    href="/about"
                    className="block py-1 hover:text-secondary-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li className="w-full sm:w-auto">
                  <Link
                    href="/contact"
                    className="block py-1 hover:text-secondary-600 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="w-full sm:w-auto">
                  <Link
                    href="/faq"
                    className="block py-1 hover:text-secondary-600 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li className="w-full sm:w-auto">
                  <Link
                    href="/terms"
                    className="block py-1 hover:text-secondary-600 transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li className="w-full sm:w-auto">
                  <Link
                    href="/privacy"
                    className="block py-1 hover:text-secondary-600 transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-8 text-xs text-gray-500 space-y-3 sm:space-y-2">
              <div className="block">© learnlab. All rights reserved.</div>
              <div className="flex flex-col sm:flex-row justify-center gap-y-2 sm:gap-y-0 sm:space-x-4">
                <Link
                  href="/privacy"
                  className="hover:text-gray-700 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-gray-700 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="hover:text-gray-700 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="text-center xl:text-right order-2 xl:order-3 px-4">
            <h2 className="font-bold text-base md:text-lg mb-4">
              GET INVOLVED
            </h2>
            <div className="max-w-xs mx-auto xl:mx-0 xl:max-w-sm xl:ml-auto">
              <input
                className="block border w-full rounded border-gray-300 px-3 py-2.5 md:px-4 md:py-3 text-sm placeholder-gray-400 shadow-sm  transition-colors"
                placeholder="Enter email address"
                type="email"
                name="email"
                id="newsletter-email"
              />

              <button className="w-full py-2.5 md:py-3 mt-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded transition-colors duration-200 text-xs md:text-sm">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
