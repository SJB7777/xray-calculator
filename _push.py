import os
import random
import string
import subprocess

# -----------------------------
# 설정
# -----------------------------
COMMIT_MSG = "minor update"  # 여기에 원하는 commit 메시지 입력
HTML_FILE = "index.html"

# -----------------------------
# 1️⃣ 랜덤 문자열 생성
# -----------------------------
def generate_random_string(length=8):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choices(chars, k=length))

random_str = generate_random_string()

# -----------------------------
# 2️⃣ index.html에서 main.js / styles.css 쿼리스트링 갱신
# -----------------------------
with open(HTML_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# main.js 쿼리 업데이트
if "main.js?" in content:
    content = content.replace("main.js?", f"main.js?v={random_str}&")
else:
    content = content.replace("main.js", f"main.js?v={random_str}")

# styles.css 쿼리 업데이트
if "styles.css?" in content:
    content = content.replace("styles.css?", f"styles.css?v={random_str}&")
else:
    content = content.replace("styles.css", f"styles.css?v={random_str}")

with open(HTML_FILE, "w", encoding="utf-8") as f:
    f.write(content)

print(f"[INFO] Updated index.html with random query string: {random_str}")

# -----------------------------
# 3️⃣ Git 명령어 실행
# -----------------------------
commands = [
    "git switch main",
    "git merge dev",
    f"git add {HTML_FILE} assets/js/main.js assets/css/styles.css",
    f"git commit -m \"{COMMIT_MSG}\"",
    "git push origin main",
    "git switch dev"
]

for cmd in commands:
    print(f"[GIT] Running: {cmd}")
    result = subprocess.run(cmd, shell=True)
    if result.returncode != 0:
        print(f"[ERROR] Command failed: {cmd}")
        break

print("[INFO] Done!")
