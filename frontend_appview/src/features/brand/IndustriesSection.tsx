// 'use client';

// import React from 'react';
// import {
//   Building2,
//   Factory,
//   Laptop,
//   Landmark,
//   Users,
//   Sparkles,
//   GraduationCap
// } from 'lucide-react';
// import { ScrollReveal } from '@/components/motion/ScrollReveal';

// export interface IndustryItem {
//   id: string;
//   title: string;
//   icon?: React.ComponentType<{ className?: string }>;
//   imageIcon?: string;
//   iconColor: string;
//   bulletColor: string;
//   points: string[];
// }

// export const INDUSTRIES_ROW_1: IndustryItem[] = [
//   {
//     id: 'real-estate',
//     title: 'Real Estate',
//     imageIcon: '/icons/residential.png',
//     iconColor: 'text-[#3D5244]', // Heritage Sage
//     bulletColor: 'text-[#3D5244]',
//     points: [
//       'Possession Gifts',
//       'Channel Partner',
//       'Project Launches',
//       'VIP Homeowners',
//       'Festive Gifting',
//     ],
//   },
//   {
//     id: 'industrial-oem',
//     title: 'Industrial / OEM',
//     imageIcon: '/icons/factory.png',
//     iconColor: 'text-[#A67C46]', // Antique Gold / Ochre
//     bulletColor: 'text-[#A67C46]',
//     points: [
//       'Dealer Conferences',
//       'Distributor Gifting',
//       'Safety Milestones',
//       'Plant Anniversaries',
//       'Employee Gifting',
//     ],
//   },
//   {
//     id: 'tech-saas',
//     title: 'Tech / SaaS',
//     icon: Laptop,
//     iconColor: 'text-[#3B4C5A]', // Deep Slate
//     bulletColor: 'text-[#3B4C5A]',
//     points: [
//       'Welcome Kits',
//       'Remote Employee',
//       'Offsites',
//       'Milestones',
//       'Merchandise',
//     ],
//   },
//   {
//     id: 'finance-professional-services',
//     title: 'Finance & Professional Services',
//     icon: Landmark,
//     iconColor: 'text-[#7A1C29]', // Royal Burgundy
//     bulletColor: 'text-[#7A1C29]',
//     points: [
//       'Client Appreciation',
//       'Referral Gifting',
//       'Leadership Gifting',
//       'Festive Programmes',
//       'Executive Gifts',
//     ],
//   },
// ];

// export const INDUSTRIES_ROW_2: IndustryItem[] = [
//   {
//     id: 'events-agencies',
//     title: 'Events & Agencies',
//     icon: Users,
//     iconColor: 'text-[#5C455B]', // Muted Mulberry / Plum
//     bulletColor: 'text-[#5C455B]',
//     points: [
//       'Conference Kits',
//       'Launch Boxes',
//       'Delegate Gifts',
//       'Speaker Gifts',
//       'White-label Service',
//     ],
//   },
//   {
//     id: 'weddings-celebrations',
//     title: 'Weddings & Celebrations',
//     imageIcon: '/icons/arch.png',
//     iconColor: 'text-[#9B5368]', // Luxury Dusty Rose
//     bulletColor: 'text-[#9B5368]',
//     points: [
//       'Save the Date Favours',
//       'Invitation Boxes',
//       'Bridesmaid & Grooms',
//       'Welcome Hampers',
//       'Return Gifting',
//     ],
//   },
//   {
//     id: 'education-edtech',
//     title: 'Education & EdTech',
//     icon: GraduationCap,
//     iconColor: 'text-[#2C4C5E]', // Heritage Indigo / Slate
//     bulletColor: 'text-[#2C4C5E]',
//     points: [
//       'Student Welcome Kits',
//       'Faculty & Employee Gifting',
//       'Graduation & Achievement Gifts',
//       'Events, Workshops & Conferences',
//       'Alumni & Partner Gifting',
//     ],
//   },
// ];

// export const IndustriesSection: React.FC = () => {
//   return (
//     <section className="pt-4 sm:pt-8 md:pt-12 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A18] relative overflow-hidden">
//       <div className="max-w-[1240px] mx-auto space-y-6 sm:space-y-8">

//         {/* ─── SECTION TITLE ─── */}
//         <ScrollReveal animation="fadeUp">
//           <div className="text-center max-w-4xl mx-auto px-2 space-y-1.5 sm:space-y-2">
//             <h2
//               className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
//               style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
//             >
//               Gifting, Built Around Your Industry
//             </h2>

//             <p className="text-xs md:text-sm text-[#78746D] font-light max-w-3xl mx-auto leading-normal">
//               Specialised gifting programmes tailored to the unique identity, audience, and scale of each industry.
//             </p>
//           </div>
//         </ScrollReveal>

//         {/* ─── 2-ROW SYMMETRIC BALANCED GRID: TOP 4 + BOTTOM 3 ─── */}
//         <div className="space-y-8 sm:space-y-12 pt-3 flex flex-col items-center">
          
//           {/* Row 1: 4 Columns Perfectly Centered */}
//           <div className="flex flex-wrap justify-center items-start gap-x-8 sm:gap-x-10 lg:gap-x-12 gap-y-8 w-full max-w-[1180px]">
//             {INDUSTRIES_ROW_1.map((industry, index) => {
//               const Icon = industry.icon;

//               return (
//                 <ScrollReveal
//                   key={industry.id}
//                   animation="fadeUp"
//                   delay={0.025 * (index + 1)}
//                   className="w-[240px] sm:w-[250px] shrink-0"
//                 >
//                   <div className="flex flex-col space-y-2.5 group w-full">
//                     {/* Refined Icon */}
//                     <div className="h-9 sm:h-10 flex items-start transition-transform duration-300 group-hover:scale-105">
//                       {industry.imageIcon ? (
//                         <img
//                           src={industry.imageIcon}
//                           alt={industry.title}
//                           className="w-7 h-7 sm:w-8 sm:h-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
//                         />
//                       ) : Icon ? (
//                         <Icon
//                           className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25] ${industry.iconColor} opacity-90 group-hover:opacity-100 transition-opacity`}
//                         />
//                       ) : null}
//                     </div>

//                     {/* Aligned Title */}
//                     <div className="h-[40px] sm:h-[44px] flex items-start">
//                       <h3 className="text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.22em] text-[#1A1A18] leading-[1.35] max-w-full break-words">
//                         {industry.title}
//                       </h3>
//                     </div>

//                     {/* Bullet List */}
//                     <ul className="space-y-1 text-xs sm:text-[12px] text-[#6E6A62] font-light leading-relaxed">
//                       {industry.points.map((point, pIdx) => (
//                         <li key={pIdx} className="flex items-start gap-1.5">
//                           <span className={`${industry.bulletColor} font-bold text-xs leading-none pt-0.5 select-none opacity-80 shrink-0`}>
//                             •
//                           </span>
//                           <span className="whitespace-normal break-words">
//                             {point}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </ScrollReveal>
//               );
//             })}
//           </div>

//           {/* Row 2: 3 Columns Perfectly Centered with Exact Same Card Width */}
//           <div className="flex flex-wrap justify-center items-start gap-x-8 sm:gap-x-10 lg:gap-x-12 gap-y-8 w-full max-w-[1180px]">
//             {INDUSTRIES_ROW_2.map((industry, index) => {
//               const Icon = industry.icon;

//               return (
//                 <ScrollReveal
//                   key={industry.id}
//                   animation="fadeUp"
//                   delay={0.025 * (index + 5)}
//                   className="w-[240px] sm:w-[250px] shrink-0"
//                 >
//                   <div className="flex flex-col space-y-2.5 group w-full">
//                     {/* Refined Icon */}
//                     <div className="h-9 sm:h-10 flex items-start transition-transform duration-300 group-hover:scale-105">
//                       {industry.imageIcon ? (
//                         <img
//                           src={industry.imageIcon}
//                           alt={industry.title}
//                           className="w-7 h-7 sm:w-8 sm:h-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
//                         />
//                       ) : Icon ? (
//                         <Icon
//                           className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25] ${industry.iconColor} opacity-90 group-hover:opacity-100 transition-opacity`}
//                         />
//                       ) : null}
//                     </div>

//                     {/* Aligned Title */}
//                     <div className="h-[40px] sm:h-[44px] flex items-start">
//                       <h3 className="text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.22em] text-[#1A1A18] leading-[1.35] max-w-full break-words">
//                         {industry.title}
//                       </h3>
//                     </div>

//                     {/* Bullet List */}
//                     <ul className="space-y-1 text-xs sm:text-[12px] text-[#6E6A62] font-light leading-relaxed">
//                       {industry.points.map((point, pIdx) => (
//                         <li key={pIdx} className="flex items-start gap-1.5">
//                           <span className={`${industry.bulletColor} font-bold text-xs leading-none pt-0.5 select-none opacity-80 shrink-0`}>
//                             •
//                           </span>
//                           <span className="whitespace-normal break-words">
//                             {point}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </ScrollReveal>
//               );
//             })}
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// };
'use client';

import React from 'react';
import {
  Laptop,
  Landmark,
  Users,
  GraduationCap,
} from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export interface IndustryItem {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  imageIcon?: string;
  iconColor: string;
  bulletColor: string;
  points: string[];
}

export const INDUSTRIES_ROW_1: IndustryItem[] = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    imageIcon: '/icons/residential.png',
    iconColor: 'text-[#3D5244]',
    bulletColor: 'text-[#3D5244]',
    points: [
      'Possession Gifts',
      'Channel Partner',
      'Project Launches',
      'VIP Homeowners',
      'Festive Gifting',
    ],
  },
  {
    id: 'industrial-oem',
    title: 'Industrial / OEM',
    imageIcon: '/icons/factory.png',
    iconColor: 'text-[#A67C46]',
    bulletColor: 'text-[#A67C46]',
    points: [
      'Dealer Conferences',
      'Distributor Gifting',
      'Safety Milestones',
      'Plant Anniversaries',
      'Employee Gifting',
    ],
  },
  {
    id: 'tech-saas',
    title: 'Tech / SaaS',
    icon: Laptop,
    iconColor: 'text-[#3B4C5A]',
    bulletColor: 'text-[#3B4C5A]',
    points: [
      'Welcome Kits',
      'Remote Employee',
      'Offsites',
      'Milestones',
      'Merchandise',
    ],
  },
  {
    id: 'finance-professional-services',
    title: 'Finance & Professional Services',
    icon: Landmark,
    iconColor: 'text-[#7A1C29]',
    bulletColor: 'text-[#7A1C29]',
    points: [
      'Client Appreciation',
      'Referral Gifting',
      'Leadership Gifting',
      'Festive Programmes',
      'Executive Gifts',
    ],
  },
];

export const INDUSTRIES_ROW_2: IndustryItem[] = [
  {
    id: 'events-agencies',
    title: 'Events & Agencies',
    icon: Users,
    iconColor: 'text-[#5C455B]',
    bulletColor: 'text-[#5C455B]',
    points: [
      'Conference Kits',
      'Launch Boxes',
      'Delegate Gifts',
      'Speaker Gifts',
      'White-label Service',
    ],
  },
  {
    id: 'weddings-celebrations',
    title: 'Weddings & Celebrations',
    imageIcon: '/icons/arch.png',
    iconColor: 'text-[#9B5368]',
    bulletColor: 'text-[#9B5368]',
    points: [
      'Save the Date Favours',
      'Invitation Boxes',
      'Bridesmaid & Grooms',
      'Welcome Hampers',
      'Return Gifting',
    ],
  },
  {
    id: 'education-edtech',
    title: 'Education & EdTech',
    icon: GraduationCap,
    iconColor: 'text-[#2C4C5E]',
    bulletColor: 'text-[#2C4C5E]',
    points: [
      'Student Welcome Kits',
      'Faculty & Employee Gifting',
      'Graduation & Achievement Gifts',
      'Events, Workshops & Conferences',
      'Alumni & Partner Gifting',
    ],
  },
];

/* ─────────────────────────────────────────────
   INDUSTRY CARD
───────────────────────────────────────────── */

const IndustryCard: React.FC<{
  industry: IndustryItem;
}> = ({ industry }) => {
  const Icon = industry.icon;

  return (
    <div className="flex flex-col space-y-2.5 group w-full">

      {/* Icon */}
      <div className="h-9 sm:h-10 flex items-start transition-transform duration-300 group-hover:scale-105 origin-left">
        {industry.imageIcon ? (
          <img
            src={industry.imageIcon}
            alt={industry.title}
            className="
              w-7 h-7
              sm:w-8 sm:h-8
              object-contain
              opacity-90
              group-hover:opacity-100
              transition-opacity
            "
          />
        ) : Icon ? (
          <Icon
            className={`
              w-7 h-7
              sm:w-8 sm:h-8
              stroke-[1.25]
              ${industry.iconColor}
              opacity-90
              group-hover:opacity-100
              transition-opacity
            `}
          />
        ) : null}
      </div>

      {/* Title */}
      <div className="min-h-[38px] sm:min-h-[44px] flex items-start">
        <h3
          className="
            text-[10px]
            sm:text-[12px]
            font-sans
            font-semibold
            uppercase
            tracking-[0.18em]
            sm:tracking-[0.22em]
            text-[#1A1A18]
            leading-[1.4]
            break-words
            pr-2
          "
        >
          {industry.title}
        </h3>
      </div>

      {/* Bullet List */}
      <ul
        className="
          space-y-0.5
          sm:space-y-1
          text-[10px]
          sm:text-[12px]
          text-[#6E6A62]
          font-light
          leading-relaxed
        "
      >
        {industry.points.map((point, pIdx) => (
          <li
            key={pIdx}
            className="flex items-start gap-1.5"
          >
            <span
              className={`
                ${industry.bulletColor}
                font-bold
                text-xs
                leading-none
                pt-0.5
                select-none
                opacity-80
                shrink-0
              `}
            >
              •
            </span>

            <span className="whitespace-normal break-words">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ─────────────────────────────────────────────
   INDUSTRIES SECTION
───────────────────────────────────────────── */

export const IndustriesSection: React.FC = () => {
  return (
    <section
      className="
        pt-4
        sm:pt-8
        md:pt-12
        pb-7
        sm:pb-12
        px-4
        sm:px-6
        lg:px-8
        bg-[#FAF8F5]
        text-[#1A1A18]
        relative
        overflow-hidden
      "
    >
      <div className="max-w-[1240px] mx-auto">

        {/* ─────────────────────────────────────
            SECTION TITLE
        ───────────────────────────────────── */}

        <ScrollReveal animation="fadeUp">
          <div
            className="
              text-center
              max-w-4xl
              mx-auto
              px-2
              space-y-1.5
              sm:space-y-2
              mb-6
              sm:mb-8
              md:mb-10
              lg:mb-12
            "
          >
            <h2
              className="
                text-2xl
                sm:text-4xl
                md:text-5xl
                font-light
                text-[#1A1A18]
                tracking-tight
                leading-tight
              "
              style={{
                fontFamily:
                  'var(--font-cormorant), Georgia, serif',
              }}
            >
              Gifting, Built Around Your Industry
            </h2>

            <p
              className="
                text-[11px]
                sm:text-xs
                md:text-sm
                text-[#78746D]
                font-light
                max-w-3xl
                mx-auto
                leading-normal
              "
            >
              Specialised gifting programmes tailored to the
              unique identity, audience, and scale of each industry.
            </p>
          </div>
        </ScrollReveal>

        {/* ─────────────────────────────────────
            INDUSTRIES
            Desktop:
            16-column master grid

            Row 1:
            4 / 4 / 4 / 4

            Row 2:
            empty 2 / 4 / 4 / 4 / empty 2

            Mobile:
            2 columns
        ───────────────────────────────────── */}

        <div
          className="
            mt-7
            sm:mt-10
            md:mt-12

            grid
            grid-cols-2
            lg:grid-cols-[repeat(16,minmax(0,1fr))]

            gap-x-5
            sm:gap-x-8

            gap-y-8
            sm:gap-y-10
            lg:gap-y-12

            w-full
            max-w-[1120px]
            mx-auto
          "
        >

          {/* ───────── ROW 1 ───────── */}

          {INDUSTRIES_ROW_1.map((industry, index) => (
            <ScrollReveal
              key={industry.id}
              animation="fadeUp"
              delay={0.025 * (index + 1)}
              className="
                col-span-1
                lg:col-span-4
                w-full
              "
            >
              <IndustryCard industry={industry} />
            </ScrollReveal>
          ))}

          {/* ───────── ROW 2 ───────── */}

          {INDUSTRIES_ROW_2.map((industry, index) => (
            <ScrollReveal
              key={industry.id}
              animation="fadeUp"
              delay={0.025 * (index + 5)}
              className={`
                col-span-1
                lg:col-span-4
                w-full

                ${
                  index === 0
                    ? 'lg:col-start-3'
                    : ''
                }

                ${
                  index === 1
                    ? 'lg:col-start-7'
                    : ''
                }

                ${
                  index === 2
                    ? 'lg:col-start-11'
                    : ''
                }
              `}
            >
              <IndustryCard industry={industry} />
            </ScrollReveal>
          ))}

        </div>
      </div>
    </section>
  );
};