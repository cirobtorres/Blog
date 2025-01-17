"use client";

import SliderCarousel from "../../../Shadcnui/thumbCarousel";

const ComponentSharedSlider = ({ block }: { block: SharedSlider }) => {
  return (
    <article key={`shared.slider-${block.id}`} className="flex mb-6">
      <SliderCarousel files={block.files} options={{ loop: true }} />
    </article>
  );
};

export default ComponentSharedSlider;
