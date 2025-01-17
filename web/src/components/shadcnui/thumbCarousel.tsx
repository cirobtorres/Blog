"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const Thumb = (props: {
  selected: boolean;
  file: SharedMediaFile;
  onClick: () => void;
}) => {
  const { selected, file, onClick } = props;
  return (
    <div
      className={"transition-all duration-300 flex-[0_0_22%] aspect-square md:flex-[0_0_15%] border-[3px]".concat(
        selected ? " border-blog-foreground-highlight" : " border-transparent"
      )}
    >
      <button
        key={file.documentId}
        onClick={onClick}
        type="button"
        className="relative w-full h-full flex-[0_0_100%] flex justify-center items-center border-0 p-0 m-0 cursor-pointer appearance-none [-webkit-appearance:none] touch-manipulation bg-transparent"
      >
        <Image
          src={`http://127.0.0.1:1337${file.url}`}
          alt={file.alternativeText}
          fill
          sizes={`(max-width: ${file.width}) 100vw, (max-width: ${
            file.width / 2
          }) 50vw, 33vw`}
          className="absolute object-cover select-none"
        />
      </button>
    </div>
  );
};

const SliderCarousel = ({
  files,
  options,
}: {
  files: SharedMediaFile[];
  options: object;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="max-w-full m-auto">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="flex ml-[calc(1rem_*_-1)] touch-pan-y">
          {files.map((file) => (
            <figure
              key={file.documentId}
              className="flex-[0_0_100%] min-w-0 pl-4 [transform:translate3d(0,0,0)]"
            >
              <div className="relative w-full h-[400px]">
                <Image
                  src={`http://127.0.0.1:1337${file.url}`}
                  alt={file.alternativeText}
                  fill
                  sizes={`(max-width: ${file.width}) 100vw, (max-width: ${
                    file.width / 2
                  }) 50vw, 33vw`}
                  className="absolute object-cover select-none"
                />
              </div>
              <figcaption className="text-xs line-clamp-2 my-1 h-8">
                {file.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="overflow-hidden" ref={emblaThumbsRef}>
        <div className="flex">
          {files.map((file, index: number) => (
            <Thumb
              key={file.documentId}
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              file={file}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderCarousel;
