#!/usr/bin/env bash
# ============================================================================
# Dairy Classic — media pipeline
# Turns raw generator renders into scrub-ready clips + posters.
#
#   raw/hero/<product-id>.mp4   →  media/hero/<id>-1280.mp4, <id>-720.mp4,
#                                   <id>.jpg (first frame), <id>-end.jpg (last frame)
#   raw/loops/<loop-id>.mp4     →  media/loops/<id>-1280.mp4, <id>-720.mp4, <id>.jpg
#   raw/stills/<name>.(png|jpg) →  media/stills/<name>.jpg (max 1400px, cropped like clips)
#
# Usage:  scripts/process.sh [raw_dir] [out_dir]
# Env:    CROP_X=0.04 CROP_Y=0.06   fraction trimmed from EACH side (removes watermarks,
#                                    keeps the subject centred). 0 to disable.
#         FPS=30                     output frame rate
#         SCRUB_LOOPS="chocolate-caramel-pour"   loops that are scrubbed, not played
# Requires ffmpeg 4.4+.
# ============================================================================
set -euo pipefail

RAW="${1:-raw}"
OUT="${2:-media}"
CROP_X="${CROP_X:-0.04}"
CROP_Y="${CROP_Y:-0.06}"
FPS="${FPS:-30}"
SCRUB_LOOPS="${SCRUB_LOOPS:-chocolate-caramel-pour}"

command -v ffmpeg >/dev/null || { echo "ffmpeg not found on PATH" >&2; exit 1; }
mkdir -p "$OUT/hero" "$OUT/loops" "$OUT/stills"

CROP="crop=trunc(iw*(1-2*${CROP_X})/2)*2:trunc(ih*(1-2*${CROP_Y})/2)*2"

# Scrub encode: every 2nd frame is a keyframe, no B-frames → near-instant seeks both ways
SCRUB_ARGS=(-c:v libx264 -preset slow -pix_fmt yuv420p -g 2 -keyint_min 2 -sc_threshold 0 -bf 0 -movflags +faststart -an)
# Loop encode: normal GOP, small files, plays forward only
LOOP_ARGS=(-c:v libx264 -preset slow -pix_fmt yuv420p -g 60 -movflags +faststart -an)

encode() { # in out width crf mode
  local in="$1" out="$2" w="$3" crf="$4" mode="$5"
  local args=("${LOOP_ARGS[@]}")
  [[ "$mode" == scrub ]] && args=("${SCRUB_ARGS[@]}")
  ffmpeg -hide_banner -loglevel error -y -i "$in" \
    -vf "${CROP},scale=${w}:-2:flags=lanczos,fps=${FPS}" \
    -crf "$crf" "${args[@]}" "$out"
  printf '  %-44s %6s KB\n' "$out" "$(( $(wc -c <"$out") / 1024 ))"
}

poster_first() { ffmpeg -hide_banner -loglevel error -y -i "$1" -frames:v 1 -q:v 3 "$2"; }
poster_last()  { ffmpeg -hide_banner -loglevel error -y -sseof -0.2 -i "$1" -update 1 -q:v 3 "$2"; }

shopt -s nullglob nocaseglob

echo "▸ Hero clips (scrub encode)"
for f in "$RAW"/hero/*.mp4 "$RAW"/hero/*.mov; do
  id="$(basename "${f%.*}")"
  encode "$f" "$OUT/hero/$id-1280.mp4" 1280 20 scrub
  encode "$f" "$OUT/hero/$id-720.mp4"  720  23 scrub
  poster_first "$OUT/hero/$id-1280.mp4" "$OUT/hero/$id.jpg"
  poster_last  "$OUT/hero/$id-1280.mp4" "$OUT/hero/$id-end.jpg"
done

echo "▸ Loops"
for f in "$RAW"/loops/*.mp4 "$RAW"/loops/*.mov; do
  id="$(basename "${f%.*}")"
  mode=loop
  [[ " $SCRUB_LOOPS " == *" $id "* ]] && mode=scrub
  encode "$f" "$OUT/loops/$id-1280.mp4" 1280 23 "$mode"
  encode "$f" "$OUT/loops/$id-720.mp4"  720  26 "$mode"
  poster_first "$OUT/loops/$id-1280.mp4" "$OUT/loops/$id.jpg"
done

echo "▸ Stills"
for f in "$RAW"/stills/*.png "$RAW"/stills/*.jpg "$RAW"/stills/*.jpeg "$RAW"/stills/*.webp; do
  id="$(basename "${f%.*}")"
  ffmpeg -hide_banner -loglevel error -y -i "$f" -vf "${CROP},scale='min(1400,iw)':-2:flags=lanczos" -q:v 3 "$OUT/stills/$id.jpg"
  echo "  $OUT/stills/$id.jpg"
done

echo "✓ Done. Reload the site — clips found in /media replace the placeholders automatically."
