#!/bin/bash
# Compress heavy carousel images using sips (built into macOS — no install needed)
# Run from Terminal: bash compress-images.sh

SITE_DIR="$(cd "$(dirname "$0")" && pwd)"
IMAGES="$SITE_DIR/images"

echo "🗜️  Numberbender Image Compressor"
echo "=================================="

compress_folder() {
  local folder="$1"
  local label="$2"
  echo ""
  echo "📁 $label"

  for f in "$folder"/*.png "$folder"/*.PNG; do
    [ -f "$f" ] || continue
    base="${f%.*}"
    out="${base}.jpg"
    original_kb=$(du -k "$f" | cut -f1)

    # Convert PNG → JPEG at 80% quality using sips
    sips -s format jpeg -s formatOptions 80 "$f" --out "$out" > /dev/null 2>&1

    new_kb=$(du -k "$out" | cut -f1)
    savings=$(( original_kb - new_kb ))
    echo "  ✅ $(basename "$f") → $(basename "$out")  |  ${original_kb}KB → ${new_kb}KB  (saved ${savings}KB)"
  done
}

# carousel_5_tips
compress_folder "$IMAGES/carousel_5_tips" "carousel_5_tips (6 images)"

# otc_2025 carousel
compress_folder "$IMAGES/otc_2025_engage_like_a_youtuber_square_carousel" "otc_2025 carousel (5 images)"

echo ""
echo "=================================="
echo "✅ Done! Check the folders for new .jpg files."
echo "You can now delete the original .png files from those folders."
