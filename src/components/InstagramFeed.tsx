import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  X,
  Share2,
  Calendar
} from 'lucide-react';
import { CLINIC_INFO, INSTAGRAM_POSTS } from '../data/clinicData';
import { InstagramPost } from '../types';

export const InstagramFeed: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  const categories = ['All', 'Smile Makeover', 'Painless RCT', 'Scaling & Cleaning', 'Clinic & Team'];

  const filteredPosts = activeCategory === 'All' 
    ? INSTAGRAM_POSTS 
    : INSTAGRAM_POSTS.filter(p => p.category === activeCategory);

  return (
    <section id="instagram-feed" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Instagram Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs mb-10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            {/* Profile info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <div className="relative">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"
                    alt="Dr. Rohan Gupta Instagram Profile"
                    className="w-full h-full object-cover rounded-full border-2 border-white"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 bg-gradient-to-tr from-rose-500 to-purple-600 text-white p-1 rounded-full shadow-xs">
                  <Instagram className="w-3 h-3" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-0.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    @{CLINIC_INFO.instagramHandle}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-slate-500 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[11px] font-medium text-slate-600">Official</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-medium text-slate-600">
                  {CLINIC_INFO.name} • Dr. Rohan Gupta
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-3 mt-1.5 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    Bada Bazar, Rohtak
                  </span>
                  <span>•</span>
                  <span>Clinical Case Studies</span>
                </div>
              </div>
            </div>

            {/* Direct Follow on Instagram CTA */}
            <div className="shrink-0">
              <a
                id="follow-instagram-btn"
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-pink-300" />
                <span>Follow on Instagram</span>
                <ExternalLink className="w-3 h-3 text-blue-200" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>LIVE CLINICAL CASES & CLINIC LIFE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
              Latest from Our Instagram
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Real patient smiles, before-and-after cases, and painless treatment insights in Rohtak
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Instagram Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Instagram Hover Overlay */}
              <div 
                className="relative aspect-square overflow-hidden cursor-pointer bg-slate-100"
                onClick={() => setSelectedPost(post)}
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badge: Category */}
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-950/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {post.category}
                  </span>
                </div>

                {/* Top Right: Instagram icon badge */}
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-xs text-white p-1.5 rounded-full">
                  <Instagram className="w-3.5 h-3.5" />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold text-sm backdrop-blur-[2px]">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5 fill-white" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-5 h-5 fill-white" />
                    {post.comments}
                  </span>
                </div>
              </div>

              {/* Card Footer: Caption & Interaction */}
              <div className="p-4 sm:p-5 flex flex-col justify-between grow">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-slate-700">@{CLINIC_INFO.instagramHandle}</span>
                    <span>{post.date}</span>
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.caption}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    View Case Details →
                  </button>

                  <a
                    href={CLINIC_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-pink-600 transition-colors p-1"
                    title="View on Instagram"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All on Instagram Footer Strip */}
        <div className="mt-12 text-center">
          <a
            href={CLINIC_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white border border-slate-300 hover:border-pink-300 text-slate-700 hover:text-pink-600 px-6 py-3 rounded-full font-bold text-sm shadow-xs transition-all"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>See more live procedures & patient cases on @{CLINIC_INFO.instagramHandle}</span>
          </a>
        </div>

      </div>

      {/* Post Detail Lightbox Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200"
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                    <img
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80"
                      alt="Doctor Profile"
                      className="w-full h-full object-cover rounded-full bg-white"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">
                      @{CLINIC_INFO.instagramHandle}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Bada Bazar, Rohtak • {selectedPost.category}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div className="bg-black flex items-center justify-center max-h-[360px] md:max-h-[420px]">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.caption}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Caption and Action Details */}
                <div className="p-5 flex flex-col justify-between bg-white text-sm">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        {selectedPost.category}
                      </span>
                      <span className="text-xs text-slate-400">{selectedPost.date}</span>
                    </div>

                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed max-h-56 overflow-y-auto pr-1">
                      {selectedPost.caption}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1.5 text-rose-600">
                        <Heart className="w-4 h-4 fill-rose-600" />
                        {selectedPost.likes} Likes
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <MessageCircle className="w-4 h-4" />
                        {selectedPost.comments} Comments
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <a
                      href={CLINIC_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white py-2.5 px-4 rounded-lg font-bold text-xs shadow-xs hover:opacity-95 transition-opacity"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Open on Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
