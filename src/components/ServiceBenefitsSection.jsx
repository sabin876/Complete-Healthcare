import React from 'react';
import { Container, Section } from './ui';
import EditableText from './EditableText';

const defaultBenefitsData = [
  {
    title: "Customized Treatment Plans",
    desc: "Every patient receives a tailored therapy plan to address their specific health requirements, ensuring optimal recovery."
  },
  {
    title: "Pain Relief & Mobility Restoration",
    desc: "Our expert clinical team uses proven medical techniques to reduce pain, improve mobility, and restore full range of motion."
  },
  {
    title: "Non-Invasive & Drug-Free Approach",
    desc: "Benefit from natural, hands-on therapy and compassionate care without the need for unnecessary medications or surgeries."
  },
  {
    title: "Experienced Healthcare Professionals",
    desc: "Our skilled team of DHA-licensed doctors and nurses specializes in delivering personalized home care with high success rates."
  },
  {
    title: "Holistic Long-Term Recovery",
    desc: "We focus on long-term healing and wellness, helping you regain full functionality while preventing future complications through home care guidance."
  }
];

export default function ServiceBenefitsSection({ 
  benefitsList = [], 
  benefitsTitle = '', 
  serviceTitle = '', 
  isEditMode = false, 
  slug = 'default',
  imageUrl = null
}) {
  const hasCustomBenefits = (benefitsList && benefitsList.length > 0) || Boolean(benefitsTitle && benefitsTitle.trim() !== '');

  // Only show benefits section on services where benefits have been explicitly added/configured
  if (!hasCustomBenefits && !isEditMode) {
    return null;
  }

  const displayBenefits = (benefitsList && benefitsList.length > 0) ? benefitsList : defaultBenefitsData;
  const defaultTitleText = benefitsTitle || (serviceTitle ? `Benefits of Our ${serviceTitle} Service at Corx Healthcare` : "Benefits of Our Home Healthcare Service at Corx Healthcare");
  
  // Default high quality medical care image
  const defaultImg = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80";
  const displayImg = imageUrl || defaultImg;

  return (
    <Section variant="slate" className="py-12 sm:py-16 md:py-20 bg-slate-50/50">
      <Container className="max-w-[1380px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Benefits Card matching exact screenshot layout */}
          <div className="lg:col-span-7 bg-[#edf6fc] border-[1.5px] border-[#90caed] rounded-3xl p-6 sm:p-9 lg:p-10 shadow-sm flex flex-col justify-between">
            <div>
              {/* Header Title */}
              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#08709d] tracking-tight font-montserrat leading-snug mb-6">
                <EditableText
                  slug={slug}
                  fieldKey="benefits_section_main_title"
                  defaultText={defaultTitleText}
                  isEditMode={isEditMode}
                  tagName="span"
                />
              </h2>

              {/* Bulleted Benefits List */}
              <ul className="space-y-4 text-slate-700 font-sans text-sm sm:text-[15px] leading-relaxed pl-5 list-disc marker:text-slate-800">
                {displayBenefits.map((item, idx) => (
                  <li key={idx} className="pl-1">
                    <span className="font-extrabold text-slate-900 mr-1.5 font-montserrat">
                      <EditableText
                        slug={slug}
                        fieldKey={`benefit_item_title_${idx}`}
                        defaultText={typeof item === 'string' ? item : (item.title || item.name || '')}
                        isEditMode={isEditMode}
                        tagName="span"
                      />
                      :
                    </span>
                    <EditableText
                      slug={slug}
                      fieldKey={`benefit_item_desc_${idx}`}
                      defaultText={typeof item === 'string' ? '' : (item.desc || item.description || '')}
                      isEditMode={isEditMode}
                      tagName="span"
                      multiline={true}
                      className="text-slate-700 font-normal"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: High Quality Image matching screenshot layout */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] rounded-3xl overflow-hidden shadow-md border border-slate-200/80">
              <img 
                src={displayImg} 
                alt={serviceTitle || "Service Benefits"} 
                className="w-full h-full object-cover rounded-3xl hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
