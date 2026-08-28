#!/usr/bin/env bash
# 把 skills/ 下的每个 skill 软链到各 agent 的加载目录。
# 软链（而非复制）保证只有一份源码：改本仓库，所有 agent 立即生效。
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_DIR="$REPO/skills"
TS="$(date +%Y%m%d-%H%M%S)"

TARGETS=(
  "$HOME/.skills-manager/skills"
  "$HOME/.workbuddy/skills"
)

link_one() {
  local skill="$1" target_dir="$2"
  local src="$SKILLS_DIR/$skill"
  local dst="$target_dir/$skill"

  if [ -L "$dst" ] && [ "$(readlink "$dst")" = "$src" ]; then
    echo "  · $skill 已正确链接，跳过"
    return
  fi

  if [ -e "$dst" ] || [ -L "$dst" ]; then
    local backup="$dst.bak-$TS"
    mv "$dst" "$backup"
    echo "  ! 已存在，备份为 $(basename "$backup")"
  fi

  ln -s "$src" "$dst"
  echo "  + $skill -> $src"
}

main() {
  local selected=("$@")
  if [ ${#selected[@]} -eq 0 ]; then
    mapfile -t selected < <(find "$SKILLS_DIR" -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort)
  fi

  echo "仓库：$REPO"
  echo "待分发 skill：${selected[*]}"
  echo

  for target_dir in "${TARGETS[@]}"; do
    if [ ! -d "$target_dir" ]; then
      echo "[$target_dir] 目录不存在，跳过"
      continue
    fi
    echo "[$target_dir]"
    for skill in "${selected[@]}"; do
      if [ ! -d "$SKILLS_DIR/$skill" ]; then
        echo "  ? $skill 不在 skills/ 下，跳过"
        continue
      fi
      link_one "$skill" "$target_dir"
    done
    echo
  done

  echo "完成。用下列命令验证软链是否可解析："
  for target_dir in "${TARGETS[@]}"; do
    [ -d "$target_dir" ] || continue
    for skill in "${selected[@]}"; do
      printf '  ls %s/%s/SKILL.md\n' "${target_dir/#$HOME/~}" "$skill"
    done
  done
}

main "$@"
