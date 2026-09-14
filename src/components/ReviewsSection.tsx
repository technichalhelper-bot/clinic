import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle, ShieldCheck, ThumbsUp } from 'lucide-react';
import { GOOGLE_REVIEWS, CLINIC_INFO } from '../data/clinicData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trustindex style header banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          {/* Google G icon badge & Trustindex style verification */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-900 mb-4">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span className="text-blue-950 font-bold">Google Verified Reviews</span>
            <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded text-[10px] font-bold">100% Genuine</span>
          </div>

          {/* Heading requested: "EXCELLENT - Based on Google Reviews" */}
          <h2
            id="reviews-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 tracking-tight mb-2"
          >
            EXCELLENT - Based on Google Reviews
          </h2>

          {/* Star rating summary */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-800 text-lg">{CLINIC_INFO.googleRating} out of 5</span>
            <span className="text-slate-500 text-sm">({CLINIC_INFO.totalReviews} verified patient ratings)</span>
          </div>
        </motion.div>

        {/* 3-4 clean review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GOOGLE_REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              id={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
              className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* User info row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${review.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight flex items-center gap-1">
                        {review.name}
                        {review.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 shrink-0" />
                        )}
                      </h4>
                      <p className="text-[11px] text-slate-400">{review.timeAgo}</p>
                    </div>
                  </div>

                  {/* Google logo badge */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                </div>

                {/* 5-star rating */}
                <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
                  "{review.text}"
                </p>
              </div>

              {/* Bottom verification footnote */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-blue-700 font-medium">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  Verified Patient
                </span>
                <span>Google Review</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Patient Satisfaction Callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="mt-10 bg-blue-50/70 border border-blue-200 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                Join Hundreds of Happy & Smiling Families in Rohtak
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Transparent consultation, no surprise charges, and gentle painless care.
              </p>
            </div>
          </div>
          <a
            href="https://google.com/search?q=Shree+Bhagwati+Dental+Clinic+Rohtak"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-4 shrink-0"
          >
            Read All Reviews on Google →
          </a>
        </motion.div>
      </div>
    </section>
  );
};
