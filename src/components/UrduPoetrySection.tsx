import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Copy, Check, Share2, Shuffle, Quote, BookOpen } from 'lucide-react';

/* =========================================================================
   Urdu Poetry Data (12 Original Couplets / اشعار)
   Fonts used: 'Jameel Noori Nastaleeq', with 'Noto Nastaliq Urdu' fallback.
   Local font file target: /public/fonts/JameelNooriNastaleeq.ttf
   ========================================================================= */

export interface UrduSher {
  id: number;
  title: string;
  category: 'all' | 'ishq' | 'khudi' | 'mehnat' | 'waqt' | 'ummeed' | 'zindagi';
  categoryLabel: string;
  misra1: string;
  misra2: string;
}

export const URDU_POETRY_LIST: UrduSher[] = [
  {
    id: 1,
    title: 'عشق کا سرور',
    category: 'ishq',
    categoryLabel: 'عشق',
    misra1: 'تیری نگاہ میں دیکھا ہے زندگی کا سرور',
    misra2: 'تیرے بغیر یہ گلشن بھی خار زار لگا',
  },
  {
    id: 2,
    title: 'امید کی سحر',
    category: 'ummeed',
    categoryLabel: 'امید',
    misra1: 'سیاہ رات کے دامن سے پھوٹے گی سحر',
    misra2: 'دیے جلا کے ہوا کے مقابل آ تو سہی',
  },
  {
    id: 3,
    title: 'عزمِ خودی',
    category: 'khudi',
    categoryLabel: 'خودی',
    misra1: 'جو خود کو جان لے طوفاں سے کب ڈرا ہے وہ',
    misra2: 'چٹان بن کے سمندر کے رخ بدلتا ہے',
  },
  {
    id: 4,
    title: 'محنت کا ثمر',
    category: 'mehnat',
    categoryLabel: 'محنت',
    misra1: 'پسینے سے جو سینچے گئے چمن کے پھول',
    misra2: 'وہی تو وقت کے ماتھے کا تاج بنتے ہیں',
  },
  {
    id: 5,
    title: 'قیمتِ وقت',
    category: 'waqt',
    categoryLabel: 'وقت',
    misra1: 'گزرتے لمحوں کی رفتار کو ذرا پہچان',
    misra2: 'ہر ایک سانس سنہری نوید لاتی ہے',
  },
  {
    id: 6,
    title: 'فلسفۂ زیست',
    category: 'zindagi',
    categoryLabel: 'زندگی',
    misra1: 'سفر ہے زیست کا کانٹوں پہ مسکرانے کا',
    misra2: 'قدم قدم پہ نیا راستہ بنانے کا',
  },
  {
    id: 7,
    title: 'نگاہِ شوق',
    category: 'ishq',
    categoryLabel: 'عشق',
    misra1: 'دلوں کی بات زباں کی محتاج کب رہی',
    misra2: 'نگاہِ شوق نے سارا فسانہ کہہ ڈالا',
  },
  {
    id: 8,
    title: 'ذوقِ جستجو',
    category: 'khudi',
    categoryLabel: 'خودی',
    misra1: 'سکوتِ جھیل میں دریا کی رو تلاش کرو',
    misra2: 'تڑپ رہے جو رگوں میں وہ لہو تلاش کرو',
  },
  {
    id: 9,
    title: 'روشنی کا سفر',
    category: 'ummeed',
    categoryLabel: 'امید',
    misra1: 'مصیبتوں کے اندھیرے بھی چھٹ ہی جاتے ہیں',
    misra2: 'جو باوقار رہا وہ کبھی نہیں ہارا',
  },
  {
    id: 10,
    title: 'پروازِ فکر',
    category: 'mehnat',
    categoryLabel: 'محنت',
    misra1: 'بلند ہوتی ہیں سوچیں تو پر نکلتے ہیں',
    misra2: 'زمین والوں کے رستے فلک سے ملتے ہیں',
  },
  {
    id: 11,
    title: 'کل کائنات',
    category: 'ishq',
    categoryLabel: 'عشق',
    misra1: 'ترے وجود سے منسوب ہیں مری خوشیاں',
    misra2: 'ترا خیال ہی اب میری کل کائنات بنا',
  },
  {
    id: 12,
    title: 'نویدِ بہار',
    category: 'zindagi',
    categoryLabel: 'زندگی',
    misra1: 'بدلتی رت کا یہ پیغام سن رہا ہے کوئی',
    misra2: 'خزاں کے بعد بہاروں کے خواب بن رہا ہے کوئی',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'سبھی کلام' },
  { key: 'ishq', label: 'عشق و محبت' },
  { key: 'khudi', label: 'خودی و حوصلہ' },
  { key: 'ummeed', label: 'امید و روشنی' },
  { key: 'mehnat', label: 'محنت و کامیابی' },
  { key: 'waqt', label: 'وقت' },
  { key: 'zindagi', label: 'زندگی' },
] as const;

export const UrduPoetrySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState<number>(0);

  const featuredSher = URDU_POETRY_LIST[featuredIndex];

  const filteredList = selectedCategory === 'all'
    ? URDU_POETRY_LIST
    : URDU_POETRY_LIST.filter((sher) => sher.category === selectedCategory);

  const handleCopy = (sher: UrduSher) => {
    const textToCopy = `*${sher.title}*\n\n${sher.misra1}\n${sher.misra2}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(sher.id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch((err) => {
      console.error('Failed to copy text', err);
    });
  };

  const getWhatsAppShareUrl = (sher: UrduSher) => {
    const text = `🌸 *${sher.title}* 🌸\n\n${sher.misra1}\n${sher.misra2}\n\n— اردُو شاعری`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  const pickRandomFeatured = () => {
    let nextIdx = Math.floor(Math.random() * URDU_POETRY_LIST.length);
    if (nextIdx === featuredIndex) {
      nextIdx = (nextIdx + 1) % URDU_POETRY_LIST.length;
    }
    setFeaturedIndex(nextIdx);
  };

  return (
    <section id="urdu-poetry" className="py-32 bg-[#FFFBF8] px-6 md:px-12 relative overflow-hidden">
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-rose-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header (Urdu Nastaleeq Script) */}
        <div className="text-center mb-16" dir="rtl" lang="ur">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-50 border border-rose-200/70 shadow-sm text-romantic-gold mb-6"
          >
            <BookOpen className="w-4 h-4 text-romantic-gold" />
            <span className="text-[12px] font-bold tracking-widest text-romantic-heading font-nastaleeq">
              ادبی گوشہ • اردو شاعری
            </span>
            <Sparkles className="w-3.5 h-3.5 text-romantic-red" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-nastaleeq text-romantic-heading leading-[2] mb-4 drop-shadow-sm"
          >
            اردو شاعری
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-romantic-paragraph font-nastaleeq max-w-2xl mx-auto leading-[2.2] opacity-90"
          >
            دل کے جذبات، فکر و شعور اور محبت کے انمٹ فلسفوں کا ایک خوبصورت ادبی نذرانہ
          </motion.p>
        </div>

        {/* Featured "Sher of the Day" (شعرِ امروز) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 max-w-4xl mx-auto"
          dir="rtl"
          lang="ur"
        >
          <div className="bg-gradient-to-br from-white via-[#FFF9F5] to-rose-50/40 border-2 border-romantic-gold/40 rounded-[3rem] p-8 md:p-14 shadow-xl shadow-amber-100/30 relative overflow-hidden group">
            {/* Decorative Gold Top Trim */}
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-romantic-gold via-rose-400 to-romantic-gold" />
            
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-romantic-gold/15 border border-romantic-gold/40 text-romantic-heading">
                <Quote className="w-3.5 h-3.5 text-romantic-gold rotate-180" />
                <span className="font-nastaleeq text-sm font-bold text-amber-900 leading-[1.8]">
                  منتخب کلام • {featuredSher.categoryLabel}
                </span>
              </div>

              <button
                onClick={pickRandomFeatured}
                title="نیا شعر دیکھیں"
                className="inline-flex items-center gap-1.5 text-xs text-romantic-paragraph hover:text-romantic-red transition-colors px-3 py-1.5 rounded-full bg-white/80 border border-rose-100 shadow-sm cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span className="font-nastaleeq text-xs">اگلا شعر</span>
              </button>
            </div>

            <h3 className="text-xl md:text-2xl font-nastaleeq text-romantic-gold font-bold mb-4 text-center">
              {featuredSher.title}
            </h3>

            {/* Couplet Body with Guaranteed Nastaleeq Line Height */}
            <div className="text-center my-6 space-y-2">
              <p className="font-nastaleeq text-2xl sm:text-3xl md:text-4xl text-romantic-heading font-medium leading-[2.4] px-4">
                {featuredSher.misra1}
              </p>
              <div className="w-16 h-px bg-romantic-gold/40 mx-auto my-2" />
              <p className="font-nastaleeq text-2xl sm:text-3xl md:text-4xl text-romantic-heading font-medium leading-[2.4] px-4">
                {featuredSher.misra2}
              </p>
            </div>

            {/* Card Actions */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-rose-100/60">
              <button
                onClick={() => handleCopy(featuredSher)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-rose-200 text-romantic-heading text-xs hover:border-romantic-gold hover:text-romantic-gold shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                {copiedId === featuredSher.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="font-nastaleeq text-xs text-emerald-700">کاپی ہو گیا</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="font-nastaleeq text-xs">شعر کاپی کریں</span>
                  </>
                )}
              </button>

              <a
                href={getWhatsAppShareUrl(featuredSher)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs hover:bg-emerald-100 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-emerald-600" />
                <span className="font-nastaleeq text-xs">واٹس ایپ پر شیئر کریں</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Category Filters (RTL) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14" dir="rtl" lang="ur">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`font-nastaleeq px-5 py-2 rounded-full text-base sm:text-lg transition-all duration-300 cursor-pointer shadow-sm ${
                  isActive
                    ? 'bg-romantic-red text-white shadow-rose-200 scale-105'
                    : 'bg-white text-romantic-paragraph hover:bg-rose-50 border border-rose-100 hover:border-rose-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Poetry Couplets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir="rtl" lang="ur">
          <AnimatePresence mode="popLayout">
            {filteredList.map((sher, index) => (
              <motion.div
                key={sher.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white/90 backdrop-blur-sm border border-rose-100/90 rounded-[2.5rem] p-8 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle Card Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50/60 rounded-full blur-2xl pointer-events-none group-hover:bg-rose-100/80 transition-colors" />

                <div>
                  {/* Card Header with Unwaan & Category */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-nastaleeq text-xl text-romantic-gold font-bold">
                      {sher.title}
                    </span>
                    <span className="font-nastaleeq text-xs px-3 py-1 rounded-full bg-rose-50 border border-rose-200/50 text-romantic-paragraph">
                      {sher.categoryLabel}
                    </span>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-rose-200/70 to-transparent mb-6" />

                  {/* Sher Body (Classic 2-line format) */}
                  <div className="text-center my-4 space-y-2">
                    <p className="font-nastaleeq text-[22px] sm:text-[23px] text-romantic-heading font-medium leading-[2.4]">
                      {sher.misra1}
                    </p>
                    <div className="w-10 h-px bg-rose-200/50 mx-auto my-1" />
                    <p className="font-nastaleeq text-[22px] sm:text-[23px] text-romantic-heading font-medium leading-[2.4]">
                      {sher.misra2}
                    </p>
                  </div>
                </div>

                {/* Card Action Buttons: Copy & Share */}
                <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-rose-100/70">
                  <button
                    onClick={() => handleCopy(sher)}
                    className="inline-flex items-center gap-1.5 text-xs text-romantic-paragraph hover:text-romantic-gold transition-colors px-3.5 py-1.5 rounded-full bg-gray-50/80 hover:bg-white border border-gray-200/60 cursor-pointer active:scale-95"
                    title="کاپی کریں"
                  >
                    {copiedId === sher.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-nastaleeq text-xs text-emerald-700">کاپی ہو گیا</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="font-nastaleeq text-xs">کاپی</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getWhatsAppShareUrl(sher)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-900 transition-colors px-3.5 py-1.5 rounded-full bg-emerald-50/70 hover:bg-emerald-100/90 border border-emerald-200/60 cursor-pointer active:scale-95"
                    title="واٹس ایپ پر شیئر کریں"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-nastaleeq text-xs">شیئر</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Ornamental Quote */}
        <div className="text-center mt-20" dir="rtl" lang="ur">
          <div className="inline-flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-romantic-gold/50" />
            <Heart className="w-4 h-4 text-romantic-red fill-romantic-red" />
            <span className="font-nastaleeq text-xl text-romantic-gold">شاعری روح کی آواز ہے</span>
            <Heart className="w-4 h-4 text-romantic-red fill-romantic-red" />
            <div className="w-12 h-px bg-romantic-gold/50" />
          </div>
        </div>

      </div>
    </section>
  );
};
