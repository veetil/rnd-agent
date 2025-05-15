import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Contact - IdeaCode',
  description: 'Contact IdeaCode to learn more about our enterprise-grade orchestration layer for AI agent systems.',
};

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="grow">
        {/* Page header */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="h1 mb-4">Contact Us</h1>
                <p className="text-xl text-gray-600">
                  We'd love to hear from you. Get in touch with our team.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section className="relative">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-6 md:p-10">
                  <form>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="first-name">First Name <span className="text-red-500">*</span></label>
                        <input id="first-name" type="text" className="form-input w-full" placeholder="Enter your first name" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="last-name">Last Name <span className="text-red-500">*</span></label>
                        <input id="last-name" type="text" className="form-input w-full" placeholder="Enter your last name" required />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-500">*</span></label>
                      <input id="email" type="email" className="form-input w-full" placeholder="Enter your email address" required />
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-1" htmlFor="company">Company Name <span className="text-red-500">*</span></label>
                      <input id="company" type="text" className="form-input w-full" placeholder="Enter your company name" required />
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-1" htmlFor="subject">Subject <span className="text-red-500">*</span></label>
                      <select id="subject" className="form-select w-full" required>
                        <option value="">Please select</option>
                        <option value="general">General Inquiry</option>
                        <option value="demo">Request a Demo</option>
                        <option value="sales">Sales Question</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership Opportunity</option>
                      </select>
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-1" htmlFor="message">Message <span className="text-red-500">*</span></label>
                      <textarea id="message" rows={6} className="form-textarea w-full" placeholder="How can we help you?" required></textarea>
                    </div>
                    <div className="mt-6">
                      <button type="submit" className="btn text-white bg-primary-600 hover:bg-primary-700 w-full">
                        Send Message
                      </button>
                    </div>
                    <div className="mt-4 text-sm text-gray-500 text-center">
                      By submitting this form, you agree to our <Link href="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</Link>.
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact information */}
        <section className="relative bg-gray-100 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact details */}
                <div>
                  <h3 className="h3 mb-6">Contact Details</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-primary-600 mt-1 mr-3" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
                        <path d="M8 3.5C5.5 3.5 3.5 5.5 3.5 8S5.5 12.5 8 12.5 12.5 10.5 12.5 8 10.5 3.5 8 3.5zm0 7.5c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
                      </svg>
                      <div>
                        <div className="font-bold text-gray-800">Headquarters</div>
                        <address className="not-italic text-gray-600">
                          123 Tech Plaza<br />
                          San Francisco, CA 94105<br />
                          United States
                        </address>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-primary-600 mt-1 mr-3" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5 2h-13C.7 2 0 2.7 0 3.5v9c0 .8.7 1.5 1.5 1.5h13c.8 0 1.5-.7 1.5-1.5v-9c0-.8-.7-1.5-1.5-1.5zM14 12H2V4h12v8z" />
                        <path d="M3 5h10v1H3zM3 7h10v1H3zM3 9h5v1H3z" />
                      </svg>
                      <div>
                        <div className="font-bold text-gray-800">Email</div>
                        <a href="mailto:info@ideacode.com" className="text-primary-600 hover:text-primary-700">info@ideacode.com</a>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-primary-600 mt-1 mr-3" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5 11.5l-3-3c-.4-.4-1-.4-1.4 0l-1.2 1.2c-.2-.1-.4-.3-.7-.5-.7-.7-1.3-1.3-1.7-1.7-.4-.4-.6-.6-.7-.7L8 5.6c.4-.4.4-1 0-1.4l-3-3c-.4-.4-1-.4-1.4 0L2.2 2.5C1.7 3 1.3 3.7 1.2 4.4c-.1.8.1 1.7.5 2.6.4.9 1 1.9 1.9 2.8.9.9 1.9 1.5 2.8 1.9.7.3 1.4.5 2.1.5.2 0 .4 0 .5-.1.7-.1 1.4-.5 1.9-1l1.2-1.2c.4-.4.4-1 0-1.4zM13.2 13c-.4.4-.9.6-1.4.7-.6.1-1.3-.1-2-.4-.8-.3-1.7-.9-2.5-1.7s-1.4-1.7-1.7-2.5c-.3-.7-.5-1.4-.4-2 .1-.5.3-1 .7-1.4l.9-.9 3 3-.8.8c-.1.1-.1.2-.1.3.1.2.3.5.7.9.4.4 1 1 1.7 1.7.4.4.7.6.9.7.1 0 .2 0 .3-.1l.8-.8 3 3-.9.9z" />
                      </svg>
                      <div>
                        <div className="font-bold text-gray-800">Phone</div>
                        <a href="tel:+1-555-123-4567" className="text-primary-600 hover:text-primary-700">+1 (555) 123-4567</a>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Office hours */}
                <div>
                  <h3 className="h3 mb-6">Office Hours</h3>
                  <table className="w-full text-left">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-medium">Monday - Friday</td>
                        <td className="py-3">9:00 AM - 6:00 PM (PST)</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 font-medium">Saturday</td>
                        <td className="py-3">Closed</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium">Sunday</td>
                        <td className="py-3">Closed</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-6">
                    <h4 className="font-bold text-gray-800 mb-2">Technical Support</h4>
                    <p className="text-gray-600">
                      For technical support, please email <a href="mailto:support@ideacode.com" className="text-primary-600 hover:text-primary-700">support@ideacode.com</a> or visit our <Link href="/docs" className="text-primary-600 hover:text-primary-700">documentation</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}