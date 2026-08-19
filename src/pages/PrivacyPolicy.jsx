import React from 'react';

const PrivacyPolicy = () => {
  React.useEffect(() => {
    document.title = "Privacy Policy | CORx Healthcare Dubai";
    if (typeof window !== 'undefined') {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      const cleanPath = window.location.pathname.endsWith('/') && window.location.pathname !== '/'
        ? window.location.pathname.slice(0, -1)
        : window.location.pathname;
      const origin = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
        ? window.location.origin
        : 'https://corx.ae';
      canonicalLink.setAttribute('href', `${origin}${cleanPath}`);
    }
  }, []);

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-slate-200/80">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#08709d] mb-8 pb-4 border-b border-slate-200 font-['Montserrat']">
            Our Privacy Policy
          </h1>

          <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
            {/* Who we are */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat']">
                Who we are
              </h2>
              <p>
                <span className="font-semibold text-slate-900">Suggested text:</span> Our website address is:{' '}
                <a 
                  href="https://www.corx.ae" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#08709d] hover:underline font-medium"
                >
                  https://www.corx.ae
                </a>.
              </p>
            </section>

            {/* Comments */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat']">
                Comments
              </h2>
              <p>
                <span className="font-semibold text-slate-900">Suggested text:</span> When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.
              </p>
              <p>
                An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here:{' '}
                <a 
                  href="https://automattic.com/privacy/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#08709d] hover:underline font-medium break-all"
                >
                  https://automattic.com/privacy/
                </a>. After approval of your comment, your profile picture is visible to the public in the context of your comment.
              </p>
            </section>

            {/* Media */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat']">
                Media
              </h2>
              <p>
                <span className="font-semibold text-slate-900">Suggested text:</span> If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
              </p>
            </section>

            {/* Cookies */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat']">
                Cookies
              </h2>
              <p>
                <span className="font-semibold text-slate-900">Suggested text:</span> If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
              </p>
              <p>
                If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
              </p>
              <p>
                When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select &quot;Remember Me&quot;, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
              </p>
              <p>
                If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
              </p>
            </section>

            {/* Embedded content from other websites */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat']">
                Embedded content from other websites
              </h2>
              <p>
                <span className="font-semibold text-slate-900">Suggested text:</span> Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
              </p>
              <p>
                These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
              </p>
            </section>

            {/* Who we share your data with */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat']">
                Who we share your data with
              </h2>
              <p>
                <span className="font-semibold text-slate-900">Suggested text:</span> If you request a password reset, your IP address will be included in the reset email.
              </p>
            </section>

            {/* How long we retain your data */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat']">
                How long we retain your data
              </h2>
              <p>
                <span className="font-semibold text-slate-900">Suggested text:</span> If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.
              </p>
              <p>
                For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
              </p>
            </section>

            {/* What rights you have over your data */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat']">
                What rights you have over your data
              </h2>
              <p>
                <span className="font-semibold text-slate-900">Suggested text:</span> If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
              </p>
            </section>

            {/* Where your data is sent */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#08709d] font-['Montserrat']">
                Where your data is sent
              </h2>
              <p>
                <span className="font-semibold text-slate-900">Suggested text:</span> Visitor comments may be checked through an automated spam detection service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
