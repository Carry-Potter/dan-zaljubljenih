"use client";

export interface ValentineCardProps {
  name: string;
  message: string;
  signature: string;
  highlight: string;
  imageUrl?: string | null;
  heartColor?: string | null;
  tagline?: string;
  envelopeTitle?: string;
}

const DEFAULT_STAMP =
  "https://i.pinimg.com/736x/22/72/1b/22721b77401267d3f4a5606d8e717d7b.jpg";
const DEFAULT_HEART = "#b91c1c";

export function ValentineCard({
  name,
  message,
  signature,
  highlight,
  imageUrl,
  heartColor,
  tagline = "Osmeh mi je češći otkad si ti tu.",
  envelopeTitle = "TI I JA",
}: ValentineCardProps) {
  const stamp = imageUrl && imageUrl.trim() ? imageUrl : DEFAULT_STAMP;
  const heart = heartColor && heartColor.trim() ? heartColor : DEFAULT_HEART;

  return (
    <div className="relative w-full max-w-[480px] aspect-[16/11] group perspective mx-auto min-h-[360px]">
      {/* Inner card (letter) - lifts on hover */}
      <div
        className="absolute inset-x-0 mx-auto w-[92%] h-[95%] bg-[#fcfaf7] shadow-2xl border border-zinc-200 p-8 
                transition-all duration-700 ease-in-out z-0
                group-hover:-translate-y-36 group-hover:z-50"
      >
        <div className="h-full border border-red-100 p-5 flex flex-col justify-between relative">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="handwritten text-3xl text-zinc-800">
                Draga {name},
              </h2>
              <p className="text-sm text-zinc-700 max-w-[260px] leading-relaxed whitespace-pre-line">
                {message}
              </p>
            </div>
            <div className="w-14 h-20 border border-dotted border-zinc-300 bg-zinc-50 flex flex-col items-center justify-center p-1 overflow-hidden">
              <div className="text-[8px] uppercase tracking-widest text-zinc-400">
                Pošta
              </div>
              <div
                className="w-full h-full bg-center bg-cover min-h-[3rem]"
                style={{ backgroundImage: `url('${stamp}')` }}
              />
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl font-bold text-red-900 italic uppercase tracking-[0.15em]">
              {highlight}
            </p>
          </div>

          <div className="flex justify-between items-end border-t border-red-50/50 pt-4">
            <div className="text-[9px] text-red-800/60 uppercase tracking-widest italic leading-tight max-w-[140px]">
              {tagline}
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                Uvek,
              </p>
              <p className="handwritten text-2xl text-red-900">{signature}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Envelope front */}
      <div className="absolute inset-0 bg-white border border-zinc-200 shadow-xl z-[10] overflow-hidden">
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(35deg, #ffffff 50%, #f9f9f9 50.1%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
          <div
            className="w-14 h-14 rounded-full shadow-lg border border-red-900 flex items-center justify-center"
            style={{
              backgroundColor: heart,
              borderColor: heart,
            }}
          >
            <span className="text-red-300 text-lg">❤</span>
          </div>
        </div>
        <div className="absolute bottom-8 w-full text-center z-40">
          <p className="text-red-900 font-bold uppercase tracking-[0.4em] text-[11px]">
            {envelopeTitle}
          </p>
        </div>
      </div>

      {/* Envelope flap */}
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-zinc-100 origin-top transition-transform duration-500 ease-in-out 
                group-hover:[transform:rotateX(180deg)] z-30 shadow-sm"
        style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
      />
    </div>
  );
}
