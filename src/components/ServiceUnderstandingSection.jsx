import React from 'react';
import { Container, Section } from './ui';
import EditableText from './EditableText';

const defaultUnderstandingData = [
  {
    num: "1",
    title: "Freezing Stage:",
    desc: "This is the first stage in the progression of symptoms. Movement starts causing pain, and range of motion begins to become limited."
  },
  {
    num: "2",
    title: "Frozen Stage:",
    desc: "In this stage, pain may decrease, but stiffness increases significantly, making movement more restricted."
  },
  {
    num: "3",
    title: "Thawing Stage:",
    desc: "Symptoms improve during this stage, and range of motion steadily restores with proper medical care and clinical therapy."
  }
];

export default function ServiceUnderstandingSection({
  understandingTitle = '',
  understandingIntro = '',
  understandingItems = [],
  serviceTitle = '',
  isEditMode = false,
  slug = 'default',
  imageUrl = null
}) {
  const hasCustomUnderstanding = Array.isArray(understandingItems) && understandingItems.length > 0;

  // Only render on service pages where understanding items have been explicitly configured
  if (!hasCustomUnderstanding && !isEditMode) {
    return null;
  }

  const displayItems = hasCustomUnderstanding ? understandingItems : defaultUnderstandingData;
  const defaultMainTitle = understandingTitle || (serviceTitle ? `Understanding ${serviceTitle}` : "Understanding Your Condition");
  const defaultIntroText = understandingIntro || `Comprehensive clinical insights into ${serviceTitle || "your health condition"}, its stages, and effective treatment options.`;
  
  // Default medical illustration image
  const defaultImg = "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80";
  const displayImg = imageUrl || defaultImg;

  return (
    <Section variant="white" className="py-12 sm:py-16 md:py-20 bg-white">
      <Container className="max-w-[1380px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Title, Intro & Numbered Stages List matching screenshot */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            
            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08709d] tracking-tight font-montserrat leading-snug mb-4">
              <EditableText
                slug={slug}
                fieldKey="understanding_main_title"
                defaultText={defaultMainTitle}
                isEditMode={isEditMode}
                tagName="span"
              />
            </h2>

            {/* Intro Paragraph */}
            <div className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              <EditableText
                slug={slug}
                fieldKey="understanding_intro_paragraph"
                defaultText={defaultIntroText}
                isEditMode={isEditMode}
                tagName="p"
                multiline={true}
              />
            </div>

            {/* Numbered Items / Stages List */}
            <div className="space-y-6">
              {displayItems.map((item, idx) => (
                <div key={idx} className="flex flex-col items-start">
                  
                  {/* Numbered Subheading */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#08709d] font-montserrat leading-snug mb-2 flex items-center gap-1.5">
                    <span>{item.num ? `${item.num}.` : `${idx + 1}.`}</span>
                    <EditableText
                      slug={slug}
                      fieldKey={`understanding_item_title_${idx}`}
                      defaultText={typeof item === 'string' ? item : (item.title || '')}
                      isEditMode={isEditMode}
                      tagName="span"
                    />
                  </h3>

                  {/* Stage Description */}
                  <div className="text-slate-700 text-sm sm:text-[15px] leading-relaxed font-sans">
                    <EditableText
                      slug={slug}
                      fieldKey={`understanding_item_desc_${idx}`}
                      defaultText={typeof item === 'string' ? '' : (item.desc || item.description || '')}
                      isEditMode={isEditMode}
                      tagName="p"
                      multiline={true}
                    />
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Medical Illustration / Anatomical Image with Dark Outline Border */}
          <div className="lg:col-span-5 flex items-center justify-center sticky top-28">
            <div className="relative w-full rounded-2xl border-2 border-[#1e293b]/80 shadow-2xl overflow-hidden bg-slate-900">
              <img 
                src={displayImg} 
                alt={serviceTitle || "Understanding Condition Illustration"} 
                className="w-full h-auto max-h-[560px] object-cover rounded-xl"
              />
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
