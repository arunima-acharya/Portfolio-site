// FastHTML sticker-pack accent rotation — cycles each project card through
// a tinted surface + matching vivid accent so the grid reads as scattered
// confetti stickers instead of one repeated brand color.
export interface StickerTint {
  surface: string;
  accent: string;
}

export const STICKER_PALETTE: StickerTint[] = [
  { surface: "#d4f7e6", accent: "#3cdd8c" }, // Mint Cream / Sticker Green
  { surface: "#ffccf7", accent: "#e699d9" }, // Cotton Candy / Sticker Pink
  { surface: "#ffeecc", accent: "#ffc435" }, // Butter Cream / Sticker Yellow
  { surface: "#e8e8fc", accent: "#7575f0" }, // Lavender Mist / Periwinkle Violet
  { surface: "#eddee9", accent: "#e699d9" }, // Dusty Mauve / Sticker Pink
];

export function stickerTint(index: number): StickerTint {
  return STICKER_PALETTE[index % STICKER_PALETTE.length];
}
