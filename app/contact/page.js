'use client';

import { useState } from 'react';

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: '주소',
    details: ['MMU Stadium, Cyberjaya', 'Selangor, Malaysia'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: '이메일',
    details: ['info@seoulphoenix.my', 'press@seoulphoenix.my'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: '전화',
    details: ['+60-3-XXXX-XXXX', '+60-3-XXXX-XXXX'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '운영 시간',
    details: ['월-금: 09:00 - 18:00 (MST)', '토: 09:00 - 13:00'],
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-20 bg-brand-black">
      {/* Page Header */}
      <section className="relative py-20 lg:py-28 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-brand-black to-brand-black" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">연락처</h1>
          <p className="text-lg text-white/60">서울피닉스에 연락하려면 아래 정보를 이용해 주세요</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-extrabold text-brand-black mb-2">연락처 정보</h2>
              <p className="text-brand-gray mb-8">
                궁금하신 사항이 있으시면 언제든지 연락해 주세요
              </p>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-red/5 flex items-center justify-center text-brand-red shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-black text-sm">{item.title}</h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-sm text-brand-gray mt-0.5">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <h3 className="font-bold text-brand-black text-sm mb-4">소셜 미디어</h3>
                <div className="flex gap-3">
                  {['YouTube', 'Instagram', 'Facebook', 'Twitter'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-brand-gray-light hover:bg-brand-red transition-colors flex items-center justify-center group"
                      aria-label={social}
                    >
                      <span className="text-xs font-bold text-brand-gray group-hover:text-white uppercase">
                        {social.charAt(0)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-extrabold text-brand-black mb-2">문의하기</h2>
              <p className="text-brand-gray mb-8">아래 양식을 작성해 주시면 빠르게 답변드리겠습니다</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-bold text-green-800 mb-2">문의가 접수되었습니다</h3>
                  <p className="text-green-600 text-sm">빠른 시일 내에 답변드리겠습니다. 감사합니다!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-1.5">
                        이름 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all text-sm"
                        placeholder="이름을 입력해주세요"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-1.5">
                        이메일 *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all text-sm"
                        placeholder="이메일을 입력해주세요"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-brand-black mb-1.5">
                      제목 *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all text-sm"
                      placeholder="문의 제목을 입력해주세요"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-1.5">
                      메시지 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all text-sm resize-none"
                      placeholder="문의 내용을 입력해주세요"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-bold rounded-xl transition-all duration-200 hover:scale-[1.01]"
                  >
                    전송하기
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
