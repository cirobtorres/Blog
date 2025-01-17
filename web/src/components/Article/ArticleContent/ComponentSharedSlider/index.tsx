import Image from "next/image";

const ComponentSharedSlider = ({ block }: { block: SharedSlider }) => {
  return (
    <section key={`shared.slider-${block.id}`} className="grid grid-cols-8">
      {block.files.map((nestedImage) => (
        <div key={nestedImage.documentId} className="relative aspect-square">
          <Image
            src={`http://127.0.0.1:1337${nestedImage.url}`}
            alt={nestedImage.alternativeText}
            fill
            className="absolute object-cover"
            // width={nestedImage.width}
            // height={nestedImage.height}
          />
        </div>
      ))}
    </section>
  );
};

export default ComponentSharedSlider;
