import React from "react";
import useThemeContext from "../../hooks/useThemContext";

const Terms = () => {
  const { theme } = useThemeContext();

  const bgColor = theme === "light" ? "bg-base-100" : "bg-gray-800";
  const textColor = theme === "light" ? "text-gray-900" : "text-white";
  const cardBg = theme === "light" ? "bg-white" : "bg-gray-700";
  const sectionBg = theme === "light" ? "bg-gray-50" : "bg-gray-700";

  return (
    <div className={`${bgColor} transition-colors duration-300 min-h-screen`}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#654ea3] to-[#eaafc8] py-12">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold">Terms & Conditions</h1>
          <p className="text-lg mt-2">Last updated: March 1, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className={`${cardBg} p-8 rounded-lg shadow-lg max-w-4xl mx-auto`}>
          {/* Section 1 */}
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              1. Acceptance of Terms
            </h2>
            <p className={`${textColor} opacity-80 mb-4 leading-relaxed`}>
              By accessing and using ScholarStream, you accept and agree to be
              bound by the terms and provision of this agreement. If you do not
              agree to abide by the above, please do not use this service.
              ScholarStream reserves the right to make changes to these terms
              and conditions at any time.
            </p>
          </div>

          {/* Section 2 */}
          <div className={`${sectionBg} p-6 rounded-lg mb-8`}>
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              2. User Eligibility & Responsibilities
            </h2>
            <ul className={`${textColor} opacity-80 space-y-3 ml-6 list-disc`}>
              <li>
                You must be at least 18 years old or have parental consent to
                use ScholarStream
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account information
              </li>
              <li>
                You agree to provide accurate and truthful information during
                registration
              </li>
              <li>
                You are responsible for all activities that occur under your
                account
              </li>
              <li>
                You agree not to use ScholarStream for any unlawful or
                prohibited purposes
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              3. Scholarship Information
            </h2>
            <p className={`${textColor} opacity-80 mb-4 leading-relaxed`}>
              While we strive to provide accurate and up-to-date scholarship
              information, ScholarStream does not guarantee the accuracy,
              completeness, or timeliness of all information provided.
              Scholarship details are subject to change without notice. It is
              the user's responsibility to verify all information directly with
              the scholarship providers before application.
            </p>
          </div>

          {/* Section 4 */}
          <div className={`${sectionBg} p-6 rounded-lg mb-8`}>
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              4. Intellectual Property Rights
            </h2>
            <p className={`${textColor} opacity-80 leading-relaxed`}>
              All content on ScholarStream, including but not limited to text,
              graphics, logos, images, and software, is the property of
              ScholarStream or its content suppliers and is protected by
              international copyright laws. Unauthorized reproduction or use of
              any content is prohibited.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              5. Limitation of Liability
            </h2>
            <p className={`${textColor} opacity-80 mb-4 leading-relaxed`}>
              ScholarStream shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of or inability to use the service, even if we have been
              advised of the possibility of such damages. Our liability is
              limited to the fees paid by you during the last twelve months.
            </p>
          </div>

          {/* Section 6 */}
          <div className={`${sectionBg} p-6 rounded-lg mb-8`}>
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              6. Acceptable Use Policy
            </h2>
            <p className={`${textColor} opacity-80 mb-3`}>
              You agree not to use ScholarStream to:
            </p>
            <ul className={`${textColor} opacity-80 space-y-2 ml-6 list-disc`}>
              <li>Violate any applicable laws or regulations</li>
              <li>Engage in harassment, abuse, or discrimination</li>
              <li>Transmit malware or harmful code</li>
              <li>Attempt to gain unauthorized access to systems or data</li>
              <li>Create or use multiple accounts for fraudulent purposes</li>
              <li>Spam or send unsolicited messages</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              7. Privacy & Data Protection
            </h2>
            <p className={`${textColor} opacity-80 leading-relaxed`}>
              Your use of ScholarStream is also governed by our Privacy Policy.
              We protect your personal information in accordance with applicable
              data protection laws. By using ScholarStream, you consent to the
              collection and use of your information as outlined in our Privacy
              Policy.
            </p>
          </div>

          {/* Section 8 */}
          <div className={`${sectionBg} p-6 rounded-lg mb-8`}>
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              8. Third-Party Links
            </h2>
            <p className={`${textColor} opacity-80 leading-relaxed`}>
              ScholarStream may contain links to third-party websites and
              services. We are not responsible for the content, accuracy, or
              practices of these external sites. Your use of third-party
              services is subject to their terms and conditions. We recommend
              reviewing their privacy and terms policies before providing any
              personal information.
            </p>
          </div>

          {/* Section 9 */}
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              9. Termination
            </h2>
            <p className={`${textColor} opacity-80 leading-relaxed`}>
              ScholarStream reserves the right to terminate or suspend your
              account at any time if you violate these terms or engage in
              fraudulent or illegal activity. Upon termination, your right to
              use ScholarStream will immediately cease.
            </p>
          </div>

          {/* Section 10 */}
          <div className={`${sectionBg} p-6 rounded-lg mb-8`}>
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              10. Governing Law
            </h2>
            <p className={`${textColor} opacity-80 leading-relaxed`}>
              These terms and conditions are governed by and construed in
              accordance with the laws of Bangladesh, and you irrevocably submit
              to the exclusive jurisdiction of the courts located therein.
            </p>
          </div>

          {/* Section 11 */}
          <div className="mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              11. Modifications to Service
            </h2>
            <p className={`${textColor} opacity-80 leading-relaxed`}>
              ScholarStream reserves the right to modify or discontinue the
              service with or without notice. We shall not be liable to you or
              any third party for any modification, suspension, or
              discontinuation of the service.
            </p>
          </div>

          {/* Section 12 */}
          <div className={`${sectionBg} p-6 rounded-lg mb-8`}>
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>
              12. Contact Us
            </h2>
            <p className={`${textColor} opacity-80 leading-relaxed`}>
              If you have any questions about these Terms & Conditions, please
              contact us at:
            </p>
            <div className={`${textColor} mt-3 space-y-1`}>
              <p>
                <strong>Email:</strong> legal@scholarstream.com
              </p>
              <p>
                <strong>Address:</strong> 123 Education Street, Dhaka 1000,
                Bangladesh
              </p>
              <p>
                <strong>Phone:</strong> +880 1234-567890
              </p>
            </div>
          </div>

          {/* Agreement Acknowledgment */}
          <div className="bg-gradient-to-r from-[#654ea3]/10 to-[#eaafc8]/10 p-6 rounded-lg text-center">
            <p className={`${textColor} text-sm font-semibold`}>
              By accessing and using ScholarStream, you acknowledge that you
              have read, understood, and agree to be bound by all of these Terms
              & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
