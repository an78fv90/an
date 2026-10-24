export const castTypes = [
  { id:"baby", label:"Baby hands & feet", price:3900 },
  { id:"couple", label:"Couple clasp", price:5400 },
];
export const frames = [
  { id:"velvet", label:"Black velvet & gold", price:1500, color:"#17120D" },
  { id:"walnut", label:"Walnut shadow box", price:1200, color:"#5A3A26" },
  { id:"oak", label:"Pale oak", price:1000, color:"#C9A877" },
];
export const materials = [
  { id:"ivory", label:"Ivory plaster", price:1100, color:"#EDE4D3" },
  { id:"gold", label:"Antique gold", price:1800, color:"#C9A24B" },
  { id:"bronze", label:"Bronze finish", price:1800, color:"#B07A4A" },
];
export const sizes = [
  { id:"s", label:"Small 8×10 in", mult:1 },
  { id:"m", label:"Medium 12×16 in", mult:1.25 },
  { id:"l", label:"Large 16×20 in", mult:1.55 },
];
export const stages = ["Booking Confirmed","Casting Scheduled","Casting Completed","3D Preparation","Finishing","Framing","Quality Check","Shipped","Delivered"];
export const inr = (n:number)=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
