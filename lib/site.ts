// Studio details taken from the studio poster. Edit here and the whole site updates.
export const site = {
  name: "ANSH MEMORIES FOREVER", studio: "  Casting Studio",
  tagline: "Pehli Mutthi Se Ashirwad Tak — Sab Kuch Save Karenge",
  bookingFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSexjtxptlBBVSExlO6UT7PlH4aFjDnu46uvP6y5pK1HSc09wA/viewform?usp=publish-editor",
  phone: "9868817693", tel: "9868817693", whatsapp: "9868817693",
  areas: ["Delhi"],
  services: [["Baby Hand & Foot Casting", "/collections/baby"], ["Kids Casting", "/collections/kids"], ["Couple Hand Casting", "/collections/couples"], ["Elderly + Baby Casting", "/collections/elderly-baby"], ["Ashirwad Casting", "/3d-casting"]],
};

export const studioChatHref = site.whatsapp.replace(/\D/g, "")
  ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I'd like to chat with the studio.")}`
  : "/contact";
